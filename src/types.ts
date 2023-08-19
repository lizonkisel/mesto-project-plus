import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface IRequest extends Request {
  user?: {
    _id: string | JwtPayload;
  };
}

export default IRequest;
