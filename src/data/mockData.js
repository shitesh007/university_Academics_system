export const STUDENT_DATA = {
  name: "Aditya Sharma", initials: "AS",
  roll: "SAGE/CS/2022/0847", school: "School of Engineering",
  branch: "Computer Science & Engineering", sem: 5, section: "A",
  cgpa: 8.4, attendance: 78, credits: 142,
};

export const MathData = {}; // Just generic dummy

export const SCHOOLS = [
  { id: 1, emoji: "⚙️", name: "School of Engineering", cnt: "42 subjects" },
  { id: 2, emoji: "📊", name: "School of Business", cnt: "28 subjects" },
  { id: 3, emoji: "⚖️", name: "School of Law", cnt: "20 subjects" },
  { id: 4, emoji: "🎨", name: "School of Arts & Humanities", cnt: "32 subjects" },
  { id: 5, emoji: "💹", name: "School of Commerce", cnt: "24 subjects" },
  { id: 6, emoji: "🔬", name: "School of Science", cnt: "38 subjects" },
  { id: 7, emoji: "🏛️", name: "School of Architecture", cnt: "18 subjects" },
  { id: 8, emoji: "💊", name: "School of Pharmacy", cnt: "22 subjects" },
];

export const FEATURES = [
  { ico: "📚", bg: "rgba(37,99,235,.1)", title: "Semester-wise Content", desc: "Neatly organized materials from Semester 1 through Semester 8 for every course." },
  { ico: "✅", bg: "rgba(5,150,105,.1)", title: "Faculty Verified", desc: "All materials are reviewed and approved by subject faculty before publishing." },
  { ico: "📄", bg: "rgba(225,29,72,.1)", title: "Previous Year Papers", desc: "Extensive collection of PYQs with solution hints for exam preparation." },
  { ico: "🎯", bg: "rgba(249,115,22,.1)", title: "Important Topics", desc: "Curated important topics based on exam weightage and faculty insights." },
  { ico: "🔒", bg: "rgba(124,58,237,.1)", title: "Secure Platform", desc: "Role-based access ensures privacy and integrity of all academic resources." },
  { ico: "📱", bg: "rgba(217,119,6,.1)", title: "Mobile Friendly", desc: "Access your study materials anytime, anywhere on any device." },
];

export const TIMELINE = [
  { ico: "📥", clr: "#2563EB", bg: "rgba(37,99,235,.12)", title: "Downloaded 'Unit 3 – Trees & Graphs Notes'", sub: "Data Structures & Algorithms · CS-301", time: "Today, 10:24 AM", tag: "Download", tc: "rgba(37,99,235,.12)", tt: "#2563EB" },
  { ico: "✅", clr: "#059669", bg: "rgba(5,150,105,.12)", title: "Submitted Assignment 2 – Array Problems", sub: "CS-301", time: "Today, 9:05 AM", tag: "Submitted", tc: "rgba(5,150,105,.12)", tt: "#059669" },
  { ico: "🔖", clr: "#D97706", bg: "rgba(217,119,6,.12)", title: "Bookmarked 'Most Expected Questions 2025'", sub: "CS-301 · Important Topics", time: "Yesterday, 8:48 PM", tag: "Bookmarked", tc: "rgba(217,119,6,.12)", tt: "#D97706" },
  { ico: "💬", clr: "#7C3AED", bg: "rgba(124,58,237,.12)", title: "Posted a query on QuickSort worst-case complexity", sub: "CS-301", time: "Yesterday, 4:15 PM", tag: "Query", tc: "rgba(124,58,237,.12)", tt: "#7C3AED" },
  { ico: "📺", clr: "#0EA5E9", bg: "rgba(14,165,233,.12)", title: "Watched 'Sorting Algorithms Visualized' tutorial", sub: "CS-301 · DSA Tutorials", time: "Yesterday, 2:00 PM", tag: "Viewed", tc: "rgba(14,165,233,.12)", tt: "#0EA5E9" },
  { ico: "🏆", clr: "#D97706", bg: "rgba(217,119,6,.12)", title: "Achieved Top 10% in DBMS Quiz", sub: "CS-302", time: "Feb 28, 3:00 PM", tag: "Achievement", tc: "rgba(217,119,6,.12)", tt: "#D97706" },
];

export const SUBJECTS = [
  { name: "Data Structures & Algorithms", code: "CS-301", emoji: "💻", prog: 82, att: 80 },
  { name: "Database Management Systems", code: "CS-302", emoji: "🗄️", prog: 70, att: 72 },
  { name: "Operating Systems", code: "CS-303", emoji: "⚙️", prog: 90, att: 88 },
  { name: "Computer Networks", code: "CS-304", emoji: "🌐", prog: 55, att: 65 },
  { name: "Software Engineering", code: "CS-305", emoji: "📐", prog: 75, att: 82 },
  { name: "Machine Learning", code: "CS-306", emoji: "🤖", prog: 60, att: 70 },
];

export const EXAMS = [
  { day: "14", mon: "APR", subj: "Data Structures & Algorithms", time: "10:00 AM – 1:00 PM · Room 204", left: "7 days", bc: "#E11D48" },
  { day: "16", mon: "APR", subj: "Database Management Systems", time: "10:00 AM – 1:00 PM · Room 108", left: "9 days", bc: "#D97706" },
  { day: "18", mon: "APR", subj: "Operating Systems", time: "2:00 PM – 5:00 PM · Room 302", left: "11 days", bc: "#2563EB" },
];

export const RECS = [
  { emoji: "🧠", bg: "linear-gradient(135deg,rgba(37,99,235,.1),rgba(14,165,233,.05))", title: "Review Sorting Algorithms", sub: "Quiz score 58%. These notes + PYQs will help close the gap.", tag: "Weak Area", tc: "rgba(225,29,72,.12)", tt: "#E11D48" },
  { emoji: "📋", bg: "linear-gradient(135deg,rgba(217,119,6,.09),rgba(245,158,11,.04))", title: "Attempt 2024 DBMS PYQ Paper", sub: "Exam in 9 days. Last year's paper matches 70% of expected questions.", tag: "Exam Prep", tc: "rgba(217,119,6,.12)", tt: "#D97706" },
  { emoji: "🎬", bg: "linear-gradient(135deg,rgba(124,58,237,.09),rgba(124,58,237,.03))", title: "Watch CN Video Lectures", sub: "Attendance & progress in CS-304 are lowest at 55%. Catch up fast.", tag: "Low Progress", tc: "rgba(225,29,72,.12)", tt: "#E11D48" },
  { emoji: "⭐", bg: "linear-gradient(135deg,rgba(5,150,105,.09),rgba(5,150,105,.03))", title: "Download OS Important Topics", sub: "OS score is excellent (90%). These topics will help ace the exam.", tag: "Strength", tc: "rgba(5,150,105,.12)", tt: "#059669" },
];

export const ASGN = [
  { name: "Assignment 2 – Array Problems", sub: "CS-301 · DSA", due: "Done", done: true },
  { name: "DBMS Lab Report – Unit 2", sub: "CS-302 · DBMS", due: "Due Mar 28", done: false, dc: "#E11D48" },
  { name: "OS Process Scheduling Simulation", sub: "CS-303 · OS", due: "Due Apr 2", done: false, dc: "#D97706" },
  { name: "Network Topology Diagram", sub: "CS-304 · CN", due: "Due Apr 5", done: false, dc: "#2563EB" },
];

export const QUERIES = [
  { stu: "Aryan Mehta", av: "AM", subj: "DSA", q: "Could you clarify the time complexity of QuickSort in worst case?", time: "2h ago", status: "pending" },
  { stu: "Priya Rawat", av: "PR", subj: "DBMS", q: "What is the difference between 2NF and 3NF normalization?", time: "5h ago", status: "open" },
  { stu: "Rahul Soni", av: "RS", subj: "OS", q: "Can you share more examples of deadlock prevention?", time: "1d ago", status: "resolved" },
];
