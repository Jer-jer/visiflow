const { body, validationResult } = require('express-validator');

// Middleware to validate the request body
const validateData = [
    body('first_name').isString().withMessage('Invalid First name').notEmpty().withMessage('First name is required'),
    body('middle_name').isString().withMessage('Invalid Middle name').notEmpty().withMessage('Middle name is required'),
    body('last_name').isString().withMessage('Invalid Last name').notEmpty().withMessage('Last name is required'),
    body('username').optional().notEmpty().isString().withMessage('Username is required'),
    body('email').isEmail().withMessage('Must be a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('phone').isLength({ min: 11 }).withMessage('Phone number must be at least 11 digits').isString().withMessage('Invalid Phone number').notEmpty().withMessage('Phone number is required'),
    body('role').optional().isString().isIn(['admin', 'employee']).withMessage('Invalid role')
];

const validateBldgLoc = [
    body('name').notEmpty().withMessage('Building Name is required').isString().withMessage("Building name must be a String"),
    body('roomNo').notEmpty().withMessage('Room Number is required').isString().withMessage("Room Number must be a String")
];

const validateEvents = [
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

module.exports = { 
    validateData,
    validateBldgLoc,
    validateEvents,
    handleValidationErrors, 
    validationResult 
};