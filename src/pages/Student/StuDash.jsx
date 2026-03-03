import React, { useState } from 'react';
import { NotifDrop } from '../../components/NotifDrop';
import { STUDENT_DATA } from '../../data/mockData';
import { StuOverview, StuActivity, StuSubjects, StuMaterials, StuAssignments, StuExams, StuPerf, StuRec, StuProfile } from './StuDashPages';

const STU_NAV = [
    { id: "overview", ico: "🏠", lbl: "Dashboard" },
    { id: "activity", ico: "📈", lbl: "My Activity" },
    { id: "subjects", ico: "📚", lbl: "My Subjects" },
    { id: "materials", ico: "📂", lbl: "Study Materials" },
    { id: "assignments", ico: "📝", lbl: "Assignments", badge: 2 },
    { id: "exams", ico: "📅", lbl: "Upcoming Exams" },
    { id: "performance", ico: "📊", lbl: "Performance" },
    { id: "rec", ico: "💡", lbl: "Recommendations", badge: "New", bg: true },
    { id: "profile", ico: "👤", lbl: "My Profile" },
];

const STU_TITLES = {
    overview: "Dashboard Overview", activity: "My Activity", subjects: "My Subjects",
    materials: "Study Materials", assignments: "Assignments", exams: "Upcoming Exams",
    performance: "Performance Analytics", rec: "Recommendations", profile: "My Profile"
};

export function StuDash({ setView, dark, toggleDark }) {
    const [page, setPage] = useState("overview");
    const [sbOpen, setSbOpen] = useState(false);
    const [nd, setNd] = useState(false);

    const P = {
        overview: <StuOverview setPage={setPage} />,
        activity: <StuActivity />,
        subjects: <StuSubjects />,
        materials: <StuMaterials />,
        assignments: <StuAssignments />,
        exams: <StuExams />,
        performance: <StuPerf />,
        rec: <StuRec />,
        profile: <StuProfile />
    };

    return (
        <div className="dash">
            {sbOpen && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 299 }} onClick={() => setSbOpen(false)} />}
            {/* SIDEBAR */}
            <div className={`sidebar${sbOpen ? " open" : ""}`}>
                <div className="sb-head">
                    <div className="sb-logo">
                        <div className="sb-badge">S</div>
                        <div><div className="sb-title">SAGE University</div><div className="sb-sub">Academic Portal</div></div>
                    </div>
                </div>
                <div className="sb-profile">
                    <div className="sb-avatar">{STUDENT_DATA.initials}</div>
                    <div>
                        <div className="sb-name">{STUDENT_DATA.name}</div>
                        <div className="sb-roll">{STUDENT_DATA.roll}</div>
                        <div className="sb-online">Online</div>
                    </div>
                </div>
                <div className="sb-nav">
                    <div className="sb-sec">Navigation</div>
                    {STU_NAV.map(n => (
                        <div key={n.id} className={`sb-item${page === n.id ? " on" : ""}`} onClick={() => { setPage(n.id); setSbOpen(false); }}>
                            <span className="sb-ico">{n.ico}</span><span>{n.lbl}</span>
                            {n.badge && <div className={`sb-pill${n.bg ? " g" : ""}`}>{n.badge}</div>}
                        </div>
                    ))}
                </div>
                <div className="sb-foot">
                    <div className="sb-item" style={{ color: "rgba(225,29,72,.75)" }} onClick={() => setView("home")}>
                        <span className="sb-ico">🚪</span>Logout
                    </div>
                </div>
            </div>
            {/* MAIN */}
            <div className="main">
                <div className="topbar">
                    <div className="tb-left">
                        <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 19 }} onClick={() => setSbOpen(p => !p)}>☰</button>
                        <div><div className="tb-title">{STU_TITLES[page]}</div><div className="tb-sub">Semester {STUDENT_DATA.sem} · {STUDENT_DATA.branch}</div></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div className="searchbar" style={{ display: "flex" }}><span style={{ fontSize: 13, opacity: .5 }}>🔍</span><input placeholder="Search…" style={{ width: 140 }} /></div>
                        <button className="ico-btn" onClick={toggleDark}>{dark ? "☀️" : "🌙"}</button>
                        <div style={{ position: "relative" }}>
                            <button className="ico-btn" onClick={() => setNd(p => !p)}>🔔<div className="notif-dot" /></button>
                            {nd && <NotifDrop onClose={() => setNd(false)} />}
                        </div>
                        <div className="sb-avatar" style={{ width: 34, height: 34, borderRadius: 9, fontSize: 12 }}>{STUDENT_DATA.initials}</div>
                    </div>
                </div>
                <div className="content">{P[page] || P.overview}</div>
            </div>
        </div>
    );
}
