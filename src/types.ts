import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
// import { ObjectId } from 'mongoose';

interface IRequest extends Request {
  user?: {
    // id: ObjectId;
    _id: string | JwtPayload;
  };
}

export default IRequest;
