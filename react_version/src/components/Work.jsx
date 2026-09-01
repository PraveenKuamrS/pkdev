import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProjectsData } from '../services/projectsStore';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

export default function Work({ onOpenModal }) {
    const [projectsData, setProjectsData] = useState(getProjectsData());

    useEffect(() => {
        const handleUpdate = () => {
            setProjectsData(getProjectsData());
        };
        window.addEventListener('projects_data_updated', handleUpdate);
        return () => window.removeEventListener('projects_data_updated', handleUpdate);
    }, []);

    const projectKeys = Object.keys(projectsData);

    return (
        <section className="work" id="work">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Real Apps. Real Solutions.
                </motion.h2>
                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Selected works demonstrating full-stack and mobile capabilities.
                </motion.p>

                <motion.div
                    className="work-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {projectKeys.map((key) => {
                        const project = projectsData[key];
                        return (
                            <motion.button
                                key={key}
                                type="button"
                                className="work-card"
                                variants={cardVariants}
                                whileHover={{ y: -6, scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => onOpenModal(key)}
                            >
                                <div className="work-content">
                                    <h3>{project.title}</h3>
                                    <p className="work-role">{project.role}</p>
                                    <p className="work-desc">{project.desc}</p>
                                    <div className="work-tags">
                                        {project.tags?.map((tag) => (
                                            <span key={`${key}-${tag}`}>{tag}</span>
                                        ))}
                                    </div>
                                    <span className="read-more">Click to read full details &rarr;</span>
                                </div>
                                <div className="work-carousel">
                                    {project.image ? (
                                        <img src={project.image} className="carousel-img active" alt={project.title} />
                                    ) : (
                                        <div className="work-preview-text">{project.previewText || project.title}</div>
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
