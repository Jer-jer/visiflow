const Visitor = require('../models/visitor');
const { validateData, handleValidationErrors, validationResult } = require('../middleware/visitorValidation');
const { filterData} = require('../middleware/filterVisitorData');

//Get list of all visitors
exports.getAllVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find();
        return res.json({ visitors });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error '});
    }
};

//Create a new visitor
exports.createNewVisitor = async (req, res) => {
    const { first_name, middle_name, last_name, email, phone, plate_num, visitor_type, status, 
        street, house, barangay, city, province, country} = req.body;
    
    await Promise.all(validateData.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
        const userDB = await Visitor.findOne({email});
        if(userDB) {
            res.status(401).json({error: 'User already exists'});
        } else {
            const newVisitor = await Visitor.create({
                name: {
                    first_name,
                    middle_name,
                    last_name
                },
                email,
                phone,
                plate_num,
                visitor_type,
                status,
                address: {
                    street,
                    house,
                    barangay,
                    city,
                    province,
                    country
                }
            });
            res.status(201).json({ newVisitor: filterData(newVisitor)});
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Get visitor by ID
exports.getVisitorById = async (req, res) => {
    try {
        const { _id } = req.body;
        const searchedVisitor = await Visitor.findById(_id);
        
        if(searchedVisitor) {
            return res.status(201).json({ visitor: searchedVisitor });
        } else {
            return res.status(404).json({ error: 'visitor not found'});
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a visitor by ID
exports.updateVisitor = async (req, res) => {
    const { _id } = req.body;
    try {
        const visitor = await Visitor.findById(_id);        
        if(visitor) {
            //need to add validation for data here
            visitor.name.first_name = req.body.first_name || visitor.name.first_name;
            visitor.name.middle_name = req.body.middle_name || visitor.name.middle_name;
            visitor.name.last_name = req.body.last_name || visitor.name.last_name;
            visitor.email = req.body.email || visitor.email;
            visitor.phone = req.body.phone || visitor.phone;
            visitor.plate_num = req.body.plate_num || visitor.plate_num;
            visitor.visitor_type = req.body.visitor_type || visitor.visitor_type;
            visitor.status = req.body.status || visitor.status;
            visitor.address.street = req.body.street || visitor.address.street;
            visitor.address.house = req.body.house || visitor.address.house;
            visitor.address.barangay = req.body.barangay || visitor.address.barangay;
            visitor.address.city = req.body.city || visitor.address.city;
            visitor.address.province = req.body.province || visitor.address.province;
            visitor.address.country = req.body.country || visitor.address.country;
            visitor.updatedAt = Date.now();

            await visitor.save();

            res.json({ message: 'Visitor updated successfully', updatedVisitor: visitor });
        } else {
            return res.status(404).json({ error: 'visitor not found'});
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Delete a visitor by ID
exports.deleteVisitor = async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedVisitor = await Visitor.findByIdAndDelete(_id);
        if (deletedVisitor) {
            return res.status(201).json({ message: 'Visitor deleted sucessfully' });
        } else {
            return res.status(404).json({ error: 'Visitor not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//RESPONSE CODE LIST
//201 Request Successful
//500 Internal Server Error
//404 Request Not Found
//400 Failed Query
