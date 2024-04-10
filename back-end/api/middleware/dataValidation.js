const { body, validationResult } = require('express-validator');

const validateUser = [
    body('first_name').isString().withMessage('Invalid First name').notEmpty().withMessage('First name is required'),
    body('middle_name').isString().withMessage('Invalid Middle name').optional(),
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

const validateOffices = [
    body('name').notEmpty().withMessage('Building Name is required').isString().withMessage("Building name must be a String"),
    body('roomNo').notEmpty().withMessage('Room Number is required').isString().withMessage("Room Number must be a String"),
    body('pic').notEmpty().withMessage('Personnel in charge is required').isString().withMessage("Personnel's name must be a String"),
    body('contact').isLength({ min: 11 }).withMessage('Phone number must be at least 11 digits').notEmpty().withMessage('Contact Number is required').isString().withMessage("Contact Number must be a String")
];

const validateAnnouncements = [
    body('title').notEmpty().withMessage('Title is required').isString().withMessage("Title must be a String"),
    body('message').notEmpty().withMessage('Message is required').isString().withMessage("Message must be a String")
];
const validateEmployees = [
    body('name').notEmpty().withMessage('Name is required').isString().withMessage("Name must be a String"),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage("Email must be valid"),
    body('contact').isLength({ min: 11 }).withMessage('Phone number must be at least 11 digits').notEmpty().withMessage('Phone Number is required').isString().withMessage("Phone Number must be a String")
];
const validateEvents = [
    body('name').notEmpty().withMessage('Event name is required').isString().withMessage('Event name must be a string'),
    body('locationID').isString().withMessage('Location ID must be a string').notEmpty().withMessage('Location ID is required'),
    body('startDate').isISO8601().withMessage('Date is not the right format').notEmpty().withMessage('Data is required'),
    body('endDate').isISO8601().withMessage('Date is not the right format').notEmpty().withMessage('Data is required'),
    body('startTime').isISO8601().withMessage('Date is not the right format').notEmpty().withMessage('Data is required'),
    body('endTime').isISO8601().withMessage('Date is not the right format').notEmpty().withMessage('Data is required'),
];

const validateVisitor = [
    body('visitor_details.name.first_name').isString().withMessage('First name must be a string').notEmpty().withMessage('First name is required'),
    body('visitor_details.name.middle_name').isString().withMessage('Middle name must be a string').optional(),
    body('visitor_details.name.last_name').isString().withMessage('Last name must be a string').notEmpty().withMessage('Last name is required'),
    body('visitor_details.address').isObject().withMessage('Address must be an object'),
    body('visitor_details.address.brgy').isString().withMessage('Barangay must be a string').notEmpty().withMessage('Barangay is required'),
    body('visitor_details.address.city').isString().withMessage('City must be a string').notEmpty().withMessage('City is required'),
    body('visitor_details.address.province').isString().withMessage('Province must be a string').notEmpty().withMessage('Province is required'),
    body('visitor_details.address.country').isString().withMessage('Country must be a string').notEmpty().withMessage('Country is required'),
    body('visitor_details.email').isEmail().withMessage('Must be a valid email'),
    body('visitor_details.phone').isString().withMessage('Phone must be a string').notEmpty().withMessage('Phone number is required'),
    body('companion_details').isArray().withMessage('Companion details must be an array'),
    body('visitor_type').isString().withMessage('Visitor type must be a string').isIn(['Pre-Registered', 'Walk-In']).withMessage('Invalid Visitor Type'),
    body('status').isString().withMessage('Status must be a string').isIn(['Approved', 'In Progress', 'Declined']).withMessage('Invalid Status'),
    body('purpose').isObject().withMessage('Purpose must be an object').notEmpty().withMessage('Purpose is required'),
    body('purpose.what').isArray().withMessage('Purpose What must be an array').notEmpty().withMessage('Purpose What is required'),
    body('purpose.when').isDate().withMessage('Purpose When must be a date').notEmpty().withMessage('Purpose When is required'),
    body('purpose.where').isArray().withMessage('Purpose Where must be an array').notEmpty().withMessage('Purpose Where is required'),
    body('purpose.who').isArray().withMessage('Purpose Who must be an array').notEmpty().withMessage('Purpose Who is required'),
    body('expected_time_in').isDate().withMessage('Expected Time In must be a date').notEmpty().withMessage('Expected Time In is required'),
    body('expected_time_out').isDate().withMessage('Expected Time Out must be a date').notEmpty().withMessage('Expected Time Out is required'),
    body('id_picture').isObject().withMessage('ID Picture must be an object').notEmpty().withMessage('ID Picture is required'),

];

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
    validateOffices,
    validateEmployees,
    handleValidationErrors, 
    validationResult 
};