import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true,
});

export const register = (username, password) =>
    api.post('/auth/register', { username, password });

export const login = (username, password) =>
    api.post('/auth/login', { username, password });

export const logout = () => api.post('/auth/logout');

export const getUsers = () => api.get('/admin/users');

export const getProducts = () => api.get('/products');

export const addToCart = (productId) =>
    api.post('/cart', { productId });

export const getCart = () => api.get('/cart');

export const removeFromCart = (productId) =>
    api.delete(`/cart/${productId}`);