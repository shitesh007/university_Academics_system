@echo off
color 0A
echo ===================================================
echo        SAGE Portal - Local Development Server
echo ===================================================
echo.

echo [1/2] Starting Django Backend (Port 8000)...
start "Django Backend" cmd /k "cd backend && python manage.py runserver 8000"

echo [2/2] Starting React Frontend (Port 3000)...
start "React Frontend" cmd /k "npm run start"

echo.
echo ===================================================
echo.
echo ✅ Servers are starting in separate windows!
echo 👉 Backend Admin: http://localhost:8000/admin (admin/admin)
echo 👉 Frontend Web:  http://localhost:3000
echo.
echo [NOTE] Ensure XAMPP or MySQL Service is running in the background!
echo ===================================================
pause
