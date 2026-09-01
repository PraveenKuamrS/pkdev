import React from 'react';

export default function About() {
    return (
        <section className="about" id="about">
            <div className="container about-container">
                <div className="about-content">
                    <span className="overline">— ABOUT ME</span>
                    <h2 className="section-title">👉 Building scalable apps. <span className="text-primary">Solving real-world problems.</span> Delivering impact.</h2>
                    <div className="about-text">
                        <p>I've shipped production apps used by real users daily — from enterprise collaboration platforms to fintech P2P payments and school transport systems. I own the full lifecycle: architecture, development, deployment, and support.</p>
                        <p>I have hands-on experience developing real-world applications with secure payment integrations, including Razorpay, PhonePe, and banking systems, along with building real-time and high-performance applications.</p>
                        <p>My approach focuses on clean architecture, maintainable code, and performance optimization, ensuring every product is reliable, scalable, and user-friendly.</p>
                        <p>I enjoy solving complex problems, building impactful products, and continuously learning new technologies. Outside of development, I enjoy traveling, movies, and music — maintaining a balance between creativity and productivity.</p>
                        <a href="/assets/Praveen_Kumar_Resume.pdf" download className="btn btn-secondary resume-btn">
                            Download Resume ↓
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
