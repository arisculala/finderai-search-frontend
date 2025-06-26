import { withAxiosHandler } from '../utils/withAxiosHandler';

export const createDataset = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.post('/datasets', req.body);
  res.status(201).json(response.data);
});

export const getDatasets = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.get('/datasets');
  res.json(response.data);
});

export const getDataset = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.get(`/datasets/${req.params.id}`);
  res.json(response.data);
});

export const updateDataset = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.put(`/datasets/${req.params.id}`, req.body);
  res.json(response.data);
});
