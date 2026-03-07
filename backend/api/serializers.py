from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, School, Student, Faculty, Subject, Enrollment, Material, Assignment, Submission, Query

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'profile_picture']

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    school = SchoolSerializer(read_only=True)

    class Meta:
        model = Student
        fields = '__all__'

class FacultySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    school = SchoolSerializer(read_only=True)

    class Meta:
        model = Faculty
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(read_only=True)

    class Meta:
        model = Subject
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = '__all__'

class MaterialSerializer(serializers.ModelSerializer):
    subject_code = serializers.CharField(source='subject.code', read_only=True)
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    uploaded_by_name = serializers.CharField(source='uploaded_by.user.get_full_name', read_only=True)
    
    class Meta:
        model = Material
        fields = '__all__'

class AssignmentSerializer(serializers.ModelSerializer):
    subject_code = serializers.CharField(source='subject.code', read_only=True)

    class Meta:
        model = Assignment
        fields = '__all__'

class SubmissionSerializer(serializers.ModelSerializer):
    assignment = AssignmentSerializer(read_only=True)

    class Meta:
        model = Submission
        fields = '__all__'

class QuerySerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    subject_code = serializers.CharField(source='subject.code', read_only=True)

    class Meta:
        model = Query
        fields = '__all__'

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['role'] = getattr(user, 'role', '')
        token['name'] = user.get_full_name() or user.username
        
        if hasattr(user, 'student'):
            token['school_code'] = user.student.school.code if getattr(user.student, 'school', None) else ''
            token['school_name'] = user.student.school.name if getattr(user.student, 'school', None) else ''
            token['semester'] = user.student.semester
        elif hasattr(user, 'faculty'):
            token['school_code'] = user.faculty.school.code if getattr(user.faculty, 'school', None) else ''
            token['school_name'] = user.faculty.school.name if getattr(user.faculty, 'school', None) else ''
        
        return token

