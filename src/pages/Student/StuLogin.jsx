import React, { useState } from 'react';

export function StuLogin({ setView }) {
    const [f, setF] = useState({ email: "", roll: "", pass: "" });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const go = () => {
        if (!f.email || !f.pass) { setErr("Please fill in all required fields."); return; }
        setErr(""); setLoading(true);
        setTimeout(() => { setLoading(false); setView("stu-dash"); }, 1600);
    };
    const demo = () => setF({ email: "aditya.sharma@sageuniversity.edu.in", roll: "SAGE/CS/2022/0847", pass: "sage@2025" });

    return (
        <div className="login-scene">
            {/* LEFT */}
            <div className="login-left">
                <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", background: "#D97706", filter: "blur(90px)", opacity: .07, top: -110, right: -80, animation: "float 10s ease-in-out infinite" }} />
                <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "#2563EB", filter: "blur(90px)", opacity: .1, bottom: -70, left: -60, animation: "float 12s ease-in-out infinite reverse" }} />
                <div style={{ position: "relative", zIndex: 1, maxWidth: 420 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 46 }}>
                        <div style={{ width: 46, height: 46, borderRadius: 11, background: "linear-gradient(135deg,#2563EB,#D97706)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Lora,serif", fontWeight: 700, color: "#fff", fontSize: 20, boxShadow: "0 6px 22px rgba(37,99,235,.4)" }}>S</div>
                        <div>
                            <div style={{ fontFamily: "Lora,serif", fontWeight: 700, color: "#fff", fontSize: 17, lineHeight: 1.2 }}>SAGE University</div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>Academic Portal · Bhopal</div>
                        </div>
                    </div>
                    <div style={{ fontFamily: "Lora,serif", fontStyle: "italic", fontSize: 36, fontWeight: 500, color: "#fff", lineHeight: 1.2, marginBottom: 18 }}>
                        Your academic<br />journey,<br /><span style={{ color: "#93C5FD" }}>simplified.</span>
                    </div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,.52)", lineHeight: 1.8, marginBottom: 44 }}>
                        Access semester-wise materials, track your progress, manage assignments, and stay ahead of exams.
                    </div>
                    {[["📚", "Semester-wise Materials"], ["📊", "Live Progress Tracking"], ["🏆", "Performance Analytics"], ["🔔", "Smart Notifications"]].map(([ic, tx], i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 13, animation: `slideL .5s ${i * .1}s ease both` }}>
                            <div style={{ width: 33, height: 33, borderRadius: 8, background: "rgba(255,255,255,.09)", border: "1px solid rgba(255,255,255,.13)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{ic}</div>
                            <span style={{ fontSize: 13, color: "rgba(255,255,255,.68)", fontWeight: 500 }}>{tx}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT */}
            <div className="login-right">
                <div className="login-wrap si">
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 10, background: "linear-gradient(135deg,#1A3270,#2563EB)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Lora,serif", fontWeight: 700, color: "#fff", fontSize: 18 }}>S</div>
                        <div><div style={{ fontWeight: 800, fontSize: 14, color: "var(--navy)" }}>SAGE University</div><div style={{ fontSize: 11, color: "var(--muted)" }}>Student Portal</div></div>
                    </div>
                    <div style={{ fontFamily: "Lora,serif", fontWeight: 700, fontSize: 26, color: "var(--navy)", marginBottom: 5 }}>Welcome back 👋</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 28, lineHeight: 1.6 }}>Sign in to access your study materials, track progress and more.</div>

                    {err && <div style={{ background: "rgba(225,29,72,.07)", border: "1px solid rgba(225,29,72,.25)", borderRadius: 8, padding: "10px 13px", fontSize: 12, color: "#E11D48", marginBottom: 14, fontWeight: 600 }}>⚠️ {err}</div>}

                    {[
                        { label: "University Email", ico: "📧", type: "email", ph: "you@sageuniversity.edu.in", key: "email" },
                        { label: "Roll Number / Enrollment ID", ico: "🎓", type: "text", ph: "SAGE/CS/2022/0847", key: "roll" },
                        { label: "Password", ico: "🔒", type: "password", ph: "Enter your password", key: "pass" },
                    ].map(({ label, ico, type, ph, key }) => (
                        <div className="fld" key={key}>
                            <label className="fld-label">{label}</label>
                            <div className="fld-wrap">
                                <span className="fld-ico">{ico}</span>
                                <input className="fld-input" type={type} placeholder={ph} value={f[key]} onChange={e => setF({ ...f, [key]: e.target.value })} />
                            </div>
                        </div>
                    ))}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, fontSize: 13 }}>
                        <label style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted)", cursor: "pointer" }}>
                            <input type="checkbox" style={{ accentColor: "var(--blue)" }} /> Remember me
                        </label>
                        <span style={{ color: "var(--blue)", fontWeight: 600, cursor: "pointer" }}>Forgot password?</span>
                    </div>

                    <button className="btn btn-navy" style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: 15 }} onClick={go} disabled={loading}>
                        {loading ? <><span style={{ animation: "spin .7s linear infinite", display: "inline-block", marginRight: 7 }}>⟳</span>Signing in…</> : "Sign In to Portal →"}
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0", fontSize: 12, color: "var(--muted2)" }}>
                        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />or try demo<div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                    </div>

                    <div style={{ background: "rgba(37,99,235,.05)", border: "1px solid rgba(37,99,235,.14)", borderRadius: 9, padding: "13px 15px", fontSize: 12, color: "var(--muted)" }}>
                        <strong style={{ color: "var(--blue)" }}>Demo Account</strong><br />
                        Email: aditya.sharma@sageuniversity.edu.in<br />
                        Roll: SAGE/CS/2022/0847 &nbsp;·&nbsp; Password: sage@2025<br />
                        <button style={{ marginTop: 9, background: "transparent", border: "1px solid rgba(37,99,235,.3)", borderRadius: 6, padding: "5px 12px", fontSize: 11, color: "var(--blue)", cursor: "pointer", fontFamily: "Sora,sans-serif", fontWeight: 700 }} onClick={demo}>Auto-fill Demo →</button>
                    </div>

                    <div style={{ marginTop: 20, textAlign: "center", fontSize: 12, color: "var(--muted)" }}>
                        Are you faculty? <span style={{ color: "var(--blue)", fontWeight: 700, cursor: "pointer" }} onClick={() => setView("fac-login")}>Faculty Login →</span>
                        &nbsp;·&nbsp; <span style={{ color: "var(--blue)", fontWeight: 700, cursor: "pointer" }} onClick={() => setView("home")}>Back to Home</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
