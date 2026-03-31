# Academics Hub 🎓
### The Enterprise Academic Portal for Modern Universities

**Academics Hub** is a state-of-the-art, full-stack ecosystem designed to streamline university operations across multi-disciplinary faculties. It provides a centralized platform for curriculum mapping, automated study material ingestion, and AI-powered learning assistance, supporting specialized requirements for Engineering, Business, and Law.

![Frontend](https://img.shields.io/badge/Frontend-React%2019-blue?style=for-the-badge&logo=react)
![Backend](https://img.shields.io/badge/Backend-Django%206.0-green?style=for-the-badge&logo=django)
![AI](https://img.shields.io/badge/AI-Gemini%201.5-orange?style=for-the-badge&logo=google-gemini)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge&logo=postgresql)

---

## 🏛️ Multi-School Architecture
Designed with a modular "School" hierarchy, Academics Hub handles diverse academic tracks within a single unified infrastructure:

*   **School of Engineering (SOE)**: Technical curricula including Computer Science, ECE, and Mechanical Engineering.
*   **School of Business Administration (SOB)**: Management roadmaps for BBA, MBA, and Executive programs.
*   **School of Law (SOL)**: Legal studies integration with Constitutional and Corporate law tracks.

## 🚀 Key Features

### 📅 8-Semester Curriculum Mapping
*   **Complete Roadmap**: Pre-loaded with a full 8-semester syllabus for all integrated schools.
*   **Subject Orchestration**: Dynamic credit-based tracking and faculty assignment.
*   **Enrollment System**: Automated student-to-subject mapping based on semester progression.

### 🤖 AI-Powered Ingestion & Summarization
*   **Gemini Integration**: Deeply integrated with **Google Gemini 1.5 Pro** to automatically generate unit-wise summaries from uploaded PDFs.
*   **Smart Categorization**: Automated tracking of **PYQs (Previous Year Questions)**, **Handwritten Notes**, and **E-books**.
*   **Metadata Extraction**: Real-time extraction of document size, category, and educational relevance.

### 🔐 Dual-Portal Experience
*   **Faculty Dashboard**: Advanced tools for material uploads, AI summary moderation, and student attendance tracking.
*   **Student Portal**: Personalized views showing enrolled subjects, downloadable resources, and CGPA tracking.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | **React 19 + Vite** | Modern Fiber architecture, ultra-fast HMR, and Atomic UI design. |
| **Backend** | **Django 6.0 + DRF** | Scalable REST API with robust ORM and middleware security. |
| **Database** | **PostgreSQL** | Enterprise relational storage (Optimized for Neon/AWS). |
| **AI Engine** | **Google Gemini** | LLM-driven document analysis and data summarization. |
| **Auth** | **JWT (SimpleJWT)** | Secure, stateless authentication with refresh/rotate cycles. |

---

## 📦 Database Schema Overview
The system follows a strict hierarchical relationship:
`School` ➔ `Department` ➔ `Faculty/Student` ➔ `Subject` ➔ `Material` ➔ `AI Summary`

---

## 🛠️ Local Setup Guide

### 1. Prerequisites
*   Python 3.11+
*   Node.js 20+
*   PostgreSQL Instance

### 2. Backend Configuration
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:
```env
DATABASE_URL=postgresql://neondb_owner:npg_yWl0zeh8fjkT@ep-lingering-darkness-a1mmkuva-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
SECRET_KEY=your_secret_key
GEMINI_API_KEY=your_gemini_key
DEBUG=True
```

### 3. Database Initialization
```bash
python manage.py migrate
# Seed the database with the full 8-semester curriculum
python manage.py seed_db
python manage.py runserver
```

### 4. Frontend Configuration
```bash
cd ..
npm install
npm run dev
```

---

## 🚦 Verification
To verify the installation:
1.  Navigate to `http://localhost:5173`.
2.  **Login as Engineering Student**: `aditya_sharma` / `sage@2025`
3.  **Login as Engineering Faculty**: `r_mishra` / `faculty@2025`
4.  Verify that all 8 semesters are visible in the curriculum view.

## ⚖️ License
Distributed under the MIT License. See `LICENSE` for more information.