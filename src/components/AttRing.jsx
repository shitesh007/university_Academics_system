import React from 'react';

export function AttRing({ pct, color = "#2563EB", size = 110 }) {
    const r = (size - 14) / 2;
    const circ = 2 * Math.PI * r;
    const dash = (pct / 100) * circ;

    return (
        <div className="ar" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface2)" strokeWidth={9} />
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={9}
                    strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition: "stroke-dasharray 1.2s ease" }} />
            </svg>
            <div className="ar-center">
                <div className="ar-pct">{pct}%</div>
                <div className="ar-lbl">Attended</div>
            </div>
        </div>
    );
}
