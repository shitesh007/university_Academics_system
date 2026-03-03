import React from 'react';

export function NotifDrop({ onClose }) {
    const items = [
        { d: "#2563EB", txt: "New notes uploaded for CS-301 by Dr. Priya Sharma", t: "1h ago" },
        { d: "#D97706", txt: "Mid-semester timetable is now available to download", t: "3h ago" },
        { d: "#E11D48", txt: "Assignment 2 submission deadline is tomorrow", t: "5h ago" },
        { d: "#059669", txt: "Your query on QuickSort has been answered by faculty", t: "Yesterday" },
    ];
    return (
        <div className="nd" onClick={onClose}>
            <div className="nd-head">
                <span>Notifications</span>
                <button className="btn-ghost" style={{ fontSize: 11 }}>Mark all read</button>
            </div>
            {items.map((n, i) => (
                <div className="nd-item" key={i}>
                    <div className="nd-d" style={{ background: n.d, marginTop: 5 }} />
                    <div>
                        <div className="nd-txt">{n.txt}</div>
                        <div className="nd-time">{n.t}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
