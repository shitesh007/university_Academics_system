from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('faculty', 'Faculty'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    profile_picture = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    roll_number = models.CharField(max_length=50, unique=True)
    semester = models.IntegerField(default=1)
    branch = models.CharField(max_length=100)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.roll_number}"


class Faculty(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    faculty_id = models.CharField(max_length=50, unique=True)
    department = models.CharField(max_length=100)

    def __str__(self):
        return f"Dr. {self.user.last_name} - {self.department}"


class Subject(models.Model):
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=200)
    credits = models.IntegerField(default=3)
    semester = models.IntegerField()
    faculty = models.ForeignKey(Faculty, on_delete=models.SET_NULL, null=True, related_name='subjects')

    def __str__(self):
        return f"{self.name} ({self.code})"


class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrollments')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='enrollments')
    attendance_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)

    class Meta:
        unique_together = ('student', 'subject')

    def __str__(self):
        return f"{self.student.roll_number} enrolled in {self.subject.code}"


class Material(models.Model):
    CATEGORY_CHOICES = (
        ('notes', 'Notes'),
        ('ebook', 'E-book'),
        ('pyq', 'PYQs'),
        ('video', 'Tutorial Video'),
        ('topic', 'Important Topics'),
        ('assignment', 'Assignment'),
        ('other', 'Other'),
    )
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='materials')
    uploaded_by = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='uploaded_materials')
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    file_url = models.URLField(max_length=500)
    upload_date = models.DateTimeField(auto_now_add=True)
    size_mb = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.title} ({self.subject.code})"


class Assignment(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=255)
    due_date = models.DateTimeField()
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.title} - {self.subject.code}"


class Submission(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('done', 'Done'),
    )
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='submissions')
    file_url = models.URLField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    grade = models.CharField(max_length=10, blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('assignment', 'student')

    def __str__(self):
        return f"{self.student.roll_number} - {self.assignment.title}"


class Query(models.Model):
    STATUS_CHOICES = (
        ('open', 'Open'),
        ('pending', 'Pending'),
        ('resolved', 'Resolved'),
    )
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='queries')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='queries')
    question = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    reply = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"Query by {self.student.roll_number} for {self.subject.code}"
