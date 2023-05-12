import { ERROR_CODE_403 } from './error-codes';

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE_403;
  }
}

export default ForbiddenError;
