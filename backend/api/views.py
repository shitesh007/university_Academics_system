from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import School, Student, Faculty, Subject, Enrollment, Material
from .serializers import (
    SchoolSerializer, StudentSerializer, FacultySerializer, SubjectSerializer, 
    EnrollmentSerializer, MaterialSerializer, CustomTokenObtainPairSerializer
)
from .services.ai_service import generate_material_summary
import datetime

try:
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.units import inch
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
except ImportError:
    pass

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class StudentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class FacultyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer

class SubjectViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if getattr(user, 'role', None) == 'student' and hasattr(user, 'student'):
            return Subject.objects.filter(school=user.student.school)
        elif getattr(user, 'role', None) == 'faculty' and hasattr(user, 'faculty'):
            return Subject.objects.filter(school=user.faculty.school)
        return Subject.objects.none()

class EnrollmentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        user = self.request.user
        if getattr(user, 'role', None) == 'student':
            return Enrollment.objects.filter(student__user=user)
        return Enrollment.objects.all()

class MaterialViewSet(viewsets.ModelViewSet):
    serializer_class = MaterialSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if getattr(user, 'role', None) == 'student' and hasattr(user, 'student'):
            # Students see materials for their school_id and semester ONLY
            return Material.objects.filter(
                subject__school_id=user.student.school_id,
                subject__semester=user.student.semester
            )
        elif getattr(user, 'role', None) == 'faculty' and hasattr(user, 'faculty'):
            # Faculty see materials for their school_id ONLY
            return Material.objects.filter(subject__school_id=user.faculty.school_id)
        return Material.objects.none()

    def create(self, request, *args, **kwargs):
        # Only faculty can upload
        if getattr(request.user, 'role', None) != 'faculty':
            return Response({"detail": "Only faculty can upload materials"}, status=status.HTTP_403_FORBIDDEN)
        
        # Enforce faculty ownership via school_id
        subject_id = request.data.get('subject')
        try:
            subject = Subject.objects.get(id=subject_id)
            if subject.school_id != request.user.faculty.school_id:
                return Response({"detail": "Cannot upload material to a different school"}, status=status.HTTP_403_FORBIDDEN)
        except Subject.DoesNotExist:
            return Response({"detail": "Invalid subject"}, status=status.HTTP_400_BAD_REQUEST)

        # Proceed with normal creation
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        # Gather data for AI prompt
        title = serializer.validated_data.get('title', '')
        category = serializer.validated_data.get('category', '')
        description = serializer.validated_data.get('description', '')
        subject = serializer.validated_data.get('subject')
        
        file_obj = self.request.FILES.get('file')
        if file_obj:
            size_mb = round(file_obj.size / (1024 * 1024), 2)
        else:
            size_mb = float(serializer.validated_data.get('size_mb', 0.0))
        
        # Get AI Summary via Gemini API
        ai_sum = generate_material_summary(
            title=title, 
            subject_name=subject.name if subject else "Unknown", 
            category=category, 
            description=description
        )
        
        # Save exact faculty and ai summary
        serializer.save(uploaded_by=self.request.user.faculty, ai_summary=ai_sum, size_mb=size_mb)


class DownloadMaterialView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, pk):
        material = get_object_or_404(Material, pk=pk)
        
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'inline; filename="{material.subject.code}_{material.category}.pdf"'
        
        doc = SimpleDocTemplate(response, pagesize=letter)
        styles = getSampleStyleSheet()
        Story = []
        
        Story.append(Paragraph(f"SAGE University Study Material", styles["Title"]))
        Story.append(Spacer(1, 0.2 * inch))
        Story.append(Paragraph(f"<b>Title:</b> {material.title}", styles["Heading2"]))
        Story.append(Paragraph(f"<b>Subject:</b> {material.subject.name} ({material.subject.code})", styles["Heading3"]))
        Story.append(Paragraph(f"<b>Category:</b> {material.get_category_display()}", styles["Normal"]))
        Story.append(Paragraph(f"<b>Faculty:</b> Dr. {material.uploaded_by.user.last_name} ({material.uploaded_by.department})", styles["Normal"]))
        Story.append(Paragraph(f"<b>Date:</b> {material.upload_date.strftime('%B %d, %Y')}", styles["Normal"]))
        Story.append(Spacer(1, 0.5 * inch))
        
        # Original Content Generation
        content_text = f"This document contains the official study material for {material.subject.name}. " \
                       f"The concepts covered in this {material.get_category_display().lower()} are essential for " \
                       f"mastering the coursework in Semester {material.subject.semester}. Students are advised to " \
                       f"review this content thoroughly and consult Dr. {material.uploaded_by.user.last_name} for any clarifications. "
                       
        if material.category == 'notes':
            content_text += "These notes summarize the core units and foundational theories necessary for your upcoming end-semester examinations."
        elif material.category == 'pyq':
            content_text += "Attached are the previous year questions (PYQs). Practicing these will give you a clear understanding of the exam pattern."
        elif material.category == 'important':
            content_text += "These are the highly anticipated and important topics highlighted by the faculty. Focus heavily on these areas."
        elif material.category == 'tutorial':
            content_text += "This outlines the key takeaways from the video tutorial series corresponding to this subject."
        else:
            content_text += "This reference material is highly recommended for building a strong foundational context."
            
        Story.append(Paragraph(content_text, styles["Normal"]))
        Story.append(Spacer(1, 0.3 * inch))
        
        # Add the description from the material itself
        Story.append(Paragraph("Description / Remarks:", styles["Heading4"]))
        for line in material.description.split('\n'):
            Story.append(Paragraph(line, styles["Normal"]))
            
        # Add some dummy theoretical text based on the subject length
        Story.append(Spacer(1, 0.5 * inch))
        Story.append(Paragraph("Course Outline & Detailed Core Concepts:", styles["Heading3"]))
        long_text = f"The study of {material.subject.name} requires a dedicated approach integrating both theoretical frameworks and practical applications. Throughout this semester, students are expected to engage deeply with the primary texts, evaluate critically the established literature, and synthesize findings to address modern analytical challenges within the field of {material.subject.school.name}."
        Story.append(Paragraph(long_text, styles["Normal"]))
            
        doc.build(Story)
        return response


