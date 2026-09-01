import initialProjectsData from '../data/projectsData.json';

const STORAGE_KEY = 'custom_projects_data';

export function getProjectsData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error reading projects from localStorage:', e);
    }
    return initialProjectsData;
}

export function saveProjectsData(newProjectsData) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProjectsData, null, 2));
        window.dispatchEvent(new Event('projects_data_updated'));
    } catch (e) {
        console.error('Error saving projects to localStorage:', e);
    }
}

export function resetProjectsData() {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('projects_data_updated'));
}
