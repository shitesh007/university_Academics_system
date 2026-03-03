import React, { useState } from 'react';
import { SUBJECTS, SCHOOLS, QUERIES } from '../../data/mockData';

const RECENT_ACT = [
    { c: "#22C55E", t: "Uploaded 'Unit 3 – Trees Notes' to CS-301", time: "2 hours ago" },
    { c: "#3B82F6", t: "New student query from Aryan Mehta in CS-301", time: "3 hours ago" },
    { c: "#F59E0B", t: "Announcement posted: Mid-semester schedule", time: "Yesterday" },
    { c: "#8B5CF6", t: "Resolved 2 student queries in CS-302", time: "2 days ago" },
];

export function FacOverview({ setPage }) {
    return (
        <div className="fi">
            <div style={{ fontFamily: "Lora,serif", fontWeight: 700, fontSize: 22, color: "var(--navy)", marginBottom: 3 }}>Good Morning, Dr. Rahul! 👋</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 18 }}>Here's your portal activity summary for today.</div>
            <div className="ann">
                <span className="ann-ico">🗓️</span>
                <div className="ann-txt">Mid-semester exams scheduled from <strong>April 14–20, 2025</strong>. Please ensure all subject materials are up-to-date.</div>
            </div>
            <div className="g4" style={{ marginBottom: 22 }}>
                {[{ ico: "📚", bg: "rgba(37,99,235,.1)", n: 6, l: "Subjects Assigned", c: "+1 this sem" }, { ico: "📂", bg: "rgba(5,150,105,.1)", n: 48, l: "Uploaded Files", c: "+5 this week" }, { ico: "💬", bg: "rgba(249,115,22,.1)", n: 3, l: "Pending Queries", c: "Needs attention" }, { ico: "👥", bg: "rgba(124,58,237,.1)", n: 312, l: "Total Students", c: "Across 6 subjects" }].map((s, i) => (
                    <div className="ms" key={i}><div className="ms-ico" style={{ background: s.bg }}>{s.ico}</div><div className="ms-n">{s.n}</div><div className="ms-l">{s.l}</div><div className="ms-t tup">{s.c}</div></div>
                ))}
            </div>
            <div className="g2" style={{ marginBottom: 22 }}>
                <div className="card cp">
                    <div className="ct">📈 Recent Activity</div>
                    {RECENT_ACT.map((a, i) => (
                        <div key={i} style={{ display: "flex", gap: 11, padding: "11px 0", borderBottom: i < RECENT_ACT.length - 1 ? "1px solid var(--border)" : "none" }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: a.c, flexShrink: 0, marginTop: 5 }} />
                            <div><div style={{ fontSize: 13, color: "var(--navy)" }}>{a.t}</div><div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>🕒 {a.time}</div></div>
                        </div>
                    ))}
                </div>
                <div className="card cp">
                    <div className="ct">📚 Material Upload Progress</div>
                    {SUBJECTS.map((s, i) => (
                        <div key={i} style={{ marginBottom: 15 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 12 }}>
                                <span style={{ fontWeight: 600, color: "var(--navy)" }}>{s.name}</span>
                                <span style={{ color: "var(--muted)" }}>{[75, 60, 90, 45, 80, 55][i]}%</span>
                            </div>
                            <div className="prog-wrap"><div className="prog-fill" style={{ width: `${[75, 60, 90, 45, 80, 55][i]}%` }} /></div>
                        </div>
                    ))}
                    <button className="btn btn-out btn-sm" style={{ marginTop: 8, fontSize: 12 }} onClick={() => setPage("subjects")}>View All Subjects →</button>
                </div>
            </div>
            <div className="card cp">
                <div className="ct">⚡ Quick Actions</div>
                <div style={{ display: "flex", gap: 11, flexWrap: "wrap" }}>
                    {[["📤", "Upload Material", "upload"], ["💬", "View Queries", "queries"], ["📢", "Post Announcement", "announce"]].map(([ic, l, p], i) => (
                        <button key={i} className="btn btn-navy" style={{ fontSize: 13 }} onClick={() => setPage(p)}>{ic} {l}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function FacUpload() {
    const [status, setStatus] = useState("");
    const go = () => { setStatus("loading"); setTimeout(() => setStatus("done"), 2000); setTimeout(() => setStatus(""), 5000); };
    return (
        <div className="fi">
            {status === "done" && <div style={{ background: "rgba(5,150,105,.08)", border: "1px solid rgba(5,150,105,.3)", borderRadius: 10, padding: "12px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 9, color: "var(--emerald)", fontWeight: 600, fontSize: 13 }}>✅ Material published! Students can now access it.</div>}
            <div className="g2" style={{ alignItems: "start" }}>
                <div className="card cp">
                    <div className="ct">📋 Material Details</div>
                    {[["Select School", "select", SCHOOLS.map(s => s.name)], ["Select Semester", "select", [1, 2, 3, 4, 5, 6, 7, 8].map(n => `Semester ${n}`)], ["Select Subject", "select", SUBJECTS.map(s => `${s.name} (${s.code})`)], ["Material Category", "select", ["Notes", "E-book", "PYQs", "Tutorial Video", "Important Topics", "Assignment", "Other"]]].map(([l, type, opts], i) => (
                        <div className="fld" key={i}>
                            <label className="fld-label">{l}</label>
                            <select style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: "var(--r-sm)", background: "var(--surface)", fontFamily: "Sora,sans-serif", fontSize: 13, color: "var(--navy)", outline: "none" }}>
                                <option>-- Select --</option>
                                {opts.map((o, j) => <option key={j}>{o}</option>)}
                            </select>
                        </div>
                    ))}
                    <div className="fld">
                        <label className="fld-label">Description</label>
                        <textarea style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: "var(--r-sm)", background: "var(--surface)", fontFamily: "Sora,sans-serif", fontSize: 13, color: "var(--navy)", outline: "none", resize: "vertical", minHeight: 80 }} placeholder="Brief description…" />
                    </div>
                </div>
                <div>
                    <div className="card cp" style={{ marginBottom: 18 }}>
                        <div className="ct">📂 Upload File</div>
                        <div className="up-zone">
                            <div style={{ fontSize: 46, marginBottom: 12 }}>☁️</div>
                            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--navy)", marginBottom: 7 }}>Drag & drop your file here</div>
                            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14 }}>or click to browse files</div>
                            <button className="btn btn-out btn-sm">Browse Files</button>
                            <div style={{ marginTop: 12, fontSize: 11, color: "var(--muted2)" }}>PDF, DOC, PPT, MP4 · Max 100MB</div>
                        </div>
                    </div>
                    <div className="card cp">
                        <div className="ct">📋 Guidelines</div>
                        {["Use clear, descriptive file names", "Review content before publishing", "Do not upload copyrighted material", "Compress large video files"].map((g, i) => (
                            <div key={i} style={{ display: "flex", gap: 9, marginBottom: 9, fontSize: 12, color: "var(--muted)" }}>✅ {g}</div>
                        ))}
                        <button className="btn btn-navy" style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: 14, marginTop: 12 }} onClick={go} disabled={status === "loading"}>
                            {status === "loading" ? <><span style={{ animation: "spin .7s linear infinite", display: "inline-block", marginRight: 7 }}>⟳</span>Publishing…</> : "🚀 Publish Material"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function FacSubjects() {
    return (
        <div className="fi">
            <div style={{ fontFamily: "Lora,serif", fontWeight: 700, fontSize: 21, color: "var(--navy)", marginBottom: 3 }}>Manage Subjects</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>All subjects assigned to you this semester.</div>
            <div className="card">
                <div className="cp">
                    <div className="tbl-wrap">
                        <table>
                            <thead><tr>{["Subject", "Code", "Materials", "Students", "Progress", "Action"].map(h => <th key={h}>{h}</th>)}</tr></thead>
                            <tbody>
                                {SUBJECTS.map((s, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600 }}>{s.emoji} {s.name}</td>
                                        <td><span style={{ background: "rgba(37,99,235,.1)", color: "var(--blue)", padding: "2px 8px", borderRadius: 100, fontSize: 11, fontWeight: 700 }}>{s.code}</span></td>
                                        <td>{[8, 12, 6, 9, 7, 11][i]} files</td>
                                        <td>{[52, 48, 61, 55, 47, 49][i]}</td>
                                        <td style={{ minWidth: 100 }}>
                                            <div className="prog-wrap"><div className="prog-fill" style={{ width: `${s.prog}%` }} /></div>
                                            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{s.prog}%</div>
                                        </td>
                                        <td><button className="btn btn-navy btn-sm" style={{ fontSize: 11, padding: "6px 12px" }}>Manage →</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function FacQueries() {
    const [filter, setFilter] = useState("All");
    const shown = filter === "All" ? QUERIES : QUERIES.filter(q => q.status === filter.toLowerCase());
    return (
        <div className="fi">
            <div style={{ fontFamily: "Lora,serif", fontWeight: 700, fontSize: 21, color: "var(--navy)", marginBottom: 3 }}>Student Queries</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 18 }}>Review and respond to student questions.</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["All", "Pending", "Open", "Resolved"].map(f => <div key={f} className={`chip${filter === f ? " on" : ""}`} onClick={() => setFilter(f)}>{f}</div>)}
            </div>
            {shown.map((q, i) => (
                <div className="card cp" key={i} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 11 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div className="sb-avatar" style={{ width: 38, height: 38, borderRadius: 9, fontSize: 12, background: "linear-gradient(135deg,#1A3270,#2563EB)" }}>{q.av}</div>
                            <div><div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)" }}>{q.stu}</div><div style={{ fontSize: 11, color: "var(--muted)" }}>📖 {q.subj} · 🕒 {q.time}</div></div>
                        </div>
                        <span className={`sb2 ${q.status === "pending" ? "s-pend" : q.status === "open" ? "s-open" : "s-done"}`}>{q.status.charAt(0).toUpperCase() + q.status.slice(1)}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, background: "var(--surface)", padding: "11px 14px", borderRadius: 8, marginBottom: 12 }}>"{q.q}"</div>
                    <div style={{ display: "flex", gap: 9 }}>
                        {q.status !== "resolved" && <><button className="btn btn-navy btn-sm" style={{ fontSize: 11, padding: "7px 14px" }}>💬 Reply</button><button className="btn btn-out btn-sm" style={{ fontSize: 11, padding: "6px 12px" }}>✅ Resolve</button></>}
                        {q.status === "resolved" && <div style={{ fontSize: 12, color: "var(--emerald)", fontWeight: 700 }}>✅ Query resolved</div>}
                    </div>
                </div>
            ))}
        </div>
    );
}

export function FacAnnounce() {
    return (
        <div className="fi g2" style={{ alignItems: "start" }}>
            <div className="card cp">
                <div className="ct">📝 Create Announcement</div>
                {[["Title", "text", "e.g. Assignment submission extended"], ["Message", "textarea", "Write your announcement here…"], ["Target Audience", "select", ["All Students", ...SUBJECTS.map(s => `${s.name} (${s.code})`)]]].map(([l, type, ph], i) => (
                    <div className="fld" key={i}>
                        <label className="fld-label">{l}</label>
                        {type === "textarea" ? <textarea style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: "var(--r-sm)", background: "var(--surface)", fontFamily: "Sora,sans-serif", fontSize: 13, color: "var(--navy)", outline: "none", resize: "vertical", minHeight: 100 }} placeholder={ph} /> :
                            type === "select" ? <select style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: "var(--r-sm)", background: "var(--surface)", fontFamily: "Sora,sans-serif", fontSize: 13, color: "var(--navy)", outline: "none" }}>{(ph).map((o, j) => <option key={j}>{o}</option>)}</select> :
                                <input style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: "var(--r-sm)", background: "var(--surface)", fontFamily: "Sora,sans-serif", fontSize: 13, color: "var(--navy)", outline: "none" }} placeholder={ph} />}
                    </div>
                ))}
                <button className="btn btn-navy" style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: 14 }}>📢 Post Announcement</button>
            </div>
            <div className="card cp">
                <div className="ct">📋 Recent Announcements</div>
                {[{ title: "Mid-semester schedule released", body: "The mid-semester examination schedule has been published. Please check the timetable.", date: "Mar 1, 2025", st: "active" }, { title: "Assignment 2 Deadline Extended", body: "Deadline for Assignment 2 in CS-301 extended to March 25 due to student requests.", date: "Feb 28, 2025", st: "active" }, { title: "Guest Lecture on AI", body: "Dr. A.K. Singh from IIT Delhi will deliver a guest lecture on March 10 at 3 PM.", date: "Feb 20, 2025", st: "expired" }].map((a, i) => (
                    <div key={i} style={{ padding: "13px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                            <div style={{ fontWeight: 700, fontSize: 13, color: "var(--navy)" }}>{a.title}</div>
                            <span className={`sb2 ${a.st === "active" ? "s-open" : "s-done"}`}>{a.st}</span>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5, marginBottom: 5 }}>{a.body}</div>
                        <div style={{ fontSize: 11, color: "var(--muted2)" }}>📅 {a.date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function FacProfile() {
    return (
        <div className="fi g2" style={{ alignItems: "start" }}>
            <div className="card cp">
                <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 22 }}>
                    <div className="sb-avatar f-avatar" style={{ width: 66, height: 66, borderRadius: 14, fontSize: 20, flexShrink: 0 }}>DR</div>
                    <div>
                        <div style={{ fontFamily: "Lora,serif", fontWeight: 700, fontSize: 19, color: "var(--navy)" }}>Dr. Rahul Mishra</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>Associate Professor · CS & E</div>
                        <div style={{ display: "flex", gap: 7, marginTop: 7, flexWrap: "wrap" }}>
                            <span style={{ background: "rgba(217,119,6,.1)", color: "var(--gold)", padding: "2px 9px", borderRadius: 100, fontSize: 11, fontWeight: 700 }}>CS Department</span>
                            <span style={{ background: "rgba(37,99,235,.1)", color: "var(--blue)", padding: "2px 9px", borderRadius: 100, fontSize: 11, fontWeight: 700 }}>6 Subjects</span>
                        </div>
                    </div>
                </div>
                <div className="divider" />
                <div className="ct">Edit Profile</div>
                {[["Full Name", "Dr. Rahul Mishra"], ["Email", "r.mishra@sageuniversity.edu.in"], ["Department", "Computer Science & Engineering"], ["Designation", "Associate Professor"], ["University ID", "SAGE-FAC-2024-0042"]].map(([l, v], i) => (
                    <div className="fld" key={i}>
                        <label className="fld-label">{l}</label>
                        <input className="fld-input" defaultValue={v} style={{ paddingLeft: 14 }} />
                    </div>
                ))}
                <button className="btn btn-navy" style={{ padding: "11px 26px", fontSize: 13 }}>💾 Save Changes</button>
            </div>
            <div>
                <div className="card cp" style={{ marginBottom: 18 }}>
                    <div className="ct">🔐 Change Password</div>
                    {["Current Password", "New Password", "Confirm New Password"].map((l, i) => (
                        <div className="fld" key={i}>
                            <label className="fld-label">{l}</label>
                            <input className="fld-input" type="password" placeholder="••••••••" style={{ paddingLeft: 14 }} />
                        </div>
                    ))}
                    <button className="btn btn-out btn-sm" style={{ fontSize: 12 }}>Update Password</button>
                </div>
                <div className="card cp">
                    <div className="ct">📊 Profile Stats</div>
                    {[["📂 Total Uploads", "48 Files"], ["💬 Queries Resolved", "127"], ["⭐ Student Rating", "4.8 / 5.0"], ["🗓️ Teaching Since", "August 2019"]].map(([l, v], i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid var(--border)", fontSize: 12 }}>
                            <span style={{ color: "var(--muted)" }}>{l}</span>
                            <span style={{ fontWeight: 700, color: "var(--navy)" }}>{v}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
