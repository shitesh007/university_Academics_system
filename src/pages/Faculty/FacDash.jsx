import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { NotifDrop } from '../../components/NotifDrop';
import { FacOverview, FacUpload, FacSubjects, FacQueries, FacAnnounce, FacProfile } from './FacDashPages';

const FAC_NAV = [
    { id: "overview", ico: "📊", lbl: "Dashboard" },
    { id: "upload", ico: "📤", lbl: "Upload Material" },
    { id: "subjects", ico: "📚", lbl: "My Subjects" },
    { id: "queries", ico: "💬", lbl: "Student Queries", badge: 3, bg: true },
    { id: "announce", ico: "📢", lbl: "Announcements" },
    { id: "profile", ico: "👤", lbl: "My Profile" }
];

const FAC_TITLES = {
    overview: "Faculty Dashboard", upload: "Upload Material", subjects: "Manage Subjects", queries: "Student Queries", announce: "Announcements", profile: "Faculty Profile"
};

export function FacDash({ dark, toggleDark }) {
    const { logoutUser } = useContext(AuthContext);
    const [page, setPage] = useState("overview");
    const [sbOpen, setSbOpen] = useState(false);
    const [nd, setNd] = useState(false);

    const P = {
        overview: <FacOverview setPage={setPage} />, upload: <FacUpload />, subjects: <FacSubjects />,
        queries: <FacQueries />, announce: <FacAnnounce />, profile: <FacProfile />
    };

    return (
        <div className="dash">
            {sbOpen && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 299 }} onClick={() => setSbOpen(false)} />}
            <div className={`sidebar${sbOpen ? " open" : ""}`}>
                <div className="sb-head">
                    <div className="sb-logo">
                        <div className="sb-badge" style={{ background: "linear-gradient(135deg,#1A3270,#D97706)" }}>S</div>
                        <div><div className="sb-title">SAGE University</div><div className="sb-sub">Faculty Portal</div></div>
                    </div>
                </div>
                <div className="sb-profile">
                    <div className="sb-avatar f-avatar">DR</div>
                    <div>
                        <div className="sb-name">Dr. Rahul Mishra</div>
                        <div className="sb-roll" style={{ color: "var(--gold-lt)" }}>Faculty</div>
                        <div className="sb-online">Online</div>
                    </div>
                </div>
                <div className="sb-nav">
                    <div className="sb-sec">Navigation</div>
                    {FAC_NAV.map(n => (
                        <div key={n.id} className={`sb-item${page === n.id ? " on" : ""}`} onClick={() => { setPage(n.id); setSbOpen(false); }}>
                            <span className="sb-ico">{n.ico}</span><span>{n.lbl}</span>
                            {n.badge && <div className={`sb-pill${n.bg ? " g" : ""}`}>{n.badge}</div>}
                        </div>
                    ))}
                </div>
                <div className="sb-foot">
                    <div className="sb-item" style={{ color: "rgba(225,29,72,.75)" }} onClick={logoutUser}><span className="sb-ico">🚪</span>Logout</div>
                </div>
            </div>
            <div className="main">
                <div className="topbar">
                    <div className="tb-left">
                        <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 19 }} onClick={() => setSbOpen(p => !p)}>☰</button>
                        <div><div className="tb-title">{FAC_TITLES[page]}</div><div className="tb-sub">Computer Science & Engineering</div></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div className="searchbar" style={{ display: "flex" }}><span style={{ fontSize: 13, opacity: .5 }}>🔍</span><input placeholder="Search…" style={{ width: 140 }} /></div>
                        <button className="ico-btn" onClick={toggleDark}>{dark ? "☀️" : "🌙"}</button>
                        <div style={{ position: "relative" }}>
                            <button className="ico-btn" onClick={() => setNd(p => !p)}>🔔<div className="notif-dot" style={{ background: "var(--gold)" }} /></button>
                            {nd && <NotifDrop onClose={() => setNd(false)} />}
                        </div>
                        <div className="sb-avatar f-avatar" style={{ width: 34, height: 34, borderRadius: 9, fontSize: 13 }}>DR</div>
                    </div>
                </div>
                <div className="content">{P[page] || P.overview}</div>
            </div>
        </div>
    );
}
