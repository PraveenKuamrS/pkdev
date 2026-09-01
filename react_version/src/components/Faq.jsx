import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqItems = [
    {
        question: "What is the typical project timeline?",
        answer: "Depending on the scope, an MVP usually takes 3-6 weeks. Full-scale applications with complex integrations depend heavily on features and UI requirements."
    },
    {
        question: "Do you manage both frontend and backend?",
        answer: "Absolutely. I build the complete architecture—from database structuring (MySQL/MongoDB) and APIs (Node.js/Spring Boot) to the user interface natively."
    },
    {
        question: "Can you deploy to my App Store / Play Store account?",
        answer: "Yes. I can guide you through Play Console and Apple Developer setup, handle signing, release builds, store listing, screenshots, and final submission."
    },
    {
        question: "What are your communication hours?",
        answer: "I am highly responsive and provide regular updates via email, Slack, or WhatsApp to keep you in the loop regarding milestone completions."
    }
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="faq section-light" id="faq">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="overline">— FAQ</span>
                    <h2 className="section-title">Quick Answers <br /><span className="text-primary">Before You Message</span></h2>
                    <p className="section-subtitle">Common questions, answered fast.</p>
                </motion.div>

                <div className="faq-grid">
                    {faqItems.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <motion.div
                                className="faq-card"
                                key={item.question}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                            >
                                <button
                                    type="button"
                                    className="faq-header"
                                    onClick={() => toggleFaq(idx)}
                                    aria-expanded={isOpen}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        alignItems: 'center',
                                        width: '100%',
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        font: 'inherit',
                                        color: 'inherit',
                                        textAlign: 'left'
                                    }}
                                >
                                    <h3>{item.question}</h3>
                                    <motion.div
                                        className="faq-icon"
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown size={16} />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            className="faq-body"
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <p>{item.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
