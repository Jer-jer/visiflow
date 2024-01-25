const { body, validationResult } = require('express-validator');

// Middleware to validate the request body
const validateData = [
    body('first_name').isString().withMessage('First name must be a string').notEmpty().withMessage('First name is required'),
    body('middle_name').isString().withMessage('Middle name must be a string').notEmpty().withMessage('Middle name is required'),
    body('last_name').isString().withMessage('Last name must be a string').notEmpty().withMessage('Last name is required'),
    body('username').optional().notEmpty().isString().withMessage('Username is required'),
    body('email').isEmail().withMessage('Must be a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('phone').isLength({ min: 11 }).withMessage('Phone number must be at least 11 digits').isString().withMessage('Phone must be a string').notEmpty().withMessage('Phone number is required'),
    body('role').optional().isString().withMessage('Role must be a string').isIn(['admin', 'employee']).withMessage('Invalid role')
];

// Middleware function to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateData, handleValidationErrors, validationResult };