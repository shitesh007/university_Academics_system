import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SCHOOLS, FEATURES } from '../data/mockData';

export function Home() {
    const navigate = useNavigate();
    return (
        <div className="fi">
            {/* HERO */}
            <section className="hero">
                <div className="hero-orb" style={{ width: 440, height: 440, background: "#D97706", opacity: .07, top: -130, right: -80, animation: "float 10s ease-in-out infinite" }} />
                <div className="hero-orb" style={{ width: 320, height: 320, background: "#2563EB", opacity: .09, bottom: -90, left: -70, animation: "float 12s ease-in-out infinite reverse" }} />
                <div className="hero-orb" style={{ width: 200, height: 200, background: "#7C3AED", opacity: .07, top: "40%", left: "32%" }} />
                <div className="hero-grid" />
                <div className="hero-content">
                    <div className="hero-badge fu" style={{ animationDelay: "0s" }}>Academic Year 2024–25 · Now Live</div>
                    <h1 className="hero-title fu" style={{ animationDelay: ".08s" }}>
                        SAGE University<br /><span>Bhopal</span> Academic<br />Portal
                    </h1>
                    <p className="hero-sub fu" style={{ animationDelay: ".16s" }}>
                        All your semester study materials, PYQs, faculty notes, and academic resources — centralized in one place.
                    </p>
                    <div className="hero-cta fu" style={{ animationDelay: ".24s" }}>
                        <button className="btn btn-gold" style={{ padding: "13px 30px", fontSize: 15 }} onClick={() => navigate("/student-login")}>📚 Browse as Student</button>
                        <button className="btn btn-out" style={{ color: "#fff", borderColor: "rgba(255,255,255,.35)", padding: "13px 28px", fontSize: 15 }} onClick={() => navigate("/faculty-login")}>👨‍🏫 Faculty Login</button>
                    </div>
                    <div className="hero-stats fu" style={{ animationDelay: ".32s" }}>
                        {[["8,000+", "Students"], ["200+", "Materials"], ["45+", "Faculty"], ["8", "Schools"]].map(([n, l], i) => (
                            <div key={i}><div className="hs-num">{n}</div><div className="hs-lbl">{l}</div></div>
                        ))}
                    </div>
                </div>

                {/* floating quick-access card */}
                <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", width: 340, display: "none" }} className="hero-qcard">
                    <div style={{ background: "rgba(255,255,255,.09)", border: "1px solid rgba(255,255,255,.18)", backdropFilter: "blur(18px)", borderRadius: 16, padding: 22, animation: "float 7s ease-in-out infinite" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.55)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 14 }}>Quick Access</div>
                        {SCHOOLS.slice(0, 3).map((s, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,.1)" : "none", cursor: "pointer" }}>
                                <span style={{ fontSize: 21 }}>{s.emoji}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                                    <div style={{ color: "rgba(255,255,255,.42)", fontSize: 11 }}>{s.cnt}</div>
                                </div>
                                <span style={{ color: "rgba(255,255,255,.35)" }}>›</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="sec" style={{ background: "var(--white)" }}>
                <div className="sec-head-c">
                    <div className="sec-tag">Why Choose Us</div>
                    <h2 className="sec-title">Everything You Need to Succeed</h2>
                    <p className="sec-desc">A comprehensive academic platform designed for SAGE University students and faculty.</p>
                </div>
                <div className="feat-grid">
                    {FEATURES.map((f, i) => (
                        <div className="feat-card" key={i}>
                            <div className="feat-icon" style={{ background: f.bg }}>{f.ico}</div>
                            <div className="feat-title">{f.title}</div>
                            <div className="feat-desc">{f.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SCHOOLS */}
            <section className="schools-wrap">
                <div className="sec-head-c" style={{ marginBottom: 44 }}>
                    <div className="sec-tag" style={{ background: "rgba(217,119,6,.2)", color: "#FDE68A" }}>Browse by School</div>
                    <h2 className="sec-title" style={{ color: "#fff" }}>Choose Your School</h2>
                    <p className="sec-desc" style={{ color: "rgba(255,255,255,.55)" }}>Select your school to explore courses, subjects, and academic materials.</p>
                </div>
                <div className="schools-grid">
                    {SCHOOLS.map((s, i) => (
                        <div className="school-card" key={i} onClick={() => navigate("/student-login")}>
                            <span className="sc-emoji">{s.emoji}</span>
                            <div className="sc-name">{s.name}</div>
                            <div className="sc-cnt">{s.cnt}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="sec">
                <div className="ann">
                    <span className="ann-ico">📢</span>
                    <div className="ann-txt"><strong>Notice:</strong> Mid-semester exams are scheduled from <strong>April 14–20, 2025</strong>. Download timetable from the student portal.</div>
                    <button className="btn btn-navy btn-sm">Download →</button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="footer-grid">
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 11 }}>
                            <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg,#2563EB,#D97706)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Lora,serif", fontWeight: 700, color: "#fff", fontSize: 14 }}>S</div>
                            <div style={{ fontFamily: "Lora,serif", fontWeight: 700, color: "#fff", fontSize: 15 }}>SAGE University</div>
                        </div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,.42)", lineHeight: 1.7 }}>Bhopal's premier academic portal — empowering students and faculty with quality learning resources.</div>
                    </div>
                    {[["Quick Links", ["Browse Materials", "Student Login", "Faculty Login", "Announcements"]],
                    ["Resources", ["Previous Year Papers", "E-books Library", "Video Tutorials", "Important Topics"]],
                    ["Support", ["Help Center", "Contact Us", "University Website", "portal@sageuniversity.edu.in"]]
                    ].map(([title, links], i) => (
                        <div key={i}>
                            <div className="f-title">{title}</div>
                            {links.map((l, j) => <button key={j} className="f-link" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit" }}>{l}</button>)}
                        </div>
                    ))}
                </div>
                <div className="f-bottom">
                    <div className="f-copy">© 2025 SAGE University Bhopal. All rights reserved.</div>
                    <div className="f-copy">Built with 💙 for SAGE Community</div>
                </div>
            </footer>
        </div>
    );
}
