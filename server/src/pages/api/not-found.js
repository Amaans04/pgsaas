import { handleCors } from '../../lib/cors';
import { error } from '../../lib/apiResponse';

export default function handler(req, res) {
  if (handleCors(req, res)) return;
  return error(res, 'Not found. This server only serves API routes.', 404);
}
