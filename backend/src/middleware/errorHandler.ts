import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error('Error:', err);

  // Prisma errors
  if (err.code === 'P2002') {
    const message = 'Duplicate field value entered';
    error = { name: 'ValidationError', message, statusCode: 400 } as CustomError;
  }

  if (err.code === 'P2014') {
    const message = 'Invalid ID';
    error = { name: 'ValidationError', message, statusCode: 400 } as CustomError;
  }

  if (err.code === 'P2003') {
    const message = 'Invalid input data';
    error = { name: 'ValidationError', message, statusCode: 400 } as CustomError;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { name: 'UnauthorizedError', message, statusCode: 401 } as CustomError;
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { name: 'UnauthorizedError', message, statusCode: 401 } as CustomError;
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    const message = 'Validation Error';
    error = { name: 'ValidationError', message, statusCode: 400 } as CustomError;
  }

  // Cast errors
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { name: 'NotFoundError', message, statusCode: 404 } as CustomError;
  }

  // Multer errors
  if (err.name === 'MulterError') {
    let message = 'File upload error';
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File too large';
    } else if (err.code === 'LIMIT_FILE_COUNT') {
      message = 'Too many files';
    }
    error = { name: 'ValidationError', message, statusCode: 400 } as CustomError;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};