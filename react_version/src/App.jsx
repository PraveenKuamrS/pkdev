import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Services from './components/Services';
import Process from './components/Process';
import Work from './components/Work';
import ProjectModal from './components/ProjectModal';
import TechStack from './components/TechStack';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import './index.css';

function MainPortfolio() {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });
    const [activeModalId, setActiveModalId] = useState(null);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="portfolio-app">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main>
                <Hero />
                <About />
                <Experience />
                <Services />
                <Process />
                <Work onOpenModal={(id) => setActiveModalId(id)} />
                <TechStack />
                <Faq />
                <Contact />
            </main>
            <Footer />
            <ProjectModal activeModalId={activeModalId} onClose={() => setActiveModalId(null)} />
        </div>
    );
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPortfolio />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    );
}
