const { body, validationResult, handleValidationErrors } = require('express-validator');

const validateUser = [
    body('first_name').isString().withMessage('Invalid First name').notEmpty().withMessage('First name is required'),
    body('middle_name').isString().withMessage('Invalid Middle name').optional(),
    body('last_name').isString().withMessage('Invalid Last name').notEmpty().withMessage('Last name is required'),
    body('username').optional().notEmpty().isString().withMessage('Username is required'),
    body('email').isEmail().withMessage('Must be a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('phone').isLength({ min: 11 }).withMessage('Phone number must be at least 11 digits').isString().withMessage('Invalid Phone number').notEmpty().withMessage("There seems to be a problem with your phone number. Please make sure it doesn't contain special characters except '+' or '-'"),
    body('role').optional().isString().isIn(['admin', 'security']).withMessage('Invalid role')
];

const validateBldgLoc = [
    body('name').notEmpty().withMessage('Building Name is required').isString().withMessage("There seems to be a problem with the building name. Please make sure it doesn't contain special characters"),
    body('roomNo').notEmpty().withMessage('Room Number is required')
];

const validateReasons = [
    body('reason').notEmpty().withMessage('Reason is required').isString().withMessage("There seems to be a problem with the reason. Please make sure it doesn't contain special characters"),
];

const validateOffices = [
    body('name').notEmpty().withMessage('Building Name is required').isString().withMessage("There seems to be a problem with the building name. Please make sure it doesn't contain special characters"),
    body('roomNo').notEmpty().withMessage('Room Number is required').isString().withMessage("There seems to be a problem with the room number. Please make sure it doesn't contain special characters"),
    body('pic').notEmpty().withMessage('Personnel in charge is required').isString().withMessage("There seems to be a problem with the personnel's name. Please make sure it doesn't contain special characters"),
    body('contact').notEmpty().withMessage('Contact Number is required').isString().withMessage("There seems to be a problem with your phone number. Please make sure it doesn't contain special characters except '+' or '-'")
];

const validateAnnouncements = [
    body('title').notEmpty().withMessage('Title is required').isString().withMessage("There seems to be a problem with the title. Please make sure it doesn't contain special characters"),
    body('message').notEmpty().withMessage('Message is required').isString().withMessage("There seems to be a problem with the message. Please make sure it doesn't contain special characters")
];
const validateEmployees = [
    body('name').notEmpty().withMessage('Name is required').isString().withMessage("There seems to be a problem processing the name. Please make sure it doesn't contain special characters"),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage("Email must be valid"),
    body('contact').isLength({ min: 11 }).withMessage('Phone number must be at least 11 digits').notEmpty().withMessage('Phone Number is required').isString().withMessage("There seems to be a problem with your phone number. Please make sure it doesn't contain special characters except '+' or '-'")
];
const validateEvents = [
    body('name').notEmpty().withMessage('Event name is required').isString().withMessage("There seems to be a problem with the title. Please make sure it doesn't contain special characters"),
    body('locationID').isString().withMessage("There seems to be a problem with the location Id. Please make sure it doesn't contain special characters").notEmpty().withMessage('Location ID is required'),
    body('startDate').isISO8601().withMessage('Date is not the right format').notEmpty().withMessage('Data is required'),
    body('endDate').isISO8601().withMessage('Date is not the right format').notEmpty().withMessage('Data is required'),
    body('startTime').isISO8601().withMessage('Date is not the right format').notEmpty().withMessage('Data is required'),
    body('endTime').isISO8601().withMessage('Date is not the right format').notEmpty().withMessage('Data is required'),
];

const validateVisitor = [
    body('visitors.*.visitor_details.name.first_name').isString().withMessage("There seems to be a problem with your first name. Please make sure it doesn't contain special characters").notEmpty().withMessage('First name is required'),
    body('visitors.*.visitor_details.name.middle_name').isString().withMessage("There seems to be a problem with your middle name. Please make sure it doesn't contain special characters").optional(),
    body('visitors.*.visitor_details.name.last_name').isString().withMessage("There seems to be a problem with your last name. Please make sure it doesn't contain special characters").notEmpty().withMessage('Last name is required'),
    body('visitors.*.visitor_details.address').isObject().withMessage('Address must be an object'),
    body('visitors.*.visitor_details.address.brgy').isString().withMessage("There seems to be a problem with your barangay. Please make sure it doesn't contain special characters").notEmpty().withMessage('Barangay is required'),
    body('visitors.*.visitor_details.address.city').isString().withMessage("There seems to be a problem with your city. Please make sure it doesn't contain special characters").notEmpty().withMessage('City is required'),
    body('visitors.*.visitor_details.address.province').isString().withMessage("There seems to be a problem with your province. Please make sure it doesn't contain special characters").notEmpty().withMessage('Province is required'),
    body('visitors.*.visitor_details.address.country').isString().withMessage("There seems to be a problem with your country. Please make sure it doesn't contain special characters").notEmpty().withMessage('Country is required'),
    body('visitors.*.visitor_details.email').isEmail().withMessage('Must be a valid email').optional(),
    body('visitors.*.visitor_details.phone').isString().withMessage("There seems to be a problem with your phone number. Please make sure it doesn't contain special characters except '+' or '-'").notEmpty().withMessage('Phone number is required'),
    body('visitors.*.companions').optional().isArray().withMessage('Companions must be an array'),
    body('visitors.*.visitor_type').isString().withMessage('Visitor type must be a string').isIn(['Pre-Registered', 'Walk-In']).withMessage('Invalid Visitor Type'),
    body('visitors.*.status').isString().withMessage('Status must be a string').isIn(['Approved', 'In Progress', 'Declined']).withMessage('Invalid Status'),
    body('visitors.*.purpose').isObject().withMessage('Purpose must be an object').notEmpty().withMessage('Purpose is required'),
    body('visitors.*.purpose.what').isArray().withMessage('Purpose What must be an array').notEmpty().withMessage('Purpose What is required'),
    body('visitors.*.purpose.when').isISO8601().withMessage('Purpose When must be a date').notEmpty().withMessage('Purpose When is required'),
    body('visitors.*.purpose.where').isArray().withMessage('Purpose Where must be an array').notEmpty().withMessage('Purpose Where is required'),
    body('visitors.*.purpose.who').isArray().withMessage('Purpose Who must be an array').notEmpty().withMessage('Purpose Who is required'),
    body('visitors.*.expected_time_in').isISO8601().withMessage('Expected Time In must be a date').notEmpty().withMessage('Expected Time In is required'),
    body('visitors.*.expected_time_out').isISO8601().withMessage('Expected Time Out must be a date').notEmpty().withMessage('Expected Time Out is required'),
    body('visitors.*.id_picture').isObject().withMessage('ID Picture must be an object').notEmpty().withMessage('ID Picture is required'),
];

module.exports = { 
    validateVisitor,
    validateUser,
    validateBldgLoc,
    validateEvents,
    validateAnnouncements,
    validateOffices,
    validateEmployees,
    validationResult, 
    validateReasons
};