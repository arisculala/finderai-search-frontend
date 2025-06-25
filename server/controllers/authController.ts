import { withAxiosHandler } from '../utils/withAxiosHandler';

export const login = withAxiosHandler(async (axios, req, res) => {
  const response = await axios.post(`/users/login`, req.body);
  const user = response.data.user;
  const token = response.data.token;

  res.status(200).json({
    token: token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
});

export const logout = withAxiosHandler(async (axios, req, res) => {
  await axios.post(`/users/logout`);
  res.status(200).json({ message: 'Logged out successfully' });
});
