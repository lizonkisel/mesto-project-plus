import { ERROR_CODE_401 } from './error-codes';

class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE_401;
  }
}

export default UnauthorizedError;
