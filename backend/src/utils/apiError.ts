export class ApiError extends Error {
  statusCode: number;
  details?: string;

  constructor(message: string, statusCode: number, details?: string) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'ApiError';

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(msg: string) {
    return new ApiError(msg, 400);
  }

  static unauthorized(msg: string = 'Unauthorized') {
    return new ApiError(msg, 401);
  }

  static forbidden(msg: string = 'Forbidden') {
    return new ApiError(msg, 403);
  }

  static notFound(msg: string = 'Not found') {
    return new ApiError(msg, 404);
  }

  static internal(msg: string = 'Internal server error') {
    return new ApiError(msg, 500);
  }
}
