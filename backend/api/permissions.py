from rest_framework import permissions

class IsFaculty(permissions.BasePermission):
    """
    Custom permission to only allow Faculty members to modify objects.
    """
    message = "Only faculty members are allowed to perform this action."

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
            
        # Students can use safe methods (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Write permissions are only allowed to faculty or admin
        return getattr(request.user, 'role', '') in ['faculty', 'admin']
