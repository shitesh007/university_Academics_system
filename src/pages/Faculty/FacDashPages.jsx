import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

export function FacOverview({ setPage, user }) {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([api.getMaterials(), api.getSubjects()])
            .then(([mats, subs]) => {
                const semCounts = {};
                mats.forEach(m => {
                    const sub = subs.find(s => s.code === m.subject_code);
                    const sem = sub ? sub.semester : "Unknown";
                    const label = `Semester ${sem}`;
                    semCounts[label] = (semCounts[label] || 0) + 1;
                });
                setStats(semCounts);
                setLoading(false);
            }).catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="fi">
            <div style={{ fontFamily: "Lora,serif", fontWeight: 700, fontSize: 22, color: "var(--navy)", marginBottom: 3 }}>
                Welcome back, {user?.name || "Professor"}! 👋
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 18 }}>
                Here is your academic portal activity summary.
            </div>

            <div className="g4" style={{ marginBottom: 22 }}>
                {[
                    { ico: "📁", bg: "rgba(37,99,235,.1)", n: "Materials", l: "Manage Uploads", action: () => setPage('upload') },
                    { ico: "📚", bg: "rgba(5,150,105,.1)", n: "Subjects", l: "View Assigned Subjects", action: () => setPage('subjects') },
                    { ico: "👤", bg: "rgba(124,58,237,.1)", n: "Profile", l: "View Personal Info", action: () => setPage('profile') }
                ].map((s, i) => (
                    <div className="ms" key={i} style={{ cursor: 'pointer' }} onClick={s.action}>
                        <div className="ms-ico" style={{ background: s.bg }}>{s.ico}</div>
                        <div className="ms-n">{s.n}</div>
                        <div className="ms-l">{s.l}</div>
                        <div className="ms-t tup" style={{ marginTop: 8 }}>Click to view →</div>
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", gap: 20, alignItems: "start", flexWrap: "wrap" }}>
                <div className="card cp" style={{ flex: 1, minWidth: 300 }}>
                    <div className="ct">📈 Upload Activity</div>
                    {loading ? <div style={{ padding: 20, color: "var(--muted)" }}>Loading metrics...</div> : (
                        Object.keys(stats).length === 0 ? (
                            <div style={{ padding: 20, color: "var(--muted)" }}>No uploads found. Start uploading materials to see your activity.</div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {Object.keys(stats).sort().map(sem => (
                                    <div key={sem} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "rgba(37,99,235,.04)", borderRadius: 8, border: "1px solid rgba(37,99,235,.1)" }}>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>{sem}</div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--blue)", background: "#fff", padding: "4px 12px", borderRadius: 20, boxShadow: "0 2px 5px rgba(0,0,0,.05)" }}>
                                            {stats[sem]} Materials
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>

                <div className="card cp" style={{ flex: 1, minWidth: 300 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontSize: 24 }}>🎓</span>
                        <div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>{user?.school_name || "Assigned Department"}</div>
                            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>You are currently viewing data isolated to your specific school constraints.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function FacUpload({ user }) {
    const [materials, setMaterials] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form state
    const [semester, setSemester] = useState(1);
    const [subjectId, setSubjectId] = useState("");
    const [category, setCategory] = useState("notes");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const fetchDashboardData = async () => {
        try {
            const [mats, subs] = await Promise.all([
                api.getMaterials(),
                api.getSubjects() // We'll filter this below
            ]);
            setMaterials(mats);
            setSubjects(subs);
        } catch (err) {
            console.error("Failed to fetch dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Derived filtered subjects for the dropdown
    const availableSubjects = subjects.filter(s => parseInt(s.semester) === parseInt(semester));

    // Auto-select first available subject when semester changes
    useEffect(() => {
        if (availableSubjects.length > 0 && !availableSubjects.find(s => s.id === parseInt(subjectId))) {
            setSubjectId(availableSubjects[0].id);
        } else if (availableSubjects.length === 0) {
            setSubjectId("");
        }
    }, [semester, availableSubjects]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!subjectId) return toast.error("Please select a subject.");
        if (!file) return toast.error("Please explicitly select a file to upload.");

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("subject", subjectId);
            formData.append("title", title);
            formData.append("category", category);
            formData.append("description", "Uploaded via Faculty Dashboard");
            formData.append("file", file);

            await api.uploadFileMaterial(formData);
            toast.success("Material uploaded successfully!");
            setTitle("");
            setFile(null);
            fetchDashboardData();
        } catch (err) {
            console.error("Upload Error:", err.response?.data);
            const msg = err.response?.data ? JSON.stringify(err.response.data) : "Upload failed.";
            toast.error(msg);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this material?")) return;
        try {
            await api.deleteMaterial(id);
            toast.success("Deleted successfully!");
            fetchDashboardData();
        } catch (err) {
            toast.error("Deletion failed.");
        }
    };

    if (loading) return <div className="fi" style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;

    const catMap = { 'notes': 'Notes', 'pyq': 'PYQs', 'important': 'Important Topics', 'tutorial': 'Tutorials', 'ebook': 'E-book', 'video': 'Video', 'topic': 'Topic' };

    return (
        <div className="fi g2" style={{ alignItems: "start" }}>
            <div className="card cp" style={{ position: "sticky", top: 20, border: "1px solid rgba(37,99,235,.2)", boxShadow: "0 10px 30px rgba(37,99,235,.05)" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12, marginBottom: 20, display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(37,99,235,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📤</div>
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)" }}>Upload Study Material</div>
                        <div style={{ fontSize: 12, color: "var(--muted)" }}>Securely share resources restricted to your department.</div>
                    </div>
                </div>
                <form onSubmit={handleUpload}>
                    <div style={{ background: "rgba(37,99,235,.03)", border: "1px solid rgba(37,99,235,.1)", padding: 12, borderRadius: 8, marginBottom: 18 }}>
                        <label className="lbl" style={{ color: "var(--blue)" }}>🏫 Target Department (Locked)</label>
                        <input className="inp" value={user?.school_name || "Loading..."} readOnly style={{ background: "transparent", border: "none", padding: 0, fontWeight: 600, color: "var(--navy)", fontSize: 14, boxShadow: "none" }} />
                    </div>

                    <div style={{ display: "flex", gap: 15, marginBottom: 15 }}>
                        <div style={{ flex: 1 }}>
                            <label className="lbl">Semester</label>
                            <select className="inp" value={semester} onChange={e => setSemester(e.target.value)} required style={{ background: "var(--surface)" }}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                            </select>
                        </div>
                        <div style={{ flex: 2 }}>
                            <label className="lbl">Subject</label>
                            <select className="inp" value={subjectId} onChange={e => setSubjectId(e.target.value)} required disabled={availableSubjects.length === 0} style={{ background: "var(--surface)" }}>
                                {availableSubjects.length === 0 ? <option value="">No subjects found</option> : availableSubjects.map(s => (
                                    <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 15, marginBottom: 15 }}>
                        <div style={{ flex: 1 }}>
                            <label className="lbl">Category</label>
                            <select className="inp" value={category} onChange={e => setCategory(e.target.value)} required style={{ background: "var(--surface)" }}>
                                <option value="notes">Notes & Slides</option>
                                <option value="pyq">Previous Year Papers</option>
                                <option value="important">Important Topics</option>
                                <option value="tutorial">Tutorials & Videos</option>
                                <option value="ebook">Reference E-Book</option>
                            </select>
                        </div>
                        <div style={{ flex: 2 }}>
                            <label className="lbl">Document Title</label>
                            <input className="inp" placeholder="e.g. Unit 3 - Tree Traversal" value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>
                    </div>

                    <div style={{ marginBottom: 24, padding: 16, border: "2px dashed var(--border)", borderRadius: 10, background: "var(--surface)", transition: "all .3s ease" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "var(--blue)"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>

                        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                            <span style={{ fontSize: 20 }}>🔗</span>
                            <div>
                                <label className="lbl" style={{ margin: 0, color: "var(--navy)", fontSize: 13, fontWeight: 600 }}>Upload Document</label>
                                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>Select a PDF or Document from your computer.</div>
                            </div>
                        </div>
                        <input className="inp" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" onChange={e => setFile(e.target.files[0])} required style={{ background: "#fff", borderColor: "rgba(37,99,235,.2)", padding: "8px" }} />
                    </div>

                    <button type="submit" className="btn btn-navy" style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: 14, background: "linear-gradient(135deg,#1A3270,#2563EB)", boxShadow: "0 8px 20px rgba(37,99,235,.25)", border: "none" }} disabled={isUploading || !subjectId}>
                        {isUploading ? <><span style={{ animation: "spin .7s linear infinite", display: "inline-block", marginRight: 7 }}>⟳</span>Uploading Resource...</> : "🚀 Publish Material"}
                    </button>
                </form>
            </div>

            <div className="card cp">
                <div className="ct">📂 My Uploaded Materials</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {materials.map(m => (
                        <div key={m.id} style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "8px", display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ fontSize: 24 }}>{m.category === 'pyq' ? '📄' : (m.category === 'ebook' ? '📗' : (m.category === 'tutorial' ? '▶️' : (m.category === 'important' ? '⭐' : '📓')))}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>{m.title}</div>
                                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>
                                    {m.subject_code} · {catMap[m.category] || m.category} · {new Date(m.upload_date).toLocaleDateString()}
                                </div>
                            </div>
                            <button className="btn btn-out btn-sm" style={{ padding: "5px 10px", borderColor: "var(--rose)", color: "var(--rose)" }} onClick={() => handleDelete(m.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                    {materials.length === 0 && (
                        <div style={{ padding: 30, textAlign: 'center', color: 'var(--muted)' }}>No materials uploaded yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function FacSubjects({ user }) {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        api.getSubjects().then(res => setSubjects(res)).catch(err => console.error(err));
    }, []);

    return (
        <div className="fi">
            <div className="card cp">
                <div className="ct">📚 Assigned Academic Subjects</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
                    {subjects.map(s => (
                        <div key={s.id} style={{ border: "1px solid var(--border)", padding: "16px", borderRadius: "10px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)", paddingRight: 10 }}>{s.name}</div>
                                <div style={{ background: "rgba(37,99,235,.1)", color: "var(--blue)", padding: "3px 8px", borderRadius: "6px", fontSize: 11, fontWeight: 700 }}>
                                    {s.code}
                                </div>
                            </div>
                            <div style={{ fontSize: 12, color: "var(--muted)" }}>Semester {s.semester}</div>
                        </div>
                    ))}
                    {subjects.length === 0 && <div style={{ padding: 10, color: "var(--muted)" }}>No subjects currently assigned.</div>}
                </div>
            </div>
        </div>
    );
}

export function FacProfile({ user }) {
    return (
        <div className="fi g2" style={{ alignItems: "start" }}>
            <div className="card cp" style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
                    <div style={{ width: 68, height: 68, borderRadius: 14, background: "linear-gradient(135deg,#1A3270,#D97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                        {user?.name ? user.name.charAt(0).toUpperCase() : "F"}
                    </div>
                    <div>
                        <div style={{ fontFamily: "Lora,serif", fontWeight: 700, fontSize: 19, color: "var(--navy)" }}>{user?.name || "Faculty Profile"}</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>Username: {user?.username}</div>
                        <div style={{ display: "flex", gap: 7, marginTop: 8, flexWrap: "wrap" }}>
                            <span style={{ background: "rgba(217,119,6,.1)", color: "var(--gold-lt)", padding: "3px 9px", borderRadius: 100, fontSize: 11, fontWeight: 700 }}>
                                Faculty Account
                            </span>
                        </div>
                    </div>
                </div>
                <div className="divider" />
                <div className="ct">Department Information</div>
                {[
                    ["🏫 School", user?.school_name || "Assigned School"],
                    ["🎓 Code", user?.school_code || "N/A"],
                    ["📧 Contact", user?.email || "faculty@" + user?.school_code?.toLowerCase() + ".sage.edu.in"]
                ].map(([l, v], i) => (
                    <div key={i} style={{ display: "flex", gap: 13, padding: "10px 0", borderBottom: "1px solid var(--border)", fontSize: 12 }}>
                        <span style={{ color: "var(--muted)", minWidth: 100 }}>{l}</span>
                        <span style={{ color: "var(--navy)", fontWeight: 500, flex: 1 }}>{v}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
