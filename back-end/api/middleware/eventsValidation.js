const { body, validationResult } = require('express-validator');

// Middleware to validate the request body
const validateData = [
    body('name').notEmpty().withMessage('Event name is required').isString().withMessage('Event name must be a string'),
    body('locationId').isString().withMessage('Location ID must be a string').notEmpty().withMessage('Location ID is required'),
    body('userId').isString().withMessage('User ID must be a string').notEmpty().withMessage('User ID is required'),
    body('date').isISO8601().withMessage('Date is not the right format').notEmpty().withMessage('Data is required'),
    body('enddate').isISO8601().withMessage('Date is not the right format').notEmpty().withMessage('Data is required'),
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