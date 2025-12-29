"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        const extractedErrors = [];
        errors.array().map(err => {
            if ('param' in err) {
                extractedErrors.push({ [err.param]: err.msg });
            }
            else {
                extractedErrors.push({ error: err.msg });
            }
        });
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: extractedErrors,
        });
    };
};
exports.validate = validate;
//# sourceMappingURL=validation.js.map