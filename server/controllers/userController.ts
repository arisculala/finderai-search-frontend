import { withAxiosHandler } from '../utils/withAxiosHandler';

export const createUser = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.post('/users', req.body);
  res.status(201).json(response.data);
});

export const getAllUsers = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.get('/users');
  res.json(response.data);
});

export const getUser = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.get(`/users/${req.params.id}`);
  res.json(response.data);
});

export const updateUser = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.put(`/users/${req.params.id}`, req.body);
  res.json(response.data);
});

export const deleteUser = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.delete(`/users/${req.params.id}`);
  res.json(response.data);
});

export const updateUserPassword = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.put(
    `/users/${req.params.id}/update-password`,
    req.body
  );
  res.json(response.data);
});

export const updateUserActive = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.put(`/users/${req.params.id}/active`, req.body);
  res.json(response.data);
});
