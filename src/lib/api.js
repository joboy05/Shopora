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

export const productService = {
    getAll: (params) => api.get('/products', { params }),
    getOne: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
};

export const orderService = {
    getAll: (params) => api.get('/orders', { params }),
    getOne: (id) => api.get(`/orders/${id}`),
    getStats: () => api.get('/orders/stats'),
    updateStatus: (id, data) => api.patch(`/orders/${id}/status`, data),
};

export const customerService = {
    getAll: (params) => api.get('/customers', { params }),
    getOne: (id) => api.get(`/customers/${id}`),
    create: (data) => api.post('/customers', data),
    update: (id, data) => api.put(`/customers/${id}`, data),
};

export const metaService = {
    getDefinitions: () => api.get('/meta/definitions'),
    createDefinition: (data) => api.post('/meta/definitions', data),
    getEntries: (type) => api.get(`/meta/entries/${type}`),
    createEntry: (data) => api.post('/meta/entries', data),
    getMetafields: (ownerType, ownerId) => api.get('/meta/metafields', { params: { ownerType, ownerId } }),
    createMetafield: (data) => api.post('/meta/metafields', data)
};

export const authService = {
    login: (data) => api.post('/auth/login', data),
    register: (data) => api.post('/auth/register', data)
};

export default api;
