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
    const [mats, setMats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        Promise.all([api.getEnrollments(), api.getMaterials()])
            .then(([rSubs, rMats]) => {
                setSubs(rSubs);
                setMats(rMats);
                setLoading(false);
            }).catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="fi" style={{ padding: 40, textAlign: 'center' }}>Loading Subjects...</div>;

    return (
        <div className="fi">
            <div className="card cp">
                <div className="ct">📚 My Academic Subjects</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 15 }}>Click on any subject below to view its study materials and notes unit-wise.</div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {subs.map((e, i) => {
                        const subjMats = mats.filter(m => m.subject_code === e.subject.code);
                        const isExp = expanded === e.subject.code;

                        return (
                            <div key={i} style={{ display: "flex", flexDirection: "column", padding: 15, cursor: "pointer", transition: "all .2s ease", border: isExp ? "1px solid var(--blue)" : "1px solid var(--border)", borderRadius: 10, background: isExp ? "rgba(37,99,235,.02)" : "var(--surface)" }} onClick={() => setExpanded(isExp ? null : e.subject.code)}>
                                <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(37,99,235,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📘</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.subject?.name}</div>
                                        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{e.subject?.code} · {subjMats.length} Learning Resources</div>
                                    </div>
                                    <div style={{ fontSize: 18, color: "var(--muted)", transform: isExp ? "rotate(180deg)" : "none", transition: "transform .3s ease" }}>
                                        ▾
                                    </div>
                                </div>

                                {isExp && (
                                    <div style={{ marginTop: 15, paddingTop: 15, borderTop: "1px dashed var(--border)", display: "flex", flexDirection: "column", gap: 8 }} onClick={e => e.stopPropagation()}>
                                        {subjMats.length === 0 ? <div style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", padding: "10px" }}>No materials have been provided for this subject yet.</div> :
                                            subjMats.map(m => (
                                                <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(0,0,0,.05)" }}>
                                                    <div style={{ flex: 1, minWidth: 0, marginRight: 10 }}>
                                                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.title}</div>
                                                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>
                                                            <span style={{ background: "rgba(37,99,235,.1)", color: "var(--blue)", padding: "2px 6px", borderRadius: 4, marginRight: 6 }}>{m.category === 'pyq' ? 'PYQ' : (m.category === 'ebook' ? 'E-Book' : (m.category === 'tutorial' ? 'Video' : (m.category === 'important' ? 'Important' : 'Notes')))}</span>
                                                            {m.size_mb} MB · Uploaded by {m.uploaded_by_name}
                                                        </div>
                                                        {m.ai_summary && (
                                                            <div style={{ marginTop: 8, padding: 8, borderRadius: 6, background: "rgba(139,92,246,0.1)", border: "1px dashed rgba(139,92,246,0.3)", color: "var(--navy)", fontSize: 11, lineHeight: 1.4, whiteSpace: "normal" }}>
                                                                <span style={{ fontWeight: 600, color: "#8b5cf6", marginRight: 5 }}>✨ AI Summary:</span>
                                                                {m.ai_summary}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button className="btn btn-navy btn-sm" style={{ fontSize: 11, padding: "6px 14px", whiteSpace: "nowrap" }} onClick={() => {
                                                        const base = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '');
                                                        const fp = m.file ? (m.file.startsWith('http') ? m.file : `${base}${m.file}`) : (m.file_url?.startsWith('http') ? m.file_url : `${base}${m.file_url}`);
                                                        window.open(fp, "_blank");
                                                    }}>⬇ Download</button>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {subs.length === 0 && <div style={{ padding: 20, textAlign: "center", color: 'var(--muted)' }}>No subjects enrolled for this semester yet.</div>}
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

    const TABS = ["Notes", "PYQs", "E-books", "Important Topics", "Tutorials"];
    // Map backend categories to our UI tabs
    const catMap = {
        'notes': 'Notes',
        'pyq': 'PYQs',
        'important': 'Important Topics',
        'tutorial': 'Tutorials',
        'ebook': 'E-books',
        // Fallbacks in case old seeds still use these
        'video': 'Tutorials',
        'topic': 'Important Topics'
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
                            {f.category === 'pyq' ? '📄' : (f.category === 'ebook' ? '📗' : (f.category === 'tutorial' ? '▶️' : (f.category === 'important' ? '⭐' : '📓')))}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className="mat-name">{f.title} <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: "normal" }}>({f.subject_code})</span></div>
                            <div className="mat-meta">{f.size_mb} MB · Uploaded {new Date(f.upload_date).toLocaleDateString()} · By {f.uploaded_by_name}</div>
                            {f.ai_summary && (
                                <div style={{ marginTop: 10, padding: 10, borderRadius: 6, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "var(--navy)", fontSize: 12, lineHeight: 1.5 }}>
                                    <div style={{ fontWeight: 600, color: "#8b5cf6", marginBottom: 4 }}>✨ AI Summary</div>
                                    {f.ai_summary}
                                </div>
                            )}
                        </div>
                        <button className="btn btn-navy btn-sm" style={{ fontSize: 11, padding: "7px 14px" }} onClick={() => {
                            const base = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '');
                            const fp = f.file ? (f.file.startsWith('http') ? f.file : `${base}${f.file}`) : (f.file_url?.startsWith('http') ? f.file_url : `${base}${f.file_url}`);
                            window.open(fp, "_blank");
                        }}>⬇ Download</button>
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
