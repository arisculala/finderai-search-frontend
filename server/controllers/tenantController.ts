import { withAxiosHandler } from '../utils/withAxiosHandler';

export const getAllTenants = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.get('/tenants');
  res.json(response.data);
});

export const createTenant = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.post('/tenants', req.body);
  res.status(201).json(response.data);
});

export const getTenantById = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.get(`/tenants/${req.params.id}`);
  res.json(response.data);
});

export const updateTenant = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.put(`/tenants/${req.params.id}`, req.body);
  res.json(response.data);
});

export const deleteTenant = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.delete(`/tenants/${req.params.id}`);
  res.json(response.data);
});
