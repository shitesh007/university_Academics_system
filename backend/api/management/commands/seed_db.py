import datetime
from django.core.management.base import BaseCommand
from django.utils import timezone
from api.models import User, Student, Faculty, Subject, Enrollment, Material, Assignment, Submission, Query

class Command(BaseCommand):
    help = 'Seeds the database with initial mock data from the React frontend'

    def handle(self, *args, **kwargs):
        # Only seed if no users exist yet (safe to run on every startup)
        if User.objects.filter(is_superuser=False).exists():
            self.stdout.write('Database already seeded. Skipping.')
            return

        self.stdout.write('Creating Faculty...')
        faculty_user = User.objects.create_user(
            username='r_mishra',
            email='r.mishra@sageuniversity.edu.in',
            password='faculty@2025',
            first_name='Rahul',
            last_name='Mishra',
            role='faculty'
        )
        faculty = Faculty.objects.create(
            user=faculty_user,
            faculty_id='SAGE-FAC-2024-042',
            department='Computer Science & Engineering'
        )

        self.stdout.write('Creating Student...')
        student_user = User.objects.create_user(
            username='aditya_sharma',
            email='aditya.sharma@sageuniversity.edu.in',
            password='sage@2025',
            first_name='Aditya',
            last_name='Sharma',
            role='student'
        )
        student = Student.objects.create(
            user=student_user,
            roll_number='SAGE/CS/2022/0847',
            semester=5,
            branch='Computer Science & Engineering',
            cgpa=8.4
        )

        # Create other dummy students for queries
        stu1_u = User.objects.create_user(username='aryan', first_name='Aryan', last_name='Mehta', role='student')
        stu1 = Student.objects.create(user=stu1_u, roll_number='SAGE/CS/2022/0001', branch='CSE')
        stu2_u = User.objects.create_user(username='priya', first_name='Priya', last_name='Rawat', role='student')
        stu2 = Student.objects.create(user=stu2_u, roll_number='SAGE/CS/2022/0002', branch='CSE')
        stu3_u = User.objects.create_user(username='rahul.s', first_name='Rahul', last_name='Soni', role='student')
        stu3 = Student.objects.create(user=stu3_u, roll_number='SAGE/CS/2022/0003', branch='CSE')


        self.stdout.write('Creating Subjects...')
        subjects_data = [
            {"name":"Data Structures & Algorithms", "code":"CS-301"},
            {"name":"Database Management Systems", "code":"CS-302"},
            {"name":"Operating Systems", "code":"CS-303"},
            {"name":"Computer Networks", "code":"CS-304"},
            {"name":"Software Engineering", "code":"CS-305"},
            {"name":"Machine Learning", "code":"CS-306"},
        ]
        subjects = {}
        for idx, sd in enumerate(subjects_data):
            subj = Subject.objects.create(
                name=sd['name'],
                code=sd['code'],
                credits=3,
                semester=5,
                faculty=faculty
            )
            subjects[sd['code']] = subj
            # Create enrollment target for the main student
            att = [80, 72, 88, 65, 82, 70][idx]
            Enrollment.objects.create(student=student, subject=subj, attendance_percentage=att)

        self.stdout.write('Creating Materials...')
        Material.objects.create(subject=subjects['CS-301'], uploaded_by=faculty, title="Unit 1 – Introduction to DSA", category="notes", file_url="/dummy/dsa1.pdf", size_mb=2.4)
        Material.objects.create(subject=subjects['CS-301'], uploaded_by=faculty, title="Unit 2 – Arrays & Linked Lists", category="notes", file_url="/dummy/dsa2.pdf", size_mb=3.1)
        Material.objects.create(subject=subjects['CS-301'], uploaded_by=faculty, title="Unit 3 – Trees & Graphs", category="notes", file_url="/dummy/dsa3.pdf", size_mb=1.8)
        Material.objects.create(subject=subjects['CS-302'], uploaded_by=faculty, title="Introduction to Algorithms – CLRS", category="ebook", file_url="/dummy/clrs.pdf", size_mb=14.2)
        Material.objects.create(subject=subjects['CS-301'], uploaded_by=faculty, title="Sorting Algorithms Visualized", category="video", file_url="/dummy/sort.mp4", size_mb=180.0)

        self.stdout.write('Creating Assignments...')
        now = timezone.now()
        a1 = Assignment.objects.create(subject=subjects['CS-301'], title="Assignment 2 – Array Problems", due_date=now - datetime.timedelta(days=2))
        a2 = Assignment.objects.create(subject=subjects['CS-302'], title="DBMS Lab Report – Unit 2", due_date=now + datetime.timedelta(days=5))
        a3 = Assignment.objects.create(subject=subjects['CS-303'], title="OS Process Scheduling Simulation", due_date=now + datetime.timedelta(days=10))
        a4 = Assignment.objects.create(subject=subjects['CS-304'], title="Network Topology Diagram", due_date=now + datetime.timedelta(days=13))

        Submission.objects.create(assignment=a1, student=student, status='done')
        Submission.objects.create(assignment=a2, student=student, status='pending')

        self.stdout.write('Creating Queries...')
        Query.objects.create(student=stu1, subject=subjects['CS-301'], question="Could you clarify the time complexity of QuickSort in worst case?", status="pending")
        Query.objects.create(student=stu2, subject=subjects['CS-302'], question="What is the difference between 2NF and 3NF normalization?", status="open")
        Query.objects.create(student=stu3, subject=subjects['CS-303'], question="Can you share more examples of deadlock prevention?", status="resolved", reply="Check page 42 of the textbook.")

        self.stdout.write(self.style.SUCCESS('Database successfully seeded with mock data!'))
