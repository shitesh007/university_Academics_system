import React, { useState } from 'react';
import { AttRing } from '../../components/AttRing';
import { STUDENT_DATA, SUBJECTS, EXAMS, ASGN, RECS, TIMELINE } from '../../data/mockData';

export function StuOverview({ setPage }) {
    return (
        <div className="fi">
            {/* Welcome */}
            <div className="welcome fu">
                <div className="w-orb" style={{ width: 320, height: 320, background: "#D97706", opacity: .1, top: -100, right: -60, animation: "float 10s ease-in-out infinite" }} />
                <div className="w-orb" style={{ width: 200, height: 200, background: "#7C3AED", opacity: .08, bottom: -60, left: "40%" }} />
                <div className="w-grid" />
                <div className="w-inner">
                    <div className="w-greeting">Wednesday, 4 March 2026 · Semester {STUDENT_DATA.sem}</div>
                    <div className="w-name">Good morning, <span>Aditya</span> 👋</div>
                    <div className="w-meta">{STUDENT_DATA.branch} · Section {STUDENT_DATA.section}</div>
                    <div className="w-stats">
                        {[["8.4", "CGPA", "↑ 0.2 this sem"], ["78%", "Attendance", "Min 75% required"], ["142", "Credits", "Earned"], ["5", "Semester", "Current"]].map(([v, l, c], i) => (
                            <div className="ws" key={i}><div className="ws-n">{v}</div><div className="ws-l">{l}</div><div className="ws-c">{c}</div></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick stats */}
            <div className="g4">
                {[
                    { ico: "📥", bg: "rgba(37,99,235,.1)", n: "48", l: "Downloads", t: "↑ 12 this week", tc: "tup" },
                    { ico: "🔖", bg: "rgba(217,119,6,.1)", n: "4", l: "Bookmarks", t: "2 new", tc: "tne" },
                    { ico: "💬", bg: "rgba(124,58,237,.1)", n: "3", l: "Queries", t: "1 answered", tc: "tup" },
                    { ico: "🏆", bg: "rgba(5,150,105,.1)", n: "7", l: "Achievements", t: "↑ 2 new", tc: "tup" },
                ].map((s, i) => (
                    <div className="ms" key={i} style={{ animationDelay: `${i * .07}s` }}>
                        <div className="ms-ico" style={{ background: s.bg }}>{s.ico}</div>
                        <div className="ms-n">{s.n}</div><div className="ms-l">{s.l}</div>
                        <div className={`ms-t ${s.tc}`}>{s.t}</div>
                    </div>
                ))}
            </div>

            <div className="g2" style={{ marginBottom: 22 }}>
                {/* Exams */}
                <div>
                    <div className="sec-row"><div className="sec-rt">📅 Upcoming Exams</div><button className="btn-ghost" onClick={() => setPage("exams")}>View all →</button></div>
                    {EXAMS.map((e, i) => (
                        <div className="ec" key={i} style={{ borderLeftColor: e.bc }}>
                            <div className="ec-box" style={{ background: e.bc }}><div className="ec-day">{e.day}</div><div className="ec-mon">{e.mon}</div></div>
                            <div style={{ flex: 1 }}>
                                <div className="ec-subj">{e.subj}</div>
                                <div className="ec-time">🕙 {e.time}</div>
                            </div>
                            <div style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 100, background: `${e.bc}18`, color: e.bc }}>{e.left}</div>
                        </div>
                    ))}
                </div>
                {/* Assignments */}
                <div>
                    <div className="sec-row"><div className="sec-rt">📝 Assignments</div><button className="btn-ghost" onClick={() => setPage("assignments")}>View all →</button></div>
                    <div className="card cp">
                        {ASGN.map((a, i) => (
                            <div className="ar2" key={i}>
                                <div className={`chk${a.done ? " done" : ""}`}>{a.done ? "✓" : ""}</div>
                                <div style={{ flex: 1 }}>
                                    <div className={`ar2-name${a.done ? " done" : ""}`}>{a.name}</div>
                                    <div className="ar2-sub">{a.sub}</div>
                                </div>
                                <div className="ar2-due" style={{ color: a.done ? "var(--emerald)" : a.dc }}>{a.done ? "✅ Done" : a.due}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recommendations preview */}
            <div className="sec-row"><div className="sec-rt">💡 Recommended for You</div><button className="btn-ghost" onClick={() => setPage("rec")}>See all →</button></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
                {RECS.map((r, i) => (
                    <div className="rc" key={i}>
                        <div className="rc-hdr" style={{ background: r.bg }}>{r.emoji}</div>
                        <div className="rc-body">
                            <div className="rc-title">{r.title}</div>
                            <div className="rc-sub">{r.sub}</div>
                        </div>
                        <div className="rc-foot">
                            <span className="tag" style={{ background: r.tc, color: r.tt }}>{r.tag}</span>
                            <span style={{ color: "var(--blue)", fontSize: 16 }}>→</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function StuActivity() {
    const [filter, setFilter] = useState("All");
    const tags = ["All", "Download", "Submitted", "Bookmarked", "Query", "Viewed", "Achievement"];
    const shown = filter === "All" ? TIMELINE : TIMELINE.filter(t => t.tag === filter);
    return (
        <div className="fi">
            <div className="g4" style={{ marginBottom: 22 }}>
                {[{ ico: "📥", bg: "rgba(37,99,235,.1)", n: 48, l: "Downloads" }, { ico: "✅", bg: "rgba(5,150,105,.1)", n: 5, l: "Submitted" }, { ico: "🔖", bg: "rgba(217,119,6,.1)", n: 4, l: "Bookmarked" }, { ico: "💬", bg: "rgba(124,58,237,.1)", n: 3, l: "Queries" }].map((s, i) => (
                    <div className="ms" key={i}><div className="ms-ico" style={{ background: s.bg }}>{s.ico}</div><div className="ms-n">{s.n}</div><div className="ms-l">{s.l}</div></div>
                ))}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                {tags.map(t => <div key={t} className={`chip${filter === t ? " on" : ""}`} onClick={() => setFilter(t)}>{t}</div>)}
            </div>
            <div className="card cp">
                <div className="ct">📈 Activity Timeline · {filter}</div>
                {shown.map((a, i) => (
                    <div className="tl-item" key={i}>
                        <div className="tl-dot-col">
                            <div className="tl-ico" style={{ background: a.bg }}>{a.ico}</div>
                            {i < shown.length - 1 && <div className="tl-line" />}
                        </div>
                        <div style={{ flex: 1, paddingBottom: 12 }}>
                            <div className="tl-title">{a.title}</div>
                            <div className="tl-sub">{a.sub}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap", marginTop: 5 }}>
                                <span className="tag" style={{ background: a.tc, color: a.tt }}>{a.tag}</span>
                                <span className="tl-time">{a.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function StuSubjects() {
    return (
        <div className="fi g2" style={{ alignItems: "start" }}>
            <div className="card cp">
                <div className="ct">📚 Subject Progress – Semester {STUDENT_DATA.sem}</div>
                {SUBJECTS.map((s, i) => (
                    <div className="sr" key={i}>
                        <span style={{ fontSize: 21 }}>{s.emoji}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</div>
                            <div style={{ fontSize: 10, color: "var(--muted)" }}>{s.code}</div>
                        </div>
                        <div className="sr-bar"><div className="sr-fill" style={{ "--w": `${s.prog}%`, width: `${s.prog}%` }} /></div>
                        <div className="sr-pct">{s.prog}%</div>
                    </div>
                ))}
            </div>
            <div>
                <div className="card cp" style={{ marginBottom: 18 }}>
                    <div className="ct">🕐 Overall Attendance</div>
                    <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                        <AttRing pct={STUDENT_DATA.attendance} color="#2563EB" />
                        <div style={{ flex: 1 }}>
                            {SUBJECTS.map((s, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                    <span style={{ fontSize: 12, color: "var(--muted)", minWidth: 55 }}>{s.code}</span>
                                    <div style={{ flex: 1, height: 5, borderRadius: 100, background: "var(--surface2)", overflow: "hidden" }}>
                                        <div style={{ height: "100%", borderRadius: 100, background: s.att >= 75 ? "var(--emerald)" : "var(--rose)", width: `${s.att}%`, transition: "width 1s ease" }} />
                                    </div>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: s.att >= 75 ? "var(--emerald)" : "var(--rose)", minWidth: 32, textAlign: "right" }}>{s.att}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="card cp" style={{ background: "rgba(225,29,72,.04)", border: "1px solid rgba(225,29,72,.18)" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 20 }}>⚠️</span>
                        <div style={{ fontSize: 13, color: "var(--rose)", fontWeight: 600 }}>
                            CS-304 Computer Networks attendance is <strong>65%</strong>.<br />
                            <span style={{ fontWeight: 400, color: "var(--muted)" }}>Minimum required is 75%. Attend next 4 classes.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function StuMaterials() {
    const [tab, setTab] = useState("Notes");
    const TABS = ["Notes", "E-books", "PYQs", "Tutorials", "Important Topics"];
    const FILES = {
        Notes: [{ ico: "📄", n: "Unit 1 – Introduction to DSA", s: "2.4 MB", d: "Mar 1" }, { ico: "📄", n: "Unit 2 – Arrays & Linked Lists", s: "3.1 MB", d: "Mar 8" }, { ico: "📄", n: "Unit 3 – Trees & Graphs", s: "1.8 MB", d: "Mar 15" }],
        "E-books": [{ ico: "📗", n: "Introduction to Algorithms – CLRS", s: "14.2 MB", d: "Jan 5" }, { ico: "📘", n: "Data Structures using C++ – Sahni", s: "9.7 MB", d: "Jan 10" }],
        PYQs: [{ ico: "📋", n: "End Semester 2024 – DSA", s: "0.8 MB", d: "Dec 20" }, { ico: "📋", n: "Mid Semester 2024 – DSA", s: "0.5 MB", d: "Oct 15" }, { ico: "📋", n: "End Semester 2023 – DSA", s: "0.7 MB", d: "Dec 18" }],
        Tutorials: [{ ico: "🎬", n: "DSA Video Lecture Series – Part 1", s: "320 MB", d: "Feb 1" }, { ico: "🎬", n: "Sorting Algorithms Visualized", s: "180 MB", d: "Feb 10" }],
        "Important Topics": [{ ico: "⭐", n: "Most Expected Questions 2025", s: "0.4 MB", d: "Mar 20" }, { ico: "📊", n: "Chapter-wise Weightage Analysis", s: "1.2 MB", d: "Mar 22" }],
    };
    return (
        <div className="fi">
            <div className="tabs">{TABS.map(t => <button key={t} className={`tab${tab === t ? " on" : ""}`} onClick={() => setTab(t)}>{t} ({FILES[t]?.length || 0})</button>)}</div>
            {(FILES[tab] || []).map((f, i) => (
                <div className="mat-row" key={i}>
                    <div className="mat-icon" style={{ background: "rgba(37,99,235,.1)" }}>{f.ico}</div>
                    <div style={{ flex: 1 }}>
                        <div className="mat-name">{f.n}</div>
                        <div className="mat-meta">{f.s} · Uploaded {f.d}</div>
                    </div>
                    <button className="btn btn-navy btn-sm" style={{ fontSize: 11, padding: "7px 14px" }}>⬇ Download</button>
                    <button className="ico-btn">🔖</button>
                </div>
            ))}
        </div>
    );
}

export function StuAssignments() {
    const [done, setDone] = useState([true, false, false, false]);
    return (
        <div className="fi">
            <div className="g4" style={{ marginBottom: 22 }}>
                {[{ ico: "✅", bg: "rgba(5,150,105,.1)", n: 1, l: "Submitted" }, { ico: "⏳", bg: "rgba(217,119,6,.1)", n: 3, l: "Pending" }, { ico: "📅", bg: "rgba(37,99,235,.1)", n: 2, l: "Due This Week" }, { ico: "🔴", bg: "rgba(225,29,72,.1)", n: 0, l: "Overdue" }].map((s, i) => (
                    <div className="ms" key={i}><div className="ms-ico" style={{ background: s.bg }}>{s.ico}</div><div className="ms-n">{s.n}</div><div className="ms-l">{s.l}</div></div>
                ))}
            </div>
            <div className="card cp">
                <div className="ct">📝 All Assignments</div>
                {ASGN.map((a, i) => (
                    <div className="ar2" key={i}>
                        <div className={`chk${done[i] ? " done" : ""}`} onClick={() => setDone(d => { const n = [...d]; n[i] = !n[i]; return n; })}>{done[i] ? "✓" : ""}</div>
                        <div style={{ flex: 1 }}>
                            <div className={`ar2-name${done[i] ? " done" : ""}`}>{a.name}</div>
                            <div className="ar2-sub">{a.sub}</div>
                        </div>
                        <div className="ar2-due" style={{ color: done[i] ? "var(--emerald)" : a.dc }}>{done[i] ? "✅ Done" : a.due}</div>
                        {!done[i] && <button className="btn btn-navy btn-sm" style={{ fontSize: 11, padding: "6px 13px" }}>Submit</button>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function StuExams() {
    return (
        <div className="fi">
            <div style={{ background: "rgba(225,29,72,.05)", border: "1px solid rgba(225,29,72,.2)", borderRadius: 12, padding: "15px 19px", marginBottom: 22, display: "flex", gap: 11, alignItems: "center" }}>
                <span style={{ fontSize: 22 }}>⏰</span>
                <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--rose)" }}>Mid-Semester Exams Starting in 14 Days</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>April 14–20, 2025 · Prepare well. Focus on PYQs and important topics.</div>
                </div>
            </div>
            {EXAMS.map((e, i) => (
                <div className="ec" key={i} style={{ borderLeftColor: e.bc }}>
                    <div className="ec-box" style={{ background: e.bc }}><div className="ec-day">{e.day}</div><div className="ec-mon">{e.mon}</div></div>
                    <div style={{ flex: 1 }}>
                        <div className="ec-subj">{e.subj}</div>
                        <div className="ec-time">🕙 {e.time}</div>
                        <div style={{ display: "flex", gap: 8, marginTop: 9, flexWrap: "wrap" }}>
                            <button className="btn btn-navy btn-sm" style={{ fontSize: 11, padding: "6px 13px" }}>📄 PYQs</button>
                            <button className="btn btn-out btn-sm" style={{ fontSize: 11, padding: "5px 12px" }}>⭐ Important Topics</button>
                        </div>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 100, background: `${e.bc}18`, color: e.bc, flexShrink: 0 }}>{e.left}</div>
                </div>
            ))}
        </div>
    );
}

export function StuPerf() {
    const data = [{ l: "DSA", v: 82, c: "#059669" }, { l: "DBMS", v: 70, c: "#2563EB" }, { l: "OS", v: 90, c: "#059669" }, { l: "CN", v: 55, c: "#E11D48" }, { l: "SE", v: 75, c: "#2563EB" }, { l: "ML", v: 60, c: "#2563EB" }];
    return (
        <div className="fi">
            <div className="g2" style={{ marginBottom: 22, alignItems: "start" }}>
                <div className="card cp">
                    <div className="ct">📊 Subject-wise Score</div>
                    <div className="pb-wrap">
                        {data.map((p, i) => (
                            <div className="pb-group" key={i}>
                                <div className="pb-val">{p.v}</div>
                                <div className="pb-bar" style={{ height: `${p.v}%`, background: `linear-gradient(180deg,${p.c},${p.c}99)`, animationDelay: `${i * .1}s` }} />
                                <div className="pb-lbl">{p.l}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: 14, marginTop: 14, flexWrap: "wrap" }}>
                        {[["#059669", "≥80 Excellent"], ["#2563EB", "65–79 Good"], ["#E11D48", "<65 Needs Work"]].map(([c, l], i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--muted)" }}>
                                <div style={{ width: 9, height: 9, borderRadius: 2, background: c }} />{l}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card cp">
                    <div className="ct">📈 CGPA Progression</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 110, paddingBottom: 4 }}>
                        {[{ s: 1, c: 7.2 }, { s: 2, c: 7.6 }, { s: 3, c: 7.8 }, { s: 4, c: 8.1 }, { s: 5, c: 8.4 }].map((d, i) => (
                            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)" }}>{d.c}</div>
                                <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: "linear-gradient(180deg,#2563EB,#60A5FA)", height: `${(d.c / 10) * 110}px`, transition: "height 1s ease" }} />
                                <div style={{ fontSize: 10, color: "var(--muted)" }}>S{d.s}</div>
                            </div>
                        ))}
                    </div>
                    <div className="divider" />
                    <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
                        {[["8.4", "Current CGPA"], ["8.6", "Target"], ["9.0", "Best Possible"]].map(([v, l], i) => (
                            <div key={i}>
                                <div style={{ fontWeight: 800, fontSize: 20, color: "var(--navy)" }}>{v}</div>
                                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="cp">
                    <div className="ct">🗂️ Detailed Performance</div>
                    <div className="tbl-wrap">
                        <table>
                            <thead><tr>{["Subject", "Code", "Internal", "External", "Total", "Grade"].map(h => <th key={h}>{h}</th>)}</tr></thead>
                            <tbody>
                                {[["Data Structures & Algorithms", "CS-301", 38, 44, 82, "A"], ["Database Management Systems", "CS-302", 32, 38, 70, "B+"], ["Operating Systems", "CS-303", 42, 48, 90, "A+"], ["Computer Networks", "CS-304", 24, 31, 55, "C"], ["Software Engineering", "CS-305", 35, 40, 75, "B+"], ["Machine Learning", "CS-306", 28, 32, 60, "B"]].map(([n, c, int, ext, tot, g], i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600 }}>{n}</td>
                                        <td><span style={{ background: "rgba(37,99,235,.1)", color: "var(--blue)", padding: "2px 8px", borderRadius: 100, fontSize: 11, fontWeight: 700 }}>{c}</span></td>
                                        <td>{int}/50</td><td>{ext}/50</td>
                                        <td style={{ fontWeight: 800, color: tot >= 80 ? "var(--emerald)" : tot >= 65 ? "var(--blue)" : "var(--rose)" }}>{tot}</td>
                                        <td><span style={{ background: tot >= 80 ? "rgba(5,150,105,.12)" : tot >= 65 ? "rgba(37,99,235,.12)" : "rgba(225,29,72,.12)", color: tot >= 80 ? "var(--emerald)" : tot >= 65 ? "var(--blue)" : "var(--rose)", padding: "2px 9px", borderRadius: 100, fontSize: 11, fontWeight: 700 }}>{g}</span></td>
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

export function StuRec() {
    return (
        <div className="fi">
            <div style={{ background: "rgba(37,99,235,.06)", border: "1px solid rgba(37,99,235,.14)", borderRadius: 12, padding: "17px 20px", marginBottom: 22, display: "flex", gap: 13, alignItems: "flex-start" }}>
                <span style={{ fontSize: 26 }}>🤖</span>
                <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--navy)", marginBottom: 3 }}>AI-Powered Recommendations</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>Based on your activity, attendance, quiz scores and upcoming exam schedule — personalized suggestions to help you perform better.</div>
                </div>
            </div>
            <div className="g2" style={{ marginBottom: 22 }}>
                {RECS.map((r, i) => (
                    <div className="card" key={i} style={{ overflow: "hidden", cursor: "pointer" }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "var(--sh-lg)" }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--sh)" }}>
                        <div style={{ background: r.bg, padding: "22px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                            <div style={{ fontSize: 38 }}>{r.emoji}</div>
                            <div>
                                <span className="tag" style={{ background: r.tc, color: r.tt, marginBottom: 7, display: "inline-block" }}>{r.tag}</span>
                                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--navy)", marginBottom: 5, lineHeight: 1.3 }}>{r.title}</div>
                                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>{r.sub}</div>
                            </div>
                        </div>
                        <div style={{ padding: "12px 18px", display: "flex", gap: 9, borderTop: "1px solid var(--border)" }}>
                            <button className="btn btn-navy btn-sm" style={{ fontSize: 11, padding: "7px 14px" }}>📂 Access Material</button>
                            <button className="btn btn-out btn-sm" style={{ fontSize: 11, padding: "6px 12px" }}>Later</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ background: "rgba(5,150,105,.05)", border: "1px solid rgba(5,150,105,.18)", borderRadius: 12, padding: "19px 22px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--emerald)", marginBottom: 12 }}>📅 Recommended Study Plan – This Week</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 11 }}>
                    {[["Mon", "DSA – Trees & Graphs"], ["Tue", "DBMS – PYQ Practice"], ["Wed", "OS – Revision"], ["Thu", "CN – Video Lectures"], ["Fri", "SE – Assignments"], ["Sat", "Full Mock Review"]].map(([d, t], i) => (
                        <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 9, padding: "11px 13px", boxShadow: "var(--sh)" }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--emerald)", marginBottom: 4, textTransform: "uppercase" }}>{d}</div>
                            <div style={{ fontSize: 12, color: "var(--navy)", lineHeight: 1.4 }}>{t}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function StuProfile() {
    return (
        <div className="fi g2" style={{ alignItems: "start" }}>
            <div>
                <div className="card cp" style={{ marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
                        <div style={{ width: 68, height: 68, borderRadius: 14, background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#fff", flexShrink: 0 }}>AS</div>
                        <div>
                            <div style={{ fontFamily: "Lora,serif", fontWeight: 700, fontSize: 19, color: "var(--navy)" }}>{STUDENT_DATA.name}</div>
                            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{STUDENT_DATA.roll}</div>
                            <div style={{ display: "flex", gap: 7, marginTop: 8, flexWrap: "wrap" }}>
                                {[["rgba(37,99,235,.1)", "var(--blue)", "CSE Sem-5"], ["rgba(5,150,105,.1)", "var(--emerald)", "CGPA 8.4"]].map(([bg, c, l], i) => (
                                    <span key={i} style={{ background: bg, color: c, padding: "3px 9px", borderRadius: 100, fontSize: 11, fontWeight: 700 }}>{l}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="divider" />
                    <div className="ct">Personal Information</div>
                    {[["📧 Email", STUDENT_DATA.email || "aditya.sharma@sageuniversity.edu.in"], ["🏫 School", STUDENT_DATA.school], ["🎓 Branch", STUDENT_DATA.branch], ["📍 Section", "Section A"], ["📱 Phone", "+91 98765 43210"]].map(([l, v], i) => (
                        <div key={i} style={{ display: "flex", gap: 13, padding: "10px 0", borderBottom: "1px solid var(--border)", fontSize: 12 }}>
                            <span style={{ color: "var(--muted)", minWidth: 100 }}>{l}</span>
                            <span style={{ color: "var(--navy)", fontWeight: 500, flex: 1 }}>{v}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className="card cp" style={{ marginBottom: 18 }}>
                    <div className="ct">🏆 Achievements</div>
                    {[{ ico: "🥇", t: "Top 10% in DBMS Quiz", s: "February 2025", c: "var(--gold)" }, { ico: "📚", t: "50+ Materials Downloaded", s: "This semester", c: "var(--blue)" }, { ico: "✅", t: "5 Assignments Submitted on Time", s: "Semester 5", c: "var(--emerald)" }, { ico: "🔥", t: "7-Day Streak on Portal", s: "Feb 22 – Mar 1", c: "var(--rose)" }].map((a, i) => (
                        <div key={i} style={{ display: "flex", gap: 11, padding: "11px 0", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
                            <div style={{ width: 36, height: 36, borderRadius: 9, background: `${a.c}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{a.ico}</div>
                            <div><div style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>{a.t}</div><div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{a.s}</div></div>
                        </div>
                    ))}
                </div>
                <div className="card cp">
                    <div className="ct">📊 Portal Stats</div>
                    {[["📂 Total Downloads", "48 Files"], ["💬 Queries Raised", "3"], ["⭐ Faculty Rating Received", "4.8/5"], ["🗓️ Joined", "August 2022"]].map(([l, v], i) => (
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
