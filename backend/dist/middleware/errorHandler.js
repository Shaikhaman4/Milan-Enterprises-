"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    console.error('Error:', err);
    if (err.code === 'P2002') {
        const message = 'Duplicate field value entered';
        error = { name: 'ValidationError', message, statusCode: 400 };
    }
    if (err.code === 'P2014') {
        const message = 'Invalid ID';
        error = { name: 'ValidationError', message, statusCode: 400 };
    }
    if (err.code === 'P2003') {
        const message = 'Invalid input data';
        error = { name: 'ValidationError', message, statusCode: 400 };
    }
    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token';
        error = { name: 'UnauthorizedError', message, statusCode: 401 };
    }
    if (err.name === 'TokenExpiredError') {
        const message = 'Token expired';
        error = { name: 'UnauthorizedError', message, statusCode: 401 };
    }
    if (err.name === 'ValidationError') {
        const message = 'Validation Error';
        error = { name: 'ValidationError', message, statusCode: 400 };
    }
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = { name: 'NotFoundError', message, statusCode: 404 };
    }
    if (err.name === 'MulterError') {
        let message = 'File upload error';
        if (err.code === 'LIMIT_FILE_SIZE') {
            message = 'File too large';
        }
        else if (err.code === 'LIMIT_FILE_COUNT') {
            message = 'Too many files';
        }
        error = { name: 'ValidationError', message, statusCode: 400 };
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map