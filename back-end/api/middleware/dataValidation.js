const { body, validationResult } = require('express-validator');

// Middleware to validate the request body
//still needs to be tested
const validateUser = [
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

const validateAnnouncements = [
    body('title').notEmpty().withMessage('Title is required').isString().withMessage("Title must be a String"),
    body('message').notEmpty().withMessage('Message is required').isString().withMessage("Message must be a String")
];

const validateEvents = [
    body('name').notEmpty().withMessage('Event name is required').isString().withMessage('Event name must be a string'),
    body('locationId').isString().withMessage('Location ID must be a string').notEmpty().withMessage('Location ID is required'),
    body('userId').isString().withMessage('User ID must be a string').notEmpty().withMessage('User ID is required'),
    body('date').isISO8601().withMessage('Date is not the right format').notEmpty().withMessage('Data is required'),
    body('enddate').isISO8601().withMessage('Date is not the right format').notEmpty().withMessage('Data is required'),
];
//visitor still needs to be tested
const validateVisitor = [
    body('first_name').isString().withMessage('First name must be a string').notEmpty().withMessage('First name is required'),
    body('middle_name').isString().withMessage('Middle name must be a string').notEmpty().withMessage('Middle name is required'),
    body('last_name').isString().withMessage('Last name must be a string').notEmpty().withMessage('Last name is required'),
    // body('email').isEmail().withMessage('Must be a valid email'),
    // body('phone').isLength({ min: 11 }).withMessage('Phone number must be at least 11 digits').isString().withMessage('Phone must be a string').notEmpty().withMessage('Phone number is required'),
    // body('plate_num').matches(/^[a-zA-Z0-9\s]+$/, 'g').withMessage('Plate number must not contain special characters'),
    // body('visitor_type').isString().withMessage('Visitor type must be a string').isIn(['W', 'P']).withMessage('Invalid visitor type'),
    // body('status').isString().withMessage('Status must be a string').isIn(['approved', 'pending', 'declined']).withMessage('Invalid status'),
    // need address validation
    // need id_picture validation
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
    validateVisitor,
    validateUser,
    validateBldgLoc,
    validateEvents,
    validateAnnouncements,
    handleValidationErrors, 
    validationResult 
};