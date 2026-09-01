import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const textArray = ["Flutter Developer", "Full Stack Developer", "MEVN Developer", "Freelancer"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;

export default function Hero() {
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = textArray[textIndex];

        if (!isDeleting && charIndex < currentText.length) {
            const timeout = setTimeout(() => {
                setCharIndex(prev => prev + 1);
            }, typingDelay);
            return () => clearTimeout(timeout);
        } else if (!isDeleting && charIndex === currentText.length) {
            const timeout = setTimeout(() => {
                setIsDeleting(true);
            }, newTextDelay);
            return () => clearTimeout(timeout);
        } else if (isDeleting && charIndex > 0) {
            const timeout = setTimeout(() => {
                setCharIndex(prev => prev - 1);
            }, erasingDelay);
            return () => clearTimeout(timeout);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setTextIndex(prev => (prev + 1) % textArray.length);
        }
    }, [charIndex, isDeleting, textIndex]);

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="hero" id="home">
            <div className="container hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="hero-title">Praveen Kumar Sakthivel</h1>
                    <h2 className="hero-typing">
                        I am a <span className="typed-text">{textArray[textIndex].substring(0, charIndex)}</span>
                        <span className={`cursor ${charIndex < textArray[textIndex].length ? 'typing' : ''}`}>&nbsp;</span>
                    </h2>
                    <div className="hero-subtitle">
                        <p>Turning abstract ideas into elegant, high-performance, and production-ready digital solutions.</p>
                    </div>
                    <motion.div
                        className="hero-stats"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="stat-item">
                            <span className="stat-number">3.5+</span>
                            <span className="stat-label">Years Experience · Since Apr 2023</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">Apps Shipped</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">5+</span>
                            <span className="stat-label">Happy Clients</span>
                        </div>
                    </motion.div>
                    <div className="hero-actions">
                        <motion.a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, 'contact')}
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Your Project &rarr;
                        </motion.a>
                        <motion.a
                            href="#work"
                            onClick={(e) => handleNavClick(e, 'work')}
                            className="btn btn-secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            See My Work
                        </motion.a>
                    </div>
                </motion.div>
                <motion.div
                    className="hero-image"
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <img src="/images/pknew.png" alt="Praveen Kumar" />
                </motion.div>
            </div>
        </section>
    );
}
