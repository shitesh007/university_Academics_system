# Academics Hub 🎓
### The Modern University Academic Ingestion & Management Portal

**Academics Hub** is a robust, full-stack university ecosystem designed for multi-disciplinary academic success. It provides a centralized platform for curriculum mapping, automated study material ingestion, and AI-powered learning assistance, supporting specialized requirements for Engineering, Business, and Law.

![Frontend Stack](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-blue) ![Backend Stack](https://img.shields.io/badge/Backend-Django%206.0%20%2B%20DRF-green) ![AI Stack](https://img.shields.io/badge/AI-Google%20Gemini%201.5%20Pro-orange)

---

## 🌟 Core Pillars

### 🏫 Multi-School Architecture
Designed with a modular "School" hierarchy to support complex academic structures:
- **School of Engineering (SOE)**: Technical curricula with support for Computer Science, ECE, and more.
- **School of Business (SOB)**: Management and administrative roadmaps including BBA and MBA.
- **School of Law (SOL)**: Legal studies integration with Jurisprudence and Constitutional law tracks.

### 📚 Comprehensive Curriculum Mapping
- **8-Semester Roadmap**: Pre-loaded with complete syllabus modules for every school.
- **Credit-Based Tracking**: Dynamic subject management with built-in credit systems and attendance monitoring.
- **Enrollment Orchestration**: Seamless connection between Students, Faculty, and their assigned Subjects.

### 🤖 AI-Powered Ingestion
- **Intelligent Summarization**: Integrated with **Google Gemini 1.5 Pro** to automatically generate study notes and unit summaries from uploaded documents.
- **Smart Metadata Extraction**: Automatically tracks file size, category (Notes, PYQs, E-books), and upload history.

---

## 🛠️ Technical Implementation

### Frontend: High-Performance UI
- **Framework**: React 19 (Modern Fiber Architecture)
- **Engine**: Vite for lightning-fast HMR and build performance.
- **UX**: Custom modular design system with responsive sidebar navigation and role-based themes.
- **Data Flow**: Optimized Axios interceptors and React Context for centralized Auth & State.

### Backend: Scalable REST Services
- **Framework**: Django 6.0 + Django REST Framework.
- **Security**: Stateless JWT-based authentication (SimpleJWT) with secure refresh cycles.
- **Database**: PostgreSQL with complex relational mapping for Schools, Materials, and Enrollments.
- **Statics**: Performance-tuned Whitenoise and Gunicorn configuration for production readiness.

---

## 📂 Project Anatomy

```text
├── backend/                # Enterprise Django API
│   ├── api/                # Core Logic (Models: School, Material, Enrollment)
│   ├── config/             # System Configuration & Security
│   ├── management/         # CLI Tools (Project-specific seed_db)
│   └── railway.toml        # Production Deployment Specs
├── src/                    # React 19 Application
│   ├── components/         # Reusable Atomic UI Units
│   ├── pages/              # Portal Views (Faculty/Student Dashboards)
│   ├── context/            # Auth & RBAC State
│   └── services/           # Backend API Integration Layer
├── start_node.bat          # Unified Project Bootstrapper
└── .env.template           # Environment Specification
```

---

## 🚀 Local Development

### Prerequisites
- Python 3.10+
- Node.js 18.x
- PostgreSQL or SQLite

### 1. Backend Bootstrapping
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate

# Seed the database with 8 semesters of data for all Schools
python manage.py seed_db
python manage.py runserver
```

### 2. Frontend Bootstrapping
```bash
npm install
npm run start
```

---

## 📡 Essential Endpoints

| Category | Endpoint | Access |
| :--- | :--- | :--- |
| **Auth** | `/api/token/` | Public |
| **Academic** | `/api/subjects/` | Auth Required |
| **Ingestion** | `/api/materials/` | Faculty Only |
| **Profile** | `/api/status/` | Role-based |

---

## 🏁 Verification & Deployment
- **Deployment Ready**: Optimized `vercel.json` and `railway.toml` for zero-downtime deployment.
- **Mobile First**: Fully responsive layouts tested across multiple viewport sizes.
- **Unit Tested**: Core logic verified via robust testing suites.

---

*Built with a focus on academic excellence and technological innovation.*