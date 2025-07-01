import { withAxiosHandler } from '../utils/withAxiosHandler';

export const createTenant = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.post('/tenants', req.body);
  res.status(201).json(response.data);
});

export const getTenants = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.get('/tenants');
  res.json(response.data);
});

export const getTenant = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.get(`/tenants/${req.params.id}`);
  res.json(response.data);
});

export const updateTenant = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.put(`/tenants/${req.params.id}`, req.body);
  res.json(response.data);
});

export const updateTenantActive = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.put(
    `/tenants/${req.params.id}/active`,
    req.body
  );
  res.json(response.data);
});

export const getTenantUsers = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.get(`/tenants/${req.params.id}/users`);
  res.json(response.data);
});

export const getTenantExcludeUsers = withAxiosHandler(
  async (axios, req, res) => {
    const response = await axios.get(`/tenants/${req.params.id}/users/exclude`);
    res.json(response.data);
  }
);

export const addTenantToUsers = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.post(
    `/tenants/${req.params.id}/users/add`,
    req.body
  );
  res.status(200).json(response.data);
});
