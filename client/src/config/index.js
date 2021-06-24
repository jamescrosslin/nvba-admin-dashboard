const url = process.env.API_URL || 'http://localhost:5000';

const errorRoutes = {
  401: '/forbidden',
  404: '/notfound',
  500: '/error',
};

export { url, errorRoutes };
