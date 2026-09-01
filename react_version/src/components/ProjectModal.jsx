import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getProjectsData } from '../services/projectsStore';

export default function ProjectModal({ activeModalId, onClose }) {
    const [projectsData, setProjectsData] = useState(getProjectsData());

    useEffect(() => {
        const handleUpdate = () => {
            setProjectsData(getProjectsData());
        };
        window.addEventListener('projects_data_updated', handleUpdate);
        return () => window.removeEventListener('projects_data_updated', handleUpdate);
    }, []);

    useEffect(() => {
        if (activeModalId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeModalId]);

    const project = activeModalId ? projectsData[activeModalId] : null;

    return (
        <AnimatePresence>
            {activeModalId && project && (
                <motion.div
                    className="modal-overlay show"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    <motion.div
                        className="modal-content"
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <motion.button
                            className="modal-close"
                            onClick={onClose}
                            aria-label="Close modal"
                            whileHover={{ scale: 1.15, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X size={20} />
                        </motion.button>
                        <div className="modal-body">
                            {/* Project Header Image */}
                            {project.image && (
                                <img src={project.image} alt={project.title} className="modal-project-img" />
                            )}

                            {/* Title */}
                            <h4>{project.title}</h4>

                            {/* Overview */}
                            {project.overview && <p>{project.overview}</p>}
                            {project.overviewParagraphs?.map((p) => (
                                <p key={`ov-${p.slice(0, 15)}`}>{p}</p>
                            ))}

                            {/* Core Stack */}
                            {project.coreStack && (
                                <>
                                    <h5>Technologies Used / Core Stack:</h5>
                                    <ul>
                                        {project.coreStack.map((item) => (
                                            <li key={`cs-${item.label}`}>
                                                <strong>{item.label}: </strong>
                                                {item.value === "www.mediawall.in" ? (
                                                    <a href="https://www.mediawall.in" target="_blank" rel="noreferrer">www.mediawall.in</a>
                                                ) : (
                                                    item.value
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {/* Integrations (e.g. Banking) */}
                            {project.integrations && (
                                <>
                                    <h5>Technical Integrations & Features:</h5>
                                    <ul>
                                        {project.integrations.map((item) => (
                                            <li key={`integ-${item.name}`}>
                                                <strong>{item.name}: </strong>{item.desc}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {/* Key Features */}
                            {project.keyFeatures && (
                                <>
                                    <h5>Key Features:</h5>
                                    <ul>
                                        {project.keyFeatures.map((feat) => (
                                            <li key={`kf-${feat.slice(0, 20)}`}>{feat}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {/* Key Highlights */}
                            {project.keyHighlights && (
                                <ul>
                                    {project.keyHighlights.map((kh) => (
                                        <li key={`kh-${kh.slice(0, 20)}`}>{kh}</li>
                                    ))}
                                </ul>
                            )}

                            {/* Current Focus */}
                            {project.currentFocus && (
                                <>
                                    <h5>Current Focus:</h5>
                                    <ul>
                                        {project.currentFocus.map((cf) => (
                                            <li key={`cf-${cf.slice(0, 20)}`}>{cf}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {/* Role Details */}
                            {project.roleDetails && (
                                <>
                                    <h5>My Role:</h5>
                                    {project.roleDetails.map((rd) => (
                                        <p key={`rd-${rd.slice(0, 20)}`}>{rd}</p>
                                    ))}
                                </>
                            )}

                            {/* Details Paragraphs */}
                            {project.detailsParagraphs && (
                                <>
                                    <h5>Project Details:</h5>
                                    {project.detailsParagraphs.map((dp) => (
                                        <p key={`dp-${dp.slice(0, 20)}`}>{dp}</p>
                                    ))}
                                </>
                            )}

                            {/* Impact */}
                            {project.impact && (
                                <>
                                    <h5>Impact:</h5>
                                    <ul>
                                        {project.impact.map((imp) => (
                                            <li key={`imp-${imp.slice(0, 20)}`}>{imp}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {/* Store / Live Action Links */}
                            {project.playStoreUrl && (
                                <a
                                    href={project.playStoreUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-primary"
                                    style={{ marginTop: '1rem', display: 'inline-block' }}
                                >
                                    View on Play Store
                                </a>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
