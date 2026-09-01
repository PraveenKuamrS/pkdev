import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LogOut, Plus, Edit3, Save, Trash2, ArrowLeft, Download, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { ADMIN_CONFIG } from '../config/adminConfig';
import { getProjectsData, saveProjectsData, resetProjectsData } from '../services/projectsStore';

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('admin_authenticated') === 'true';
    });
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [loginError, setLoginError] = useState('');

    const [projectsData, setProjectsData] = useState(getProjectsData());
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [successBanner, setSuccessBanner] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        role: '',
        desc: '',
        tags: '',
        image: '',
        previewText: '',
        overview: '',
        coreStack: [{ label: '', value: '' }],
        keyFeatures: '',
        impact: '',
        playStoreUrl: ''
    });

    useEffect(() => {
        // Enforce Light Theme mode for Admin Panel
        const previousTheme = document.documentElement.dataset.theme || localStorage.getItem('theme') || 'light';
        document.documentElement.dataset.theme = 'light';
        document.documentElement.style.colorScheme = 'light';

        const handleUpdate = () => {
            setProjectsData(getProjectsData());
        };
        window.addEventListener('projects_data_updated', handleUpdate);

        return () => {
            window.removeEventListener('projects_data_updated', handleUpdate);
            document.documentElement.dataset.theme = previousTheme;
            document.documentElement.style.colorScheme = previousTheme;
        };
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (usernameInput.trim() === ADMIN_CONFIG.username && passwordInput.trim() === ADMIN_CONFIG.password) {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_authenticated', 'true');
            setLoginError('');
        } else {
            setLoginError(`Invalid username or password. Check adminConfig (Username: ${ADMIN_CONFIG.username}, Password: ${ADMIN_CONFIG.password})`);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_authenticated');
    };

    const handleCreateNew = () => {
        setSelectedProjectId(null);
        setFormData({
            id: `project-${Date.now()}`,
            title: '',
            role: '',
            desc: '',
            tags: '',
            image: '',
            previewText: '',
            overview: '',
            coreStack: [
                { label: 'Front-End', value: '' },
                { label: 'Back-End', value: '' }
            ],
            keyFeatures: '',
            impact: '',
            playStoreUrl: ''
        });
        setIsEditing(true);
    };

    const handleEditProject = (key) => {
        const proj = projectsData[key];
        setSelectedProjectId(key);
        setFormData({
            id: key,
            title: proj.title || '',
            role: proj.role || '',
            desc: proj.desc || '',
            tags: proj.tags ? proj.tags.join(', ') : '',
            image: proj.image || '',
            previewText: proj.previewText || '',
            overview: proj.overview || (proj.overviewParagraphs ? proj.overviewParagraphs.join('\n\n') : ''),
            coreStack: proj.coreStack && proj.coreStack.length > 0 ? proj.coreStack : [{ label: '', value: '' }],
            keyFeatures: proj.keyFeatures ? proj.keyFeatures.join('\n') : '',
            impact: proj.impact ? proj.impact.join('\n') : '',
            playStoreUrl: proj.playStoreUrl || ''
        });
        setIsEditing(true);
    };

    const handleAddStackItem = () => {
        setFormData(prev => ({
            ...prev,
            coreStack: [...prev.coreStack, { label: '', value: '' }]
        }));
    };

    const handleStackItemChange = (index, field, value) => {
        const updatedStack = [...formData.coreStack];
        updatedStack[index][field] = value;
        setFormData(prev => ({ ...prev, coreStack: updatedStack }));
    };

    const handleRemoveStackItem = (index) => {
        setFormData(prev => ({
            ...prev,
            coreStack: prev.coreStack.filter((_, i) => i !== index)
        }));
    };

    const triggerSaveConfirmation = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            alert('Project Title is required!');
            return;
        }
        setShowConfirmModal(true);
    };

    const executeSaveProject = () => {
        setShowConfirmModal(false);
        const slug = formData.id.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
        const tagsArray = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
        const featuresArray = formData.keyFeatures ? formData.keyFeatures.split('\n').map(f => f.trim()).filter(Boolean) : [];
        const impactArray = formData.impact ? formData.impact.split('\n').map(i => i.trim()).filter(Boolean) : [];
        const validStack = formData.coreStack.filter(s => s.label.trim() && s.value.trim());

        const updatedProjectObj = {
            id: slug,
            title: formData.title,
            role: formData.role,
            desc: formData.desc,
            tags: tagsArray,
            ...(formData.image ? { image: formData.image } : {}),
            ...(formData.previewText ? { previewText: formData.previewText } : {}),
            overview: formData.overview,
            ...(validStack.length > 0 ? { coreStack: validStack } : {}),
            ...(featuresArray.length > 0 ? { keyFeatures: featuresArray } : {}),
            ...(impactArray.length > 0 ? { impact: impactArray } : {}),
            ...(formData.playStoreUrl ? { playStoreUrl: formData.playStoreUrl } : {})
        };

        const updatedData = {
            ...projectsData,
            [slug]: updatedProjectObj
        };

        saveProjectsData(updatedData);
        setProjectsData(updatedData);
        setIsEditing(false);
        setSuccessBanner(`✓ Successfully saved project "${formData.title}"! Changes live across site.`);
        setTimeout(() => setSuccessBanner(''), 4000);
    };

    const handleDeleteProject = (key) => {
        if (window.confirm(`Are you sure you want to delete "${projectsData[key].title}"?`)) {
            const copy = { ...projectsData };
            delete copy[key];
            saveProjectsData(copy);
            setProjectsData(copy);
            setSuccessBanner(`Project deleted.`);
            setTimeout(() => setSuccessBanner(''), 3000);
        }
    };

    const handleExportJson = () => {
        const jsonStr = JSON.stringify(projectsData, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'projectsData.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleReset = () => {
        if (window.confirm('Reset all project data back to original projectsData.json?')) {
            resetProjectsData();
            setSuccessBanner('Data reset to default.');
            setTimeout(() => setSuccessBanner(''), 3000);
        }
    };

    // Render Login Screen (Light Theme)
    if (!isAuthenticated) {
        return (
            <div className="admin-login-wrapper" style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                padding: '2rem',
                color: '#0f172a'
            }}>
                <motion.div
                    className="form-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        maxWidth: '450px',
                        width: '100%',
                        background: '#ffffff',
                        borderColor: '#e2e8f0',
                        borderRadius: '1.25rem',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)'
                    }}
                >
                    <div className="form-header" style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: '#eff6ff',
                            color: '#3b82f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem'
                        }}>
                            <Lock size={28} />
                        </div>
                        <h3 style={{ color: '#0f172a', fontSize: '1.75rem' }}>Admin Access Portal</h3>
                        <p style={{ color: '#64748b' }}>Log in to manage and update portfolio projects.</p>
                    </div>

                    {loginError && (
                        <div className="form-message error" style={{ marginBottom: '1.5rem' }}>
                            <AlertCircle size={16} style={{ display: 'inline', marginRight: '6px' }} />
                            {loginError}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="detailed-form">
                        <div className="form-group">
                            <label htmlFor="admin-username" style={{ color: '#334155' }}>Username</label>
                            <input
                                id="admin-username"
                                type="text"
                                placeholder="Enter username (e.g. pk1247)"
                                value={usernameInput}
                                onChange={(e) => setUsernameInput(e.target.value)}
                                style={{ background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="admin-password" style={{ color: '#334155' }}>Password</label>
                            <input
                                id="admin-password"
                                type="password"
                                placeholder="Enter password (e.g. pk2k26)"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                style={{ background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: '1rem' }}>
                            Log In to Admin &rarr;
                        </button>

                        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                            <Link to="/" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                                &larr; Return to Main Portfolio
                            </Link>
                        </div>
                    </form>
                </motion.div>
            </div>
        );
    }

    // Render Admin Dashboard (Light Theme)
    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', paddingBottom: '4rem' }}>
            {/* Top Bar */}
            <header style={{
                background: '#ffffff',
                borderBottom: '1px solid #e2e8f0',
                padding: '1.25rem 2rem',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02)'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <h2 style={{ fontSize: '1.35rem', color: '#0f172a' }}>Portfolio Admin Portal</h2>
                        <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            background: '#dcfce7',
                            color: '#15803d',
                            fontSize: '0.8rem',
                            fontWeight: 600
                        }}>
                            Logged in as {ADMIN_CONFIG.username}
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link to="/" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#0f172a', borderColor: '#cbd5e1' }}>
                            <ArrowLeft size={16} style={{ display: 'inline', marginRight: '4px' }} />
                            View Portfolio Site
                        </Link>
                        <button onClick={handleExportJson} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#0f172a', borderColor: '#cbd5e1' }}>
                            <Download size={16} style={{ display: 'inline', marginRight: '4px' }} />
                            Export JSON
                        </button>
                        <button onClick={handleReset} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#b91c1c', borderColor: '#fca5a5' }}>
                            <RotateCcw size={16} style={{ display: 'inline', marginRight: '4px' }} />
                            Reset Data
                        </button>
                        <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#dc2626', borderColor: '#fca5a5' }}>
                            <LogOut size={16} style={{ display: 'inline', marginRight: '4px' }} />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="container" style={{ marginTop: '2.5rem' }}>
                {successBanner && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            padding: '1rem 1.5rem',
                            background: '#d1fae5',
                            color: '#065f46',
                            border: '1px solid #a7f3d0',
                            borderRadius: '0.75rem',
                            marginBottom: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <CheckCircle size={20} />
                        <span>{successBanner}</span>
                    </motion.div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: isEditing ? '350px 1fr' : '1fr', gap: '2rem' }}>
                    {/* Projects Sidebar / List */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: '#0f172a', fontSize: '1.4rem' }}>Projects ({Object.keys(projectsData).length})</h3>
                            <button onClick={handleCreateNew} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                <Plus size={16} style={{ display: 'inline', marginRight: '4px' }} />
                                Add Project
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {Object.keys(projectsData).map((key) => {
                                const proj = projectsData[key];
                                const isSelected = selectedProjectId === key && isEditing;
                                return (
                                    <div
                                        key={key}
                                        style={{
                                            padding: '1.25rem',
                                            background: isSelected ? '#eff6ff' : '#ffffff',
                                            borderRadius: '0.75rem',
                                            border: `1px solid ${isSelected ? '#3b82f6' : '#e2e8f0'}`,
                                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div>
                                            <h4 style={{ color: '#0f172a', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{proj.title}</h4>
                                            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{proj.role}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => handleEditProject(key)}
                                                className="btn btn-secondary"
                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#2563eb', borderColor: '#bfdbfe' }}
                                            >
                                                <Edit3 size={14} style={{ display: 'inline', marginRight: '4px' }} />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProject(key)}
                                                className="btn btn-secondary"
                                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#dc2626', borderColor: '#fca5a5' }}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Edit / Create Project Form */}
                    {isEditing && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{
                                background: '#ffffff',
                                padding: '2.5rem',
                                borderRadius: '1rem',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3 style={{ color: '#0f172a', fontSize: '1.5rem' }}>
                                    {selectedProjectId ? `Edit Project: ${formData.title}` : 'Create New Project'}
                                </h3>
                                <button onClick={() => setIsEditing(false)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', color: '#64748b', borderColor: '#cbd5e1' }}>
                                    Cancel
                                </button>
                            </div>

                            <form onSubmit={triggerSaveConfirmation} className="detailed-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="edit-title" style={{ color: '#334155' }}>Project Title *</label>
                                        <input
                                            id="edit-title"
                                            type="text"
                                            placeholder="e.g. AI-Powered Code Editor"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            style={{ background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="edit-slug" style={{ color: '#334155' }}>Project ID / Slug *</label>
                                        <input
                                            id="edit-slug"
                                            type="text"
                                            placeholder="e.g. ai-code-editor"
                                            value={formData.id}
                                            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                            style={{ background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-role" style={{ color: '#334155' }}>Role & Scope *</label>
                                    <input
                                        id="edit-role"
                                        type="text"
                                        placeholder="e.g. Full Stack Developer | Real-Time Microservices"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        style={{ background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-desc" style={{ color: '#334155' }}>Short Description (Card Summary) *</label>
                                    <textarea
                                        id="edit-desc"
                                        rows="2"
                                        placeholder="e.g. A highly scalable collaboration app supporting direct messaging and live call channels..."
                                        value={formData.desc}
                                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                        style={{ background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="edit-tags" style={{ color: '#334155' }}>Tech Tags (Comma separated)</label>
                                        <input
                                            id="edit-tags"
                                            type="text"
                                            placeholder="e.g. Flutter, Node.js, MongoDB, WebRTC"
                                            value={formData.tags}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            style={{ background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="edit-image" style={{ color: '#334155' }}>Showcase Image Path / URL</label>
                                        <input
                                            id="edit-image"
                                            type="text"
                                            placeholder="e.g. /assets/promailnet/fullimage.png"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            style={{ background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-overview" style={{ color: '#334155' }}>Detailed Overview</label>
                                    <textarea
                                        id="edit-overview"
                                        rows="4"
                                        placeholder="e.g. Describe the project goals, user problem solved, and architecture decisions..."
                                        value={formData.overview}
                                        onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                                        style={{ background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                                    ></textarea>
                                </div>

                                {/* Core Tech Stack */}
                                <div className="form-group">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <label htmlFor="edit-stack-0-label" style={{ color: '#334155', marginBottom: 0 }}>Core Technologies / Stack Breakdown</label>
                                        <button
                                            type="button"
                                            onClick={handleAddStackItem}
                                            className="btn btn-secondary"
                                            style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', color: '#2563eb', borderColor: '#bfdbfe' }}
                                        >
                                            + Add Stack Row
                                        </button>
                                    </div>
                                    {formData.coreStack.map((item, idx) => (
                                        <div key={`stack-${item.label || 'lbl'}-${idx}`} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                                            <input
                                                id={`edit-stack-${idx}-label`}
                                                type="text"
                                                placeholder="Label (e.g. Front-End)"
                                                value={item.label}
                                                onChange={(e) => handleStackItemChange(idx, 'label', e.target.value)}
                                                style={{ flex: 1, background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                                            />
                                            <input
                                                id={`edit-stack-${idx}-value`}
                                                type="text"
                                                placeholder="Value (e.g. React.js + Tailwind)"
                                                value={item.value}
                                                onChange={(e) => handleStackItemChange(idx, 'value', e.target.value)}
                                                style={{ flex: 2, background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                                            />
                                            {formData.coreStack.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveStackItem(idx)}
                                                    style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer' }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-key-features" style={{ color: '#334155' }}>Key Features (One feature per line)</label>
                                    <textarea
                                        id="edit-key-features"
                                        rows="4"
                                        placeholder={"e.g.\nArchitected Flutter app with state management\nImplemented secure OAuth authentication\nIntegrated real-time notifications"}
                                        value={formData.keyFeatures}
                                        onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                                        style={{ background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-impact" style={{ color: '#334155' }}>Impact Points (One point per line)</label>
                                    <textarea
                                        id="edit-impact"
                                        rows="3"
                                        placeholder={"e.g.\nEnabled seamless communication across 50,000+ users\nReduced latency by 40% with WebRTC optimization"}
                                        value={formData.impact}
                                        onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                                        style={{ background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-playstore-url" style={{ color: '#334155' }}>Play Store / Live Action URL</label>
                                    <input
                                        id="edit-playstore-url"
                                        type="url"
                                        placeholder="e.g. https://play.google.com/store/..."
                                        value={formData.playStoreUrl}
                                        onChange={(e) => setFormData({ ...formData, playStoreUrl: e.target.value })}
                                        style={{ background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                    <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                                        <Save size={18} style={{ display: 'inline', marginRight: '6px' }} />
                                        Save & Publish Project
                                    </button>
                                    <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary btn-lg" style={{ color: '#64748b', borderColor: '#cbd5e1' }}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showConfirmModal && (
                    <motion.div
                        className="modal-overlay show"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowConfirmModal(false)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{ maxWidth: '480px', padding: '2.5rem', textAlign: 'center', background: '#ffffff' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginBottom: '1rem' }}>Confirm Save Project</h3>
                            <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1rem' }}>
                                Are you sure you want to save and publish changes for <strong>"{formData.title}"</strong>?
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <button onClick={executeSaveProject} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                                    Yes, Save & Publish
                                </button>
                                <button onClick={() => setShowConfirmModal(false)} className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', color: '#64748b', borderColor: '#cbd5e1' }}>
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
