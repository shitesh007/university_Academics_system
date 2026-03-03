import React, { useState, useEffect } from 'react';
import { PubHeader } from './components/PubHeader';
import { Home } from './pages/Home';
import { StuLogin } from './pages/Student/StuLogin';
import { FacLogin } from './pages/Faculty/FacLogin';
import { StuDash } from './pages/Student/StuDash';
import { FacDash } from './pages/Faculty/FacDash';

export default function App() {
    const [view, setView] = useState("home");
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-dark', dark ? "1" : "0");
    }, [dark]);

    const toggleDark = () => setDark(p => !p);

    return (
        <>
            <div className={`app-wrapper ${view}`}>
                {(view === "home" || view === "stu-login" || view === "fac-login") && (
                    <PubHeader setView={setView} dark={dark} toggleDark={toggleDark} view={view} />
                )}
                {view === "home" && <Home setView={setView} />}
                {view === "stu-login" && <StuLogin setView={setView} />}
                {view === "fac-login" && <FacLogin setView={setView} />}
                {view === "stu-dash" && <StuDash setView={setView} dark={dark} toggleDark={toggleDark} />}
                {view === "fac-dash" && <FacDash setView={setView} dark={dark} toggleDark={toggleDark} />}
            </div>
        </>
    );
}
