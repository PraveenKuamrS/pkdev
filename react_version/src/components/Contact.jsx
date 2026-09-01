import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Lock } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        appType: '',
        budget: '',
        timeline: '',
        details: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        const templateParams = {
            name: formData.name,
            email: formData.email,
            app_type: formData.appType,
            budget: formData.budget,
            timeline: formData.timeline,
            details: formData.details
        };

        try {
            const response = await emailjs.send(
                'service_lch6kza',
                'template_4dr8xtw',
                templateParams,
                'tPUcRht6QFPc667BI'
            );

            if (response.status === 200) {
                setMessage({
                    text: "✓ Message sent successfully! I'll reach out within 24 hours.",
                    type: 'success'
                });
                setFormData({
                    name: '',
                    email: '',
                    appType: '',
                    budget: '',
                    timeline: '',
                    details: ''
                });
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            setMessage({
                text: "✗ Error sending message. Please email me directly at praveenkumarvpgs13@gmail.com",
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact" id="contact">
            <div className="container contact-container">
                <div className="availability-badge">
                    <span className="avail-dot"></span>
                    Available for Projects · Responding within 24h
                </div>
                <h2 className="section-title">Got an App Idea? Let's Build It.</h2>
                <p className="section-subtitle">Send a short brief — I’ll reply fast with next steps.</p>

                <div className="contact-wrapper">
                    <div className="contact-links">
                        <a href="mailto:praveenkumarvpgs13@gmail.com" className="contact-link">
                            <div className="contact-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" fill="currentColor">
                                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                </svg>
                            </div>
                            <div className="contact-text">
                                <strong>praveenkumarvpgs13@gmail.com</strong>
                                <span>Email · Fastest response</span>
                            </div>
                        </a>

                        <a href="https://wa.link/py2yc1" target="_blank" rel="noreferrer" className="contact-link">
                            <div className="contact-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="currentColor">
                                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                                </svg>
                            </div>
                            <div className="contact-text">
                                <strong>WhatsApp Chat</strong>
                                <span>Instant messaging</span>
                            </div>
                        </a>

                        <a href="https://github.com/PraveenKuamrS" target="_blank" rel="noreferrer" className="contact-link">
                            <div className="contact-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </div>
                            <div className="contact-text">
                                <strong>github.com/PraveenKuamrS</strong>
                                <span>GitHub · See my code</span>
                            </div>
                        </a>

                        <a href="https://www.linkedin.com/in/praveenkumarvpgs" target="_blank" rel="noreferrer" className="contact-link">
                            <div className="contact-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                            <div className="contact-text">
                                <strong>linkedin.com/in/praveenkumarvpgs</strong>
                                <span>LinkedIn · Let's connect</span>
                            </div>
                        </a>
                    </div>

                    <div className="contact-form-container">
                        <div className="form-card">
                            <div className="form-header">
                                <h3>Tell Me About Your Project</h3>
                                <p>I'll respond within 24 hours.</p>
                            </div>
                            <form onSubmit={handleSubmit} className="detailed-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="contact-name">Your Name</label>
                                        <input
                                            type="text"
                                            id="contact-name"
                                            name="name"
                                            placeholder="John Smith"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contact-email">Email Address</label>
                                        <input
                                            type="email"
                                            id="contact-email"
                                            name="email"
                                            placeholder="you@company.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-type">What Kind of App Do You Need?</label>
                                    <select
                                        id="contact-type"
                                        name="appType"
                                        value={formData.appType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Choose app type...</option>
                                        <option value="Mobile App">Mobile App</option>
                                        <option value="Web Application">Web Application</option>
                                        <option value="Backend API Integration">Backend API Integration</option>
                                        <option value="Full Stack System">Full Stack System</option>
                                    </select>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="contact-budget">Your Budget</label>
                                        <input
                                            type="text"
                                            id="contact-budget"
                                            name="budget"
                                            placeholder="Budget range..."
                                            value={formData.budget}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contact-timeline">Timeline</label>
                                        <input
                                            type="text"
                                            id="contact-timeline"
                                            name="timeline"
                                            placeholder="Desired timeline..."
                                            value={formData.timeline}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-details">Describe Your App</label>
                                    <textarea
                                        id="contact-details"
                                        name="details"
                                        rows="3"
                                        maxLength="500"
                                        placeholder="Briefly describe your project idea, key features, and target users..."
                                        value={formData.details}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" disabled={loading} className="btn btn-primary btn-block btn-lg">
                                    {!loading ? (
                                        <span>Send Project Brief &rarr;</span>
                                    ) : (
                                        <span className="btn-loader">
                                            <svg className="spinner" viewBox="0 0 50 50">
                                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                                            </svg>
                                            Sending...
                                        </span>
                                    )}
                                </button>
                                {message.text && (
                                    <div className={`form-message ${message.type}`}>
                                        {message.text}
                                    </div>
                                )}
                                <p className="form-footer">
                                    <Lock size={14} /> No commitment · Free consultation · Reply within 24h
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
