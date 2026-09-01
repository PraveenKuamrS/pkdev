import React from 'react';
import { motion } from 'framer-motion';

const servicesList = [
    {
        badge: "FL",
        badgeClass: "badge-blue",
        overline: "CROSS-PLATFORM, POLISHED UI",
        title: "Flutter Mobile Apps",
        desc: "One codebase for Android + iOS with a clean, modern UI and smooth animations."
    },
    {
        badge: "FE",
        badgeClass: "badge-cyan",
        overline: "RESPONSIVE, FAST, MODERN",
        title: "Frontend Web Apps",
        desc: "Reactive, single-page web applications offering excellent user experience across all devices."
    },
    {
        badge: "API",
        badgeClass: "badge-green",
        overline: "SECURE, SCALABLE, RESTFUL",
        title: "Backend & APIs",
        desc: "Robust backend architectures serving scalable RESTful APIs with secure authentication."
    },
    {
        badge: "DB",
        badgeClass: "badge-orange",
        overline: "STRUCTURED, RELIABLE, FAST",
        title: "Database Architecture",
        desc: "Designing optimized database schemas and queries for high-performance data retrieval."
    },
    {
        badge: "UI",
        badgeClass: "badge-purple",
        overline: "PIXEL-PERFECT, INTUITIVE",
        title: "UI/UX Implementation",
        desc: "Translating complex design files into flawless, functional frontend interface code."
    },
    {
        badge: "DEP",
        badgeClass: "badge-gray",
        overline: "RELEASE, HOSTING, MAINTENANCE",
        title: "Deployment & Publishing",
        desc: "Handling cloud server setups and app store releases for smooth production launches."
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function Services() {
    return (
        <section className="services section-light" id="services">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="overline">— SERVICES</span>
                    <h2 className="section-title">What I Can Build <br /><span className="text-primary">For You</span></h2>
                    <p className="section-subtitle">End-to-end delivery: build, architecture, and support.</p>
                </motion.div>

                <motion.div
                    className="services-grid-modern"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {servicesList.map((service) => (
                        <motion.div
                            className="service-card-modern"
                            key={service.title}
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        >
                            <div className="card-content">
                                <div className={`icon-badge ${service.badgeClass}`}>{service.badge}</div>
                                <p className="card-overline">{service.overline}</p>
                                <h3>{service.title}</h3>
                                <p className="card-desc">{service.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
