import { ERROR_CODE_400 } from './error-codes';

class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE_400;
  }
}

export default BadRequestError;
