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

const validateEvents = [
    body('name').notEmpty().withMessage('Event name is required').isString().withMessage('Event name must be a string'),
    body('locationId').isString().withMessage('Location ID must be a string').notEmpty().withMessage('Location ID is required'),
    body('userId').isString().withMessage('User ID must be a string').notEmpty().withMessage('User ID is required'),
    body('date').isISO8601().withMessage('Date is not the right format').notEmpty().withMessage('Data is required'),
    body('enddate').isISO8601().withMessage('Date is not the right format').notEmpty().withMessage('Data is required'),
];
//visitor still needs to be tested
const validateVisitor = [
    body('visitor_data.visitor_details.name.first_name').isString().withMessage('First name must be a string').notEmpty().withMessage('First name is required'),
    body('visitor_data.visitor_details.name.middle_name').isString().withMessage('Middle name must be a string'),
    body('visitor_data.visitor_details.name.last_name').isString().withMessage('Last name must be a string').notEmpty().withMessage('Last name is required'),
    body('visitor_data.visitor_details.address').isObject().withMessage('Address must be an object'),
    body('visitor_data.visitor_details.address.brgy').isString().withMessage('Barangay must be a string').notEmpty().withMessage('Barangay is required'),
    body('visitor_data.visitor_details.address.city').isString().withMessage('City must be a string').notEmpty().withMessage('City is required'),
    body('visitor_data.visitor_details.address.province').isString().withMessage('Province must be a string').notEmpty().withMessage('Province is required'),
    body('visitor_data.visitor_details.address.country').isString().withMessage('Country must be a string').notEmpty().withMessage('Country is required'),
    body('visitor_data.visitor_details.email').isEmail().withMessage('Must be a valid email'),
    body('visitor_data.visitor_details.phone').isString().withMessage('Phone must be a string').notEmpty().withMessage('Phone number is required'),
    body('visitor_data.companion_details').isArray().withMessage('Companion details must be an array'),
    body('visitor_data.visitor_type').isString().withMessage('Visitor type must be a string').isIn(['Pre-Registered', 'Walk-In']).withMessage('Invalid Visitor Type'),
    body('visitor_data.status').isString().withMessage('Status must be a string').isIn(['Approved', 'In Progress', 'Declined']).withMessage('Invalid Status'),
    body('visitor_data.purpose').isObject().withMessage('Purpose must be an object').notEmpty().withMessage('Purpose is required'),
    body('visitor_data.purpose.what').isArray().withMessage('Purpose What must be an array').notEmpty().withMessage('Purpose What is required'),
    body('visitor_data.purpose.when').isString().withMessage('Purpose When must be a string').notEmpty().withMessage('Purpose When is required'),
    body('visitor_data.purpose.where').isArray().withMessage('Purpose Where must be an array').notEmpty().withMessage('Purpose Where is required'),
    body('visitor_data.purpose.who').isArray().withMessage('Purpose Who must be an array').notEmpty().withMessage('Purpose Who is required'),
    body('visitor_data.id_picture').isObject().withMessage('ID Picture must be an object').notEmpty().withMessage('ID Picture is required'),
    body('visitor_data.id_picture.front').isString().withMessage('Front must be a string').notEmpty().withMessage('Front is required'),
    body('visitor_data.id_picture.back').isString().withMessage('Back must be a string').notEmpty().withMessage('Back is required'),
    body('visitor_data.id_picture.selfie').isString().withMessage('Selfie must be a string').notEmpty().withMessage('Selfie is required'),
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
    handleValidationErrors, 
    validationResult 
};