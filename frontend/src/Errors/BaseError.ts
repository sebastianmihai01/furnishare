// The base for every custom error
// Operational errors: centralised middleware
// Non-operational errors: Node cluster mode with reviving processes

export class BaseError extends Error {
  name: string;
  statusCode: number;
  isOperational: boolean;
  description: string;

  constructor(
    name: string,
    statusCode: number,
    isOperational: boolean,
    description: string
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.description = description;
  }
}

export default BaseError;
