import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function FacLogin() {
    const [f, setF] = useState({ username: "", pass: "" });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const go = async () => {
        if (!f.username || !f.pass) { setErr("Please fill in all required fields."); return; }
        setErr(""); setLoading(true);
        const result = await loginUser(f.username, f.pass);
        setLoading(false);
        if (!result.success) {
            setErr("Invalid credentials. Please check your username and password.");
        }
        // On success, AuthContext.loginUser() auto-navigates to /faculty-dashboard
    };

    const demo = async () => {
        setF({ username: "r_mishra", pass: "faculty@2025" });
    };

    const handleKeyDown = (e) => { if (e.key === 'Enter') go(); };

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg,#05112A,#0B1D4E,#162E72)", padding: 24 }}>
            <div style={{ background: "rgba(255,255,255,.96)", borderRadius: 20, padding: 46, width: "100%", maxWidth: 420, boxShadow: "0 40px 100px rgba(0,0,0,.45)", animation: "scaleIn .5s ease both" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 28 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg,#1A3270,#D97706)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Lora,serif", fontWeight: 700, color: "#fff", fontSize: 19 }}>S</div>
                    <div><div style={{ fontWeight: 800, fontSize: 15, color: "var(--navy)" }}>SAGE University</div><div style={{ fontSize: 11, color: "var(--muted)" }}>Faculty Portal · Bhopal</div></div>
                </div>
                <div style={{ fontFamily: "Lora,serif", fontWeight: 700, fontSize: 25, color: "var(--navy)", marginBottom: 5 }}>Faculty Login</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 26, lineHeight: 1.6 }}>Access your faculty dashboard to manage materials and student queries.</div>

                {err && <div style={{ background: "rgba(225,29,72,.07)", border: "1px solid rgba(225,29,72,.25)", borderRadius: 8, padding: "10px 13px", fontSize: 12, color: "#E11D48", marginBottom: 14, fontWeight: 600 }}>⚠️ {err}</div>}

                {[
                    { label: "Username", ico: "👤", type: "text", ph: "Enter your username", k: "username" },
                    { label: "Password", ico: "🔒", type: "password", ph: "Enter your password", k: "pass" }
                ].map(({ label, ico, type, ph, k }) => (
                    <div className="fld" key={k}>
                        <label className="fld-label">{label}</label>
                        <div className="fld-wrap">
                            <span className="fld-ico">{ico}</span>
                            <input className="fld-input" type={type} placeholder={ph} value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })} onKeyDown={handleKeyDown} />
                        </div>
                    </div>
                ))}

                <button className="btn btn-navy" style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: 15, marginTop: 6, background: "linear-gradient(135deg,#1A3270,#D97706)" }} onClick={go} disabled={loading}>
                    {loading ? <><span style={{ animation: "spin .7s linear infinite", display: "inline-block", marginRight: 7 }}>⟳</span>Verifying…</> : "🔐 Login to Dashboard →"}
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0", fontSize: 12, color: "var(--muted2)" }}>
                    <div style={{ flex: 1, height: 1, background: "var(--border)" }} />Quick Login<div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                </div>

                <button style={{ width: "100%", background: "transparent", border: "1px solid var(--border)", borderRadius: 9, padding: "9px", fontSize: 12, color: "var(--blue)", cursor: "pointer", fontFamily: "Sora,sans-serif", fontWeight: 700 }} onClick={demo}>
                    Auto-fill Demo Credentials →
                </button>

                <div style={{ marginTop: 14, background: "rgba(37,99,235,.05)", border: "1px solid rgba(37,99,235,.13)", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "var(--muted)" }}>
                    <strong style={{ color: "var(--blue)" }}>Demo:</strong> username: <code>r_mishra</code> · password: <code>faculty@2025</code>
                </div>

                <div style={{ marginTop: 18, textAlign: "center", fontSize: 12, color: "var(--muted)" }}>
                    <span style={{ color: "var(--blue)", fontWeight: 600, cursor: "pointer" }}>Forgot Password?</span>
                    {" · "}
                    <span style={{ color: "var(--blue)", fontWeight: 600, cursor: "pointer" }} onClick={() => navigate("/")}>Back to Home</span>
                </div>
                <div style={{ marginTop: 14, background: "rgba(37,99,235,.05)", border: "1px solid rgba(37,99,235,.13)", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "var(--muted)" }}>
                    🔒 Secured portal. Unauthorized access is strictly prohibited.
                </div>
            </div>
        </div>
    );
}
