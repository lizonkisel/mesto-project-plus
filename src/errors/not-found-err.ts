import { ERROR_CODE_404 } from './error-codes';

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_CODE_404;
  }
}

export default NotFoundError;
