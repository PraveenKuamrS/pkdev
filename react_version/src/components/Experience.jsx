import React from 'react';

export default function Experience() {
    return (
        <section className="experience section-light" id="experience">
            <div className="container">
                <div className="section-header">
                    <span className="overline">— EXPERIENCE</span>
                    <h2 className="section-title">Where I've <span className="text-primary">Worked</span></h2>
                </div>

                <div className="experience-timeline">
                    <div className="exp-card">
                        <div className="exp-meta">
                            <span className="exp-dot" aria-hidden="true"></span>
                            <span className="exp-period">Dec 2025 – Present</span>
                            <span className="exp-company">Cygnusa Technologies · Chennai</span>
                        </div>
                        <div className="exp-content">
                            <h3 className="exp-role">Software Developer L2 — Mobile & Backend</h3>
                            <p className="exp-project">Specializing in Flutter mobile application development and scalable backend architecture, with hands-on experience designing and implementing complex modules such as subscription-based platforms, payment gateway integrations, real-time communication, and end-to-end backend services.
                            </p>
                        </div>
                    </div>

                    <div className="exp-card">
                        <div className="exp-meta">
                            <span className="exp-dot" aria-hidden="true"></span>
                            <span className="exp-period">2023 – Dec 2025</span>
                            <span className="exp-company">iBridge Techsoft Pvt Ltd · Hyderabad</span>
                        </div>
                        <div className="exp-content">
                            <h3 className="exp-role">Flutter & Full Stack Developer (MEVN)</h3>
                            <p className="exp-project">Worked across Flutter mobile development and full stack delivery using the MEVN stack.</p>
                        </div>
                    </div>

                    <div className="exp-card">
                        <div className="exp-meta">
                            <span className="exp-dot" aria-hidden="true"></span>
                            <span className="exp-period">Apr 2023 – 2023</span>
                            <span className="exp-company">iBridge Techsoft Pvt Ltd · Hyderabad</span>
                        </div>
                        <div className="exp-content">
                            <h3 className="exp-role">Associate Developer (Java Full Stack)</h3>
                            <p className="exp-project">Started in Java full stack and transitioned into Flutter within the first few months.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
