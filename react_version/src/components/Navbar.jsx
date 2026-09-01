import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, toggleTheme }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (windowHeight > 0) {
                const scrolled = (window.scrollY / windowHeight) * 100;
                setScrollProgress(scrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = (open) => {
        setMobileMenuOpen(open);
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        toggleMobileMenu(false);
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            {/* Scroll Progress Bar */}
            <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

            {/* Navigation */}
            <nav className="navbar">
                <div className="container nav-container">
                    <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="logo">
                        <img src="/assets/pklogo.png" alt="Praveen Kumar" />
                    </a>
                    <div className="nav-right">
                        <div className="nav-links">
                            <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
                            <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')}>Experience</a>
                            <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
                            <a href="#process" onClick={(e) => handleNavClick(e, 'process')}>Process</a>
                            <a href="#work" onClick={(e) => handleNavClick(e, 'work')}>Work</a>
                            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="nav-cta">Hire Me</a>
                        </div>
                        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                            {theme === 'light' ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
                        </button>
                        <button
                            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
                            onClick={() => toggleMobileMenu(!mobileMenuOpen)}
                            aria-label="Menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Backdrop */}
                <div
                    className={`mobile-menu-backdrop ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => toggleMobileMenu(false)}
                ></div>

                {/* Mobile Menu Overlay */}
                <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
                    <div className="mobile-menu-content">
                        <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="mobile-link">About</a>
                        <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className="mobile-link">Experience</a>
                        <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="mobile-link">Services</a>
                        <a href="#process" onClick={(e) => handleNavClick(e, 'process')} className="mobile-link">Process</a>
                        <a href="#work" onClick={(e) => handleNavClick(e, 'work')} className="mobile-link">Work</a>
                        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="mobile-link">Hire Me</a>
                    </div>
                </div>
            </nav>
        </>
    );
}
