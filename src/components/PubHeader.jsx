import React, { useState } from 'react';
import { NotifDrop } from './NotifDrop';

export function PubHeader({ setView, dark, toggleDark }) {
    const [nd, setNd] = useState(false);

    return (
        <header className="hdr">
            <div className="logo" onClick={() => setView("home")}>
                <div className="logo-ico">S</div>
                <div>
                    <div className="logo-name">SAGE University</div>
                    <div className="logo-tagline">Academic Portal · Bhopal</div>
                </div>
            </div>
            <div className="hdr-right">
                <div className="searchbar">
                    <span style={{ fontSize: 13, opacity: .5 }}>🔍</span>
                    <input placeholder="Search materials…" />
                </div>
                <div style={{ position: "relative" }}>
                    <button className="ico-btn" onClick={() => setNd(!nd)}>
                        🔔<div className="notif-dot" />
                    </button>
                    {nd && <NotifDrop onClose={() => setNd(false)} />}
                </div>
                <button className="ico-btn" onClick={toggleDark}>
                    {dark ? "☀️" : "🌙"}
                </button>
                <button className="btn btn-out btn-sm" onClick={() => setView("stu-login")}>
                    Student Login
                </button>
                <button className="btn btn-navy btn-sm" onClick={() => setView("fac-login")}>
                    Faculty Login
                </button>
            </div>
        </header>
    );
}
