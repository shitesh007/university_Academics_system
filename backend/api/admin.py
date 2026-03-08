from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Student, Faculty, School, Subject, Enrollment, Material

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'is_staff')
    list_filter = ('role', 'is_staff', 'is_superuser')

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'user', 'semester', 'branch', 'school', 'cgpa')
    search_fields = ('roll_number', 'user__username', 'user__first_name', 'user__last_name')
    list_filter = ('school', 'semester', 'branch')

@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ('faculty_id', 'user', 'department', 'school')
    search_fields = ('faculty_id', 'user__username', 'user__first_name')
    list_filter = ('school', 'department')

@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'emoji')
    search_fields = ('name', 'code')

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'credits', 'semester', 'school', 'faculty')
    search_fields = ('code', 'name')
    list_filter = ('school', 'semester')

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject', 'attendance_percentage')

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'category', 'uploaded_by', 'upload_date', 'size_mb')
    list_filter = ('category', 'subject__school')
    search_fields = ('title', 'description')

