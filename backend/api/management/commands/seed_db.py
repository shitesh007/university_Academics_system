import datetime
from django.core.management.base import BaseCommand
from django.utils import timezone
from api.models import User, School, Student, Faculty, Subject, Enrollment, Material, Assignment, Submission, Query


# ─── School Curriculum Data ───────────────────────────────────────────────────

SCHOOLS_DATA = [
    {
        "name": "School of Engineering",
        "code": "SOE",
        "emoji": "⚙️",
        "description": "Premier engineering school offering B.Tech in CSE, ECE, ME, CE and more.",
        "faculty": {
            "username": "r_mishra",
            "first_name": "Rahul",
            "last_name": "Mishra",
            "email": "r.mishra@sageuniversity.edu.in",
            "password": "faculty@2025",
            "faculty_id": "SAGE-SOE-FAC-001",
            "department": "Computer Science & Engineering",
        },
        "student": {
            "username": "aditya_sharma",
            "first_name": "Aditya",
            "last_name": "Sharma",
            "email": "aditya.sharma@sageuniversity.edu.in",
            "password": "sage@2025",
            "roll_number": "SOE/CS/2022/0847",
            "semester": 5,
            "branch": "Computer Science & Engineering",
            "cgpa": 8.4,
        },
        "semesters": {
            1: [
                {"code": "SOE-CS-101", "name": "Engineering Mathematics I", "credits": 4},
                {"code": "SOE-CS-102", "name": "Programming Fundamentals (C/C++)", "credits": 4},
                {"code": "SOE-CS-103", "name": "Physics for Engineers", "credits": 3},
                {"code": "SOE-CS-104", "name": "Engineering Drawing & Graphics", "credits": 2},
                {"code": "SOE-CS-105", "name": "Communication Skills", "credits": 2},
            ],
            2: [
                {"code": "SOE-CS-201", "name": "Engineering Mathematics II", "credits": 4},
                {"code": "SOE-CS-202", "name": "Object-Oriented Programming (Java)", "credits": 4},
                {"code": "SOE-CS-203", "name": "Digital Electronics & Logic Design", "credits": 3},
                {"code": "SOE-CS-204", "name": "Chemistry for Engineers", "credits": 3},
                {"code": "SOE-CS-205", "name": "Environmental Sciences", "credits": 2},
            ],
            3: [
                {"code": "SOE-CS-301", "name": "Data Structures & Algorithms", "credits": 4},
                {"code": "SOE-CS-302", "name": "Computer Organization & Architecture", "credits": 3},
                {"code": "SOE-CS-303", "name": "Discrete Mathematics", "credits": 3},
                {"code": "SOE-CS-304", "name": "Economics for Engineers", "credits": 2},
                {"code": "SOE-CS-305", "name": "Python Programming", "credits": 3},
            ],
            4: [
                {"code": "SOE-CS-401", "name": "Database Management Systems", "credits": 4},
                {"code": "SOE-CS-402", "name": "Operating Systems", "credits": 4},
                {"code": "SOE-CS-403", "name": "Theory of Computation", "credits": 3},
                {"code": "SOE-CS-404", "name": "Software Engineering", "credits": 3},
                {"code": "SOE-CS-405", "name": "Computer Networks I", "credits": 3},
            ],
            5: [
                {"code": "SOE-CS-501", "name": "Machine Learning", "credits": 4},
                {"code": "SOE-CS-502", "name": "Web Technologies", "credits": 3},
                {"code": "SOE-CS-503", "name": "Computer Networks II", "credits": 3},
                {"code": "SOE-CS-504", "name": "Compiler Design", "credits": 3},
                {"code": "SOE-CS-505", "name": "Information Security", "credits": 3},
            ],
            6: [
                {"code": "SOE-CS-601", "name": "Artificial Intelligence", "credits": 4},
                {"code": "SOE-CS-602", "name": "Cloud Computing", "credits": 3},
                {"code": "SOE-CS-603", "name": "Mobile Application Development", "credits": 3},
                {"code": "SOE-CS-604", "name": "Big Data Analytics", "credits": 3},
                {"code": "SOE-CS-605", "name": "Human Computer Interaction", "credits": 2},
            ],
            7: [
                {"code": "SOE-CS-701", "name": "Deep Learning & Neural Networks", "credits": 4},
                {"code": "SOE-CS-702", "name": "Distributed Systems", "credits": 3},
                {"code": "SOE-CS-703", "name": "Internet of Things", "credits": 3},
                {"code": "SOE-CS-704", "name": "Project Management", "credits": 2},
                {"code": "SOE-CS-705", "name": "Elective: Blockchain Technology", "credits": 3},
            ],
            8: [
                {"code": "SOE-CS-801", "name": "Major Project (Part 2)", "credits": 8},
                {"code": "SOE-CS-802", "name": "Seminar & Technical Writing", "credits": 2},
                {"code": "SOE-CS-803", "name": "Elective: Quantum Computing", "credits": 3},
                {"code": "SOE-CS-804", "name": "Industrial Training Report", "credits": 2},
            ],
        }
    },
    {
        "name": "School of Business Administration",
        "code": "SOB",
        "emoji": "💼",
        "description": "Leading business school offering BBA, MBA and executive programs.",
        "faculty": {
            "username": "p_verma",
            "first_name": "Priya",
            "last_name": "Verma",
            "email": "p.verma@sageuniversity.edu.in",
            "password": "faculty@2025",
            "faculty_id": "SAGE-SOB-FAC-001",
            "department": "Business & Finance",
        },
        "student": {
            "username": "neha_gupta",
            "first_name": "Neha",
            "last_name": "Gupta",
            "email": "neha.gupta@sageuniversity.edu.in",
            "password": "sage@2025",
            "roll_number": "SOB/BBA/2022/0123",
            "semester": 3,
            "branch": "Business Administration",
            "cgpa": 7.9,
        },
        "semesters": {
            1: [
                {"code": "SOB-BBA-101", "name": "Principles of Management", "credits": 4},
                {"code": "SOB-BBA-102", "name": "Business Communication", "credits": 3},
                {"code": "SOB-BBA-103", "name": "Financial Accounting", "credits": 4},
                {"code": "SOB-BBA-104", "name": "Business Economics I", "credits": 3},
                {"code": "SOB-BBA-105", "name": "Business Mathematics", "credits": 3},
            ],
            2: [
                {"code": "SOB-BBA-201", "name": "Organizational Behavior", "credits": 4},
                {"code": "SOB-BBA-202", "name": "Cost & Management Accounting", "credits": 4},
                {"code": "SOB-BBA-203", "name": "Business Law & Ethics", "credits": 3},
                {"code": "SOB-BBA-204", "name": "Business Economics II", "credits": 3},
                {"code": "SOB-BBA-205", "name": "Computer Applications in Business", "credits": 2},
            ],
            3: [
                {"code": "SOB-BBA-301", "name": "Marketing Management", "credits": 4},
                {"code": "SOB-BBA-302", "name": "Human Resource Management", "credits": 4},
                {"code": "SOB-BBA-303", "name": "Corporate Finance", "credits": 4},
                {"code": "SOB-BBA-304", "name": "Research Methodology", "credits": 3},
                {"code": "SOB-BBA-305", "name": "Entrepreneurship Development", "credits": 3},
            ],
            4: [
                {"code": "SOB-BBA-401", "name": "Strategic Management", "credits": 4},
                {"code": "SOB-BBA-402", "name": "Supply Chain Management", "credits": 3},
                {"code": "SOB-BBA-403", "name": "International Business", "credits": 3},
                {"code": "SOB-BBA-404", "name": "Investment Analysis & Portfolio Mgmt", "credits": 4},
                {"code": "SOB-BBA-405", "name": "Consumer Behavior", "credits": 3},
            ],
            5: [
                {"code": "SOB-BBA-501", "name": "Business Analytics", "credits": 4},
                {"code": "SOB-BBA-502", "name": "Digital Marketing", "credits": 3},
                {"code": "SOB-BBA-503", "name": "Operations Management", "credits": 3},
                {"code": "SOB-BBA-504", "name": "Taxation & GST", "credits": 3},
                {"code": "SOB-BBA-505", "name": "Corporate Governance", "credits": 2},
            ],
            6: [
                {"code": "SOB-BBA-601", "name": "Mergers & Acquisitions", "credits": 4},
                {"code": "SOB-BBA-602", "name": "Brand Management", "credits": 3},
                {"code": "SOB-BBA-603", "name": "E-Commerce & Digital Business", "credits": 3},
                {"code": "SOB-BBA-604", "name": "Leadership & Team Dynamics", "credits": 3},
                {"code": "SOB-BBA-605", "name": "Business Ethics & CSR", "credits": 2},
            ],
            7: [
                {"code": "SOB-BBA-701", "name": "Project Work Phase I", "credits": 6},
                {"code": "SOB-BBA-702", "name": "Elective: Fintech & Banking", "credits": 4},
                {"code": "SOB-BBA-703", "name": "Global Strategy", "credits": 3},
                {"code": "SOB-BBA-704", "name": "Risk Management", "credits": 3},
            ],
            8: [
                {"code": "SOB-BBA-801", "name": "Final Project & Viva", "credits": 8},
                {"code": "SOB-BBA-802", "name": "Industry Internship Report", "credits": 4},
                {"code": "SOB-BBA-803", "name": "Elective: Start-up Ecosystem", "credits": 3},
            ],
        }
    },
    {
        "name": "School of Law",
        "code": "SOL",
        "emoji": "⚖️",
        "description": "Esteemed law school offering LLB, LLM with specializations in corporate and criminal law.",
        "faculty": {
            "username": "s_joshi",
            "first_name": "Suresh",
            "last_name": "Joshi",
            "email": "s.joshi@sageuniversity.edu.in",
            "password": "faculty@2025",
            "faculty_id": "SAGE-SOL-FAC-001",
            "department": "Corporate & Constitutional Law",
        },
        "student": {
            "username": "karan_singh",
            "first_name": "Karan",
            "last_name": "Singh",
            "email": "karan.singh@sageuniversity.edu.in",
            "password": "sage@2025",
            "roll_number": "SOL/LLB/2022/0056",
            "semester": 2,
            "branch": "Law (LLB)",
            "cgpa": 8.1,
        },
        "semesters": {
            1: [
                {"code": "SOL-101", "name": "Jurisprudence & Legal Theory", "credits": 4},
                {"code": "SOL-102", "name": "Constitutional Law I", "credits": 4},
                {"code": "SOL-103", "name": "Law of Contracts", "credits": 4},
                {"code": "SOL-104", "name": "Legal Methods & Research", "credits": 3},
                {"code": "SOL-105", "name": "English for Legal Communication", "credits": 2},
            ],
            2: [
                {"code": "SOL-201", "name": "Constitutional Law II", "credits": 4},
                {"code": "SOL-202", "name": "Law of Torts & Consumer Protection", "credits": 4},
                {"code": "SOL-203", "name": "Criminal Law I (IPC)", "credits": 4},
                {"code": "SOL-204", "name": "Family Law I (Hindu Law)", "credits": 3},
                {"code": "SOL-205", "name": "History of Courts & Legal Institutions", "credits": 2},
            ],
            3: [
                {"code": "SOL-301", "name": "Criminal Law II (CrPC)", "credits": 4},
                {"code": "SOL-302", "name": "Family Law II (Muslim & Christian Law)", "credits": 3},
                {"code": "SOL-303", "name": "Law of Evidence", "credits": 4},
                {"code": "SOL-304", "name": "Property Law & Transfer of Property", "credits": 3},
                {"code": "SOL-305", "name": "Administrative Law", "credits": 3},
            ],
            4: [
                {"code": "SOL-401", "name": "Company Law", "credits": 4},
                {"code": "SOL-402", "name": "Labour Law & Industrial Relations", "credits": 4},
                {"code": "SOL-403", "name": "Code of Civil Procedure", "credits": 4},
                {"code": "SOL-404", "name": "Land Laws & Local Legislation", "credits": 3},
                {"code": "SOL-405", "name": "Environmental Law", "credits": 3},
            ],
            5: [
                {"code": "SOL-501", "name": "Intellectual Property Law", "credits": 4},
                {"code": "SOL-502", "name": "International Law", "credits": 4},
                {"code": "SOL-503", "name": "Taxation Law", "credits": 3},
                {"code": "SOL-504", "name": "Arbitration & Alternate Dispute Resolution", "credits": 3},
                {"code": "SOL-505", "name": "Cyber Law & IT Act", "credits": 3},
            ],
            6: [
                {"code": "SOL-601", "name": "Banking & Insurance Law", "credits": 4},
                {"code": "SOL-602", "name": "Human Rights & International Humanitarian Law", "credits": 4},
                {"code": "SOL-603", "name": "Criminology & Victimology", "credits": 3},
                {"code": "SOL-604", "name": "Moot Court & Trial Advocacy", "credits": 3},
                {"code": "SOL-605", "name": "Competition Law", "credits": 3},
            ],
            7: [
                {"code": "SOL-701", "name": "Dissertation Phase I", "credits": 6},
                {"code": "SOL-702", "name": "Elective: Corporate Governance & Law", "credits": 4},
                {"code": "SOL-703", "name": "Court Internship & Clinical Education", "credits": 4},
            ],
            8: [
                {"code": "SOL-801", "name": "Dissertation Phase II & Viva", "credits": 8},
                {"code": "SOL-802", "name": "Professional Ethics & Bar Council Rules", "credits": 3},
                {"code": "SOL-803", "name": "Elective: International Commercial Law", "credits": 3},
            ],
        }
    }
]


def make_materials(subject, faculty, sem):
    """Generate 5 realistic materials for every subject."""
    sname = subject.name
    scode = subject.code
    units = [
        f"Unit 1: Introduction to {sname} — Concepts & Scope",
        f"Unit 2: Core Principles and Theoretical Framework",
        f"Unit 3: Applications and Case Studies in {sname}",
        f"Unit 4: Advanced Topics and Recent Developments",
        f"Unit 5: Revision, Numericals & Model Answers",
    ]
    return [
        Material(
            subject=subject,
            uploaded_by=faculty,
            title=f"{sname} — Complete Unit Notes (Sem {sem})",
            description=f"Comprehensive notes covering all 5 units:\n" + "\n".join(f"• {u}" for u in units),
            category="notes",
            file_url=f"https://sage-docs.example.com/{scode}/unit-notes-sem{sem}.pdf",
            size_mb=round(2.4 + sem * 0.3, 1),
        ),
        Material(
            subject=subject,
            uploaded_by=faculty,
            title=f"{sname} — PYQs (Last 5 Years)",
            description=(
                f"Previous Year Question Papers for {sname} ({scode}):\n"
                f"• 2023 End-Semester: 10 questions, 80 marks\n"
                f"• 2022 End-Semester: Section A (MCQ) + Section B (Theory)\n"
                f"• 2021 Mid-Semester: Short answer + Case-study questions\n"
                f"• 2020: Full paper with solved answers\n"
                f"• 2019: Unit-wise practice sets"
            ),
            category="pyq",
            file_url=f"https://sage-docs.example.com/{scode}/pyq-2019-2023.pdf",
            size_mb=round(1.8 + sem * 0.2, 1),
        ),
        Material(
            subject=subject,
            uploaded_by=faculty,
            title=f"{sname} — Important Questions & Expected Topics",
            description=(
                f"Curated important questions for Sem {sem} exams:\n"
                f"• 10 Most-asked long questions from Unit 1–3\n"
                f"• 15 Short answer questions likely for Section A\n"
                f"• 5 Case-study based problems with model answers\n"
                f"• Definitions & key terms — must memorize list\n"
                f"• Formula sheet and quick reference card for {sname}"
            ),
            category="important",
            file_url=f"https://sage-docs.example.com/{scode}/imp-questions-sem{sem}.pdf",
            size_mb=round(0.9 + sem * 0.1, 1),
        ),
        Material(
            subject=subject,
            uploaded_by=faculty,
            title=f"{sname} — Video Tutorial Series",
            description=(
                f"Recorded lecture series for {sname}:\n"
                f"• Lecture 1–5: Fundamentals (45 min each)\n"
                f"• Lecture 6–10: Intermediate concepts with examples\n"
                f"• Lecture 11–14: Advanced problems & numerical solving\n"
                f"• Lecture 15: Full revision + doubt clearing session\n"
                f"• Playlist hosted on SAGE Learning Portal"
            ),
            category="tutorial",
            file_url=f"https://sage-docs.example.com/{scode}/video-playlist-sem{sem}.m3u8",
            size_mb=round(420.0 + sem * 30, 1),
        ),
        Material(
            subject=subject,
            uploaded_by=faculty,
            title=f"{sname} — Reference E-Book",
            description=(
                f"Recommended textbook and reference material:\n"
                f"• Primary Text: Standard textbook for {sname} (latest edition)\n"
                f"• Chapters 1–4: Aligned with syllabus Units 1–5\n"
                f"• Supplementary: Research papers and journal articles\n"
                f"• Appendix: Solved exercises and additional problems\n"
                f"• Format: PDF — optimized for mobile reading"
            ),
            category="ebook",
            file_url=f"https://sage-docs.example.com/{scode}/reference-ebook-sem{sem}.pdf",
            size_mb=round(8.5 + sem * 1.2, 1),
        ),
    ]


class Command(BaseCommand):
    help = 'Seeds the database with Schools, Semesters, Subjects and realistic study materials'

    def handle(self, *args, **kwargs):
        # Skip if already seeded
        if School.objects.exists():
            self.stdout.write(self.style.WARNING('Database already seeded. Skipping.'))
            return

        self.stdout.write('🌱 Seeding SAGE University database...')

        for school_data in SCHOOLS_DATA:
            # Create School
            school = School.objects.create(
                name=school_data["name"],
                code=school_data["code"],
                emoji=school_data["emoji"],
                description=school_data["description"],
            )
            self.stdout.write(f'  ✅ School: {school}')

            # Create Faculty
            fd = school_data["faculty"]
            fac_user = User.objects.create_user(
                username=fd["username"],
                email=fd["email"],
                password=fd["password"],
                first_name=fd["first_name"],
                last_name=fd["last_name"],
                role="faculty",
            )
            faculty = Faculty.objects.create(
                user=fac_user,
                faculty_id=fd["faculty_id"],
                department=fd["department"],
                school=school,
            )
            self.stdout.write(f'     👨‍🏫 Faculty: {faculty}')

            # Create Student
            sd = school_data["student"]
            stu_user = User.objects.create_user(
                username=sd["username"],
                email=sd["email"],
                password=sd["password"],
                first_name=sd["first_name"],
                last_name=sd["last_name"],
                role="student",
            )
            student = Student.objects.create(
                user=stu_user,
                roll_number=sd["roll_number"],
                semester=sd["semester"],
                branch=sd["branch"],
                school=school,
                cgpa=sd["cgpa"],
            )
            self.stdout.write(f'     🎓 Student: {student}')

            # Create Subjects, Materials, Enrollments for all 8 semesters
            materials_to_create = []
            for sem_num, subjects_list in school_data["semesters"].items():
                for subj_data in subjects_list:
                    subject = Subject.objects.create(
                        code=subj_data["code"],
                        name=subj_data["name"],
                        credits=subj_data["credits"],
                        semester=sem_num,
                        school=school,
                        faculty=faculty,
                    )
                    # Enroll student in their current semester subjects
                    if sem_num == student.semester:
                        Enrollment.objects.create(
                            student=student,
                            subject=subject,
                            attendance_percentage=round(65 + (hash(subj_data["code"]) % 30), 1),
                        )
                    materials_to_create.extend(make_materials(subject, faculty, sem_num))

            Material.objects.bulk_create(materials_to_create)
            self.stdout.write(f'     📚 {len(materials_to_create)} materials created across 8 semesters')

        self.stdout.write(self.style.SUCCESS('\n✅ Database seeded successfully!'))
        self.stdout.write(f'   Schools: {School.objects.count()}')
        self.stdout.write(f'   Subjects: {Subject.objects.count()}')
        self.stdout.write(f'   Materials: {Material.objects.count()}')
        self.stdout.write(f'   Students: {Student.objects.count()}')
        self.stdout.write(f'   Faculty: {Faculty.objects.count()}')
        self.stdout.write('\n🔑 Login Credentials:')
        self.stdout.write('   SOE Student: aditya_sharma / sage@2025')
        self.stdout.write('   SOB Student: neha_gupta / sage@2025')
        self.stdout.write('   SOL Student: karan_singh / sage@2025')
        self.stdout.write('   SOE Faculty: r_mishra / faculty@2025')
        self.stdout.write('   SOB Faculty: p_verma / faculty@2025')
        self.stdout.write('   SOL Faculty: s_joshi / faculty@2025')
