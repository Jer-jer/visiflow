// const { body, validationResult } = require('express-validator');

// // Middleware to validate the request body
// const validateData = [
//     body('first_name').isString().withMessage('First name must be a string').notEmpty().withMessage('First name is required'),
//     body('middle_name').isString().withMessage('Middle name must be a string').notEmpty().withMessage('Middle name is required'),
//     body('last_name').isString().withMessage('Last name must be a string').notEmpty().withMessage('Last name is required'),
//     body('email').isEmail().withMessage('Must be a valid email'),
//     body('phone').isLength({ min: 11 }).withMessage('Phone number must be at least 11 digits').isString().withMessage('Phone must be a string').notEmpty().withMessage('Phone number is required'),
//     body('plate_num').matches(/^[a-zA-Z0-9\s]+$/, 'g').withMessage('Plate number must not contain special characters'),
//     body('visitor_type').isString().withMessage('Visitor type must be a string').isIn(['W', 'P']).withMessage('Invalid visitor type'),
//     body('status').isString().withMessage('Status must be a string').isIn(['approved', 'pending', 'declined']).withMessage('Invalid status'),
//     // need address validation
//     // need id_picture validation
// ];

// // Middleware function to handle validation errors
// const handleValidationErrors = (req, res, next) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// };

// module.exports = { validateData, handleValidationErrors, validationResult };


