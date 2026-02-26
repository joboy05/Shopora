import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const marketService = {
    getAll: () => api.get('/markets'),
    create: (data) => api.post('/markets', data),
    update: (id, data) => api.patch(`/markets/${id}`, data),
    delete: (id) => api.delete(`/markets/${id}`),
};

export const catalogService = {
    getAll: () => api.get('/catalogs'),
    create: (data) => api.post('/catalogs', data),
    update: (id, data) => api.patch(`/catalogs/${id}`, data),
    delete: (id) => api.delete(`/catalogs/${id}`),
};

export const taxRuleService = {
    getAll: () => api.get('/tax-rules'),
    create: (data) => api.post('/tax-rules', data),
    update: (id, data) => api.patch(`/tax-rules/${id}`, data),
    delete: (id) => api.delete(`/tax-rules/${id}`)
};

export const payoutService = {
    getAll: () => api.get('/payouts'),
    getSummary: () => api.get('/payouts/summary')
};

export const analyticsService = {
    getSummary: () => api.get('/analytics/summary')
};

export const themeService = {
    getAll: () => api.get('/themes'),
    create: (data) => api.post('/themes', data),
    update: (id, data) => api.patch(`/themes/${id}`, data),
    publish: (id) => api.post(`/themes/${id}/publish`),
    delete: (id) => api.delete(`/themes/${id}`)
};

export default api;
