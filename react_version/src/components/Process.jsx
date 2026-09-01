import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const processSteps = [
    {
        num: "01",
        title: "Discovery & Strategy",
        desc: "We start by understanding your vision, business goals, and target users. Together, we define the scope, key features, and the best technical approach to bring your idea to life."
    },
    {
        num: "02",
        title: "Design & Architecture",
        desc: "I design intuitive user experiences and plan a robust system architecture — including database structure, APIs, and integrations like payment gateways and third-party services."
    },
    {
        num: "03",
        title: "Development & Integration",
        desc: "Your product is built using clean, scalable code with modern technologies. Features like authentication, dashboards, and secure payment systems are integrated with regular progress updates."
    },
    {
        num: "04",
        title: "Launch & Ongoing Support",
        desc: "After thorough testing and optimization, your application is deployed to production. I ensure a smooth launch and provide ongoing support, updates, and performance improvements."
    }
];

export default function Process() {
    return (
        <section className="process section-light" id="process">
            <div className="container process-container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="overline">— HOW IT WORKS</span>
                    <h2 className="section-title">From Idea to <span className="text-primary">Launch</span></h2>
                    <p className="section-subtitle">
                        A streamlined, transparent process designed to turn your vision into a scalable digital product.
                    </p>
                </motion.div>

                <div className="timeline">
                    {processSteps.map((step, idx) => (
                        <React.Fragment key={idx}>
                            <motion.div
                                className="timeline-step"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                            >
                                <motion.div
                                    className="timeline-number"
                                    whileHover={{ scale: 1.15, rotate: 10 }}
                                >
                                    {step.num}
                                </motion.div>
                                <div className="timeline-card">
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </motion.div>
                            {idx < processSteps.length - 1 && (
                                <motion.div
                                    className="timeline-arrow"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <ArrowDown size={18} />
                                </motion.div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}
