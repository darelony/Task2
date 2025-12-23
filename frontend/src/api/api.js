import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getUsers = () =>
  api.get('/users').then(res => res.data);

export const getUser = id =>
  api.get(`/users/${id}`).then(res => res.data);

export const getPolicies = () =>
  api.get('/policies').then(res => res.data);

export const assignPolicy = async (userId, policyId) => {
  try {
    const res = await api.post(`/users/${userId}/policies/${policyId}`);
    return res.data;
  } catch (err) {
    // Ako backend vraća status i message, prosledi ih
    if (err.response) {
      return Promise.reject({
        status: err.response.status,
        message: err.response.data.message
      });
    }
    return Promise.reject(err);
  }
};

export const removeUserPolicy = (userId, policyId) =>
  api.delete(`/users/${userId}/policies/${policyId}`).then(res => res.data);

export const createUser = data =>
  api.post('/users', data).then(res => res.data);

export const deleteUser = id =>
  api.delete(`/users/${id}`).then(res => res.data);

export const uploadAvatar = (userId, file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  return api.post(`/users/${userId}/avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data);
};

export default api;
