import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getUsers = () => api.get('/users').then(res => res.data);
export const getUser = id => api.get(`/users/${id}`).then(res => res.data);
export const getPolicies = () => api.get('/policies').then(res => res.data);
export const assignPolicy = (userId, policyId) =>
  api.post(`/users/${userId}/policies/${policyId}`).then(res => res.data);
export const createUser = data =>
  api.post('/users', data).then(res => res.data);

export const deleteUser = id =>
  api.delete(`/users/${id}`).then(res => res.data);

export const removeUserPolicy = (userId, policyId) =>
  api.delete(`/users/${userId}/policies/${policyId}`).then(res => res.data);

export default api;