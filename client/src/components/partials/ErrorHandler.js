import { Redirect } from 'react-router-dom';
import ValidationErrors from './ValidationErrors';

export function ErrorHandler({ error }) {
  const redirectMap = { 401: '/forbidden', 403: '/forbidden', 404: '/notfound', 500: '/error' };
  const errorPath = redirectMap[error.status] || 500;
  return error.status === 400 ? <ValidationErrors error={error} /> : <Redirect to={errorPath} />;
}
