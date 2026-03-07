import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// ── REQUEST INTERCEPTOR: Attach access token ──────────────────────────────────
axiosInstance.interceptors.request.use(
    (config) => {
        const tokens = localStorage.getItem('authTokens');
        if (tokens) {
            const { access } = JSON.parse(tokens);
            config.headers['Authorization'] = `Bearer ${access}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ── RESPONSE INTERCEPTOR: Handle 401 → refresh token; else logout ─────────────
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const tokens = localStorage.getItem('authTokens');

            if (tokens) {
                try {
                    const { refresh } = JSON.parse(tokens);
                    const res = await axios.post(`${API_URL}/token/refresh/`, { refresh });
                    const newTokens = { ...JSON.parse(tokens), access: res.data.access };
                    localStorage.setItem('authTokens', JSON.stringify(newTokens));
                    originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;
                    return axiosInstance(originalRequest);
                } catch (_err) {
                    // Refresh also failed — force logout
                    localStorage.removeItem('authTokens');
                    toast.error('Session expired. Please log in again.');
                    window.location.href = '/';
                }
            }
        }

        if (error.response?.status === 403) {
            toast.error('You do not have permission to perform this action.');
        } else if (error.response?.status >= 500) {
            toast.error('Server error. Please try again later.');
        } else if (!error.response) {
            toast.error('Connection error. Is the server running?');
        }

        return Promise.reject(error);
    }
);

// ── API SERVICE METHODS ───────────────────────────────────────────────────────
export const api = {
    // Students
    getStudents: () => axiosInstance.get('/students/').then(r => r.data),
    getStudentDetails: (id) => axiosInstance.get(`/students/${id}/`).then(r => r.data),

    // Faculty
    getFaculty: () => axiosInstance.get('/faculty/').then(r => r.data),

    // Subjects & Enrollments
    getSubjects: () => axiosInstance.get('/subjects/').then(r => r.data),
    getEnrollments: () => axiosInstance.get('/enrollments/').then(r => r.data),

    // Materials (Students → GET only; Faculty → full CRUD)
    getMaterials: () => axiosInstance.get('/materials/').then(r => r.data),
    uploadMaterial: (data) => axiosInstance.post('/materials/', data).then(r => r.data),

    // Assignments & Submissions
    getAssignments: () => axiosInstance.get('/assignments/').then(r => r.data),
    getSubmissions: () => axiosInstance.get('/submissions/').then(r => r.data),

    // Queries
    getQueries: () => axiosInstance.get('/queries/').then(r => r.data),
    postQuery: (data) => axiosInstance.post('/queries/', data).then(r => r.data),
};
