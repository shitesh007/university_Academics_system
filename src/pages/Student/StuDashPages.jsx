import React, { useState, useEffect } from 'react';
import { AttRing } from '../../components/AttRing';
import { api } from '../../services/api';

export function StuOverview({ setPage, user }) {
    return (
        <div className="fi">
            {/* Welcome */}
            <div className="welcome fu">
                <div className="w-orb" style={{ width: 320, height: 320, background: "#D97706", opacity: .1, top: -100, right: -60, animation: "float 10s ease-in-out infinite" }} />
                <div className="w-orb" style={{ width: 200, height: 200, background: "#7C3AED", opacity: .08, bottom: -60, left: "40%" }} />
                <div className="w-grid" />
                <div className="w-inner">
                    <div className="w-greeting">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    <div className="w-name">Welcome back, <span>{user?.name?.split(' ')[0] || 'Student'}</span> 👋</div>
                    <div className="w-meta">{user?.school_name || 'SAGE University Portal'}</div>
                </div>
            </div>

            {/* Quick action cards */}
            <div className="g4">
                {[
                    { ico: "📁", bg: "rgba(37,99,235,.1)", n: "Materials", l: "Browse your notes and PYQs", action: () => setPage("materials") },
                    { ico: "📚", bg: "rgba(217,119,6,.1)", n: "Subjects", l: "View your active subjects", action: () => setPage("subjects") },
                    { ico: "👤", bg: "rgba(124,58,237,.1)", n: "Profile", l: "View your personal details", action: () => setPage("profile") },
                ].map((s, i) => (
                    <div className="ms" key={i} style={{ animationDelay: `${i * .07}s`, cursor: 'pointer' }} onClick={s.action}>
                        <div className="ms-ico" style={{ background: s.bg }}>{s.ico}</div>
                        <div className="ms-n">{s.n}</div><div className="ms-l">{s.l}</div>
                        <div className="ms-t tup" style={{ marginTop: 8 }}>Click to view →</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function StuSubjects({ user }) {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getEnrollments().then(res => {
            setSubs(res);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="fi" style={{ padding: 40, textAlign: 'center' }}>Loading Subjects...</div>;

    return (
        <div className="fi g2" style={{ alignItems: "start" }}>
            <div className="card cp">
                <div className="ct">📚 My Academic Subjects</div>
                {subs.map((e, i) => (
                    <div className="sr" key={i}>
                        <span style={{ fontSize: 21 }}>💻</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.subject?.name}</div>
                            <div style={{ fontSize: 11, color: "var(--muted)" }}>{e.subject?.code}</div>
                        </div>
                    </div>
                ))}
                {subs.length === 0 && <div style={{ padding: 10, color: 'var(--muted)' }}>No subjects enrolled for this semester yet.</div>}
            </div>

            <div>
                <div className="card cp" style={{ marginBottom: 18 }}>
                    <div className="ct">🕐 Estimated Attendance</div>
                    <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                        <AttRing pct={78} color="#2563EB" />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, color: "var(--navy)", fontWeight: 600 }}>Looking Good!</div>
                            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>You are maintaining above the 75% criteria. Keep attending regular classes.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function StuMaterials({ user }) {
    const [tab, setTab] = useState("Notes");
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Automatically fetches materials for the student's JWT-based school and semester
        api.getMaterials().then(res => {
            setMaterials(res);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const TABS = ["Notes", "PYQs", "E-books"];
    // Map backend categories to our UI tabs
    const catMap = {
        'notes': 'Notes',
        'pyq': 'PYQs',
        'ebook': 'E-books',
        // Fallbacks in case old seeds still use these
        'video': 'Notes',
        'topic': 'Notes'
    };

    const files = materials.filter(m => catMap[m.category] === tab);

    if (loading) return <div className="fi" style={{ padding: 40, textAlign: 'center' }}>Loading Materials...</div>;

    return (
        <div className="fi">
            <div className="tabs">
                {TABS.map(t => <button key={t} className={`tab${tab === t ? " on" : ""}`} onClick={() => setTab(t)}>{t}</button>)}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {files.map((f, i) => (
                    <div className="mat-row" key={i}>
                        <div className="mat-icon" style={{ background: "rgba(37,99,235,.1)" }}>
                            {f.category === 'pyq' ? '📄' : (f.category === 'ebook' ? '📗' : '📓')}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className="mat-name">{f.title} <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: "normal" }}>({f.subject_code})</span></div>
                            <div className="mat-meta">{f.size_mb} MB · Uploaded {new Date(f.upload_date).toLocaleDateString()} · By {f.uploaded_by_name}</div>
                        </div>
                        <button className="btn btn-navy btn-sm" style={{ fontSize: 11, padding: "7px 14px" }} onClick={() => window.open(f.file_url, "_blank")}>⬇ Download</button>
                    </div>
                ))}
            </div>

            {files.length === 0 && (
                <div style={{ padding: 40, textAlign: 'center', background: 'var(--card)', borderRadius: 12, border: '1px dashed var(--border)' }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>No {tab} Found</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>No materials have been uploaded in this category for your school and semester yet.</div>
                </div>
            )}
        </div>
    );
}

export function StuProfile({ user }) {
    return (
        <div className="fi g2" style={{ alignItems: "start" }}>
            <div>
                <div className="card cp" style={{ marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
                        <div style={{ width: 68, height: 68, borderRadius: 14, background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                            {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
                        </div>
                        <div>
                            <div style={{ fontFamily: "Lora,serif", fontWeight: 700, fontSize: 19, color: "var(--navy)" }}>{user?.name || "Student Name"}</div>
                            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>Username / Roll Number: {user?.username}</div>
                            <div style={{ display: "flex", gap: 7, marginTop: 8, flexWrap: "wrap" }}>
                                <span style={{ background: "rgba(37,99,235,.1)", color: "var(--blue)", padding: "3px 9px", borderRadius: 100, fontSize: 11, fontWeight: 700 }}>
                                    Semester {user?.semester || "1"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="divider" />
                    <div className="ct">Personalized Academic Info</div>
                    {[
                        ["🏫 School", user?.school_name || "Assigned School"],
                        ["🎓 Code", user?.school_code || "N/A"],
                        ["🏷️ Role", "Student Account"]
                    ].map(([l, v], i) => (
                        <div key={i} style={{ display: "flex", gap: 13, padding: "10px 0", borderBottom: "1px solid var(--border)", fontSize: 12 }}>
                            <span style={{ color: "var(--muted)", minWidth: 100 }}>{l}</span>
                            <span style={{ color: "var(--navy)", fontWeight: 500, flex: 1 }}>{v}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="card cp">
                    <div className="ct">📊 Portal Security</div>
                    {[
                        ["🔐 Authentication", "JWT Secure Token"],
                        ["🌐 Session Status", "Active"],
                        ["📅 Extracted Token Role", "Student Protected"]
                    ].map(([l, v], i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid var(--border)", fontSize: 12 }}>
                            <span style={{ color: "var(--muted)" }}>{l}</span>
                            <span style={{ fontWeight: 700, color: "var(--emerald)" }}>{v}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
