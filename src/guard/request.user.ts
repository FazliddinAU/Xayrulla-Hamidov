import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    id: number;
    role: 'ADMIN' | 'USER';
  }
}

export default RequestWithUser