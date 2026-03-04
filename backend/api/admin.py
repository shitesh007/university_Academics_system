from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Student, Faculty, Subject, Enrollment, Material, Assignment, Submission, Query

admin.site.register(User, UserAdmin)
admin.site.register(Student)
admin.site.register(Faculty)
admin.site.register(Subject)
admin.site.register(Enrollment)
admin.site.register(Material)
admin.site.register(Assignment)
admin.site.register(Submission)
admin.site.register(Query)
