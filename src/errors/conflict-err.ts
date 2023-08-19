import { ERROR_CODE_409 } from './error-codes';

class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE_409;
  }
}

export default ConflictError;
