import React from 'react';

const techIcons = [
    { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter" },
    { name: "React", icon: "https://cdn.simpleicons.org/react" },
    { name: "React Native", icon: "https://cdn.simpleicons.org/react" },
    { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase" },
    { name: "Dart", icon: "https://cdn.simpleicons.org/dart" },
    { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
    { name: "Vue.js", icon: "https://cdn.simpleicons.org/vuedotjs" },
    { name: "Angular", icon: "https://cdn.simpleicons.org/angular" },
    { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
    { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
    { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql" }
];

export default function TechStack() {
    return (
        <section className="reviews">
            <div className="container">
                <h2 className="section-title">Technologies I Command</h2>
                <p className="section-subtitle">A modern, full-stack foundation built for scale.</p>

                <div className="skills-grid">
                    <div className="skill-group">
                        <p className="skill-group-label">Mobile</p>
                        <p className="skill-group-items">Flutter · Dart · Android Studio</p>
                    </div>
                    <div className="skill-group">
                        <p className="skill-group-label">Frontend</p>
                        <p className="skill-group-items">Vue.js · React · Angular · JavaScript</p>
                    </div>
                    <div className="skill-group">
                        <p className="skill-group-label">Backend</p>
                        <p className="skill-group-items">Node.js · Spring Boot · REST APIs</p>
                    </div>
                    <div className="skill-group">
                        <p className="skill-group-label">Database</p>
                        <p className="skill-group-items">MongoDB · MySQL · Firebase</p>
                    </div>
                    <div className="skill-group">
                        <p className="skill-group-label">Payments & APIs</p>
                        <p className="skill-group-items">Razorpay · Stripe · Plaid · PhonePe</p>
                    </div>
                    <div className="skill-group">
                        <p className="skill-group-label">Tools</p>
                        <p className="skill-group-items">Postman · Swagger · VS Code · Git</p>
                    </div>
                </div>

                <div className="tech-scroll-container">
                    <div className="tech-scroll-track">
                        {/* Set 1 */}
                        {techIcons.map((item, idx) => (
                            <div className="tech-icon-item" key={`s1-${idx}`}>
                                <img src={item.icon} alt={item.name} />
                                <span>{item.name}</span>
                            </div>
                        ))}
                        {/* Set 2 (Duplicated for infinite scroll) */}
                        {techIcons.map((item, idx) => (
                            <div className="tech-icon-item" key={`s2-${idx}`}>
                                <img src={item.icon} alt={item.name} />
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
