from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    StudentViewSet, FacultyViewSet, SubjectViewSet, 
    EnrollmentViewSet, MaterialViewSet, AssignmentViewSet, 
    SubmissionViewSet, QueryViewSet, CustomTokenObtainPairView
)

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')
router.register(r'faculty', FacultyViewSet, basename='faculty')
router.register(r'subjects', SubjectViewSet, basename='subject')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')
router.register(r'materials', MaterialViewSet, basename='material')
router.register(r'assignments', AssignmentViewSet, basename='assignment')
router.register(r'submissions', SubmissionViewSet, basename='submission')
router.register(r'queries', QueryViewSet, basename='query')

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
