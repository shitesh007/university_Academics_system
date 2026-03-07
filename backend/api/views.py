from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .permissions import IsFaculty
from .models import School, Student, Faculty, Subject, Enrollment, Material, Assignment, Submission, Query
from .serializers import (
    SchoolSerializer, StudentSerializer, FacultySerializer, SubjectSerializer, 
    EnrollmentSerializer, MaterialSerializer, AssignmentSerializer, 
    SubmissionSerializer, QuerySerializer, CustomTokenObtainPairSerializer
)

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

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer

    def get_queryset(self):
        user = self.request.user
        if getattr(user, 'role', None) == 'student':
            return Submission.objects.filter(student__user=user)
        return Submission.objects.all()

class QueryViewSet(viewsets.ModelViewSet):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer
