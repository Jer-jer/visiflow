const Companion = require('../models/visitorCompanion')

//Get list of all companions
exports.getAllCompanions = async (req, res) => {
    try {
        const companion = await Companion.find();
        return res.json({ companion });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error " });
    }
};

//Create new companion
exports.createNewCompanion = async (req, res) => {
    const { visitor_id, first_name, middle_name, last_name, email, phone, plate_num, visitor_type, status, 
        street, house, barangay, city, province, country} = req.body;
    
    try {
        const companionDB = await Companion.findOne({email});
        if(companionDB) {
            res.status(401).json({error: 'Companion already exists'});
        } else {
            const newCompanion = await Companion.create({
                visitor_id,
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
            res.status(201).json({ Companion: newCompanion});
        }
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//Get companion by ID
exports.getCompanionById = async (req, res) => {
    try {
        const { _id } = req.body;
        const companion = await Companion.findById(_id);
        
        if(companion) {
            return res.status(201).json({ companion: companion });
        } else {
            return res.status(404).json({ error: 'companion not found'});
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error " });
    }
};

//Update a companion by ID
exports.updateCompanion = async (req, res) => {
    const { _id } = req.body;
    try {
        const companion = await Companion.findById(_id);
        if(companion) {
            //need to add validation for data here
            companion.name.first_name = req.body.first_name || companion.name.first_name;
            companion.name.middle_name = req.body.middle_name || companion.name.middle_name;
            companion.name.last_name = req.body.last_name || companion.name.last_name;
            companion.email = req.body.email || companion.email;
            companion.phone = req.body.phone || companion.phone;
            companion.plate_num = req.body.plate_num || companion.plate_num;
            companion.visitor_type = req.body.companion_type || companion.visitor_type;
            companion.status = req.body.status || companion.status;
            companion.address.street = req.body.street || companion.address.street;
            companion.address.house = req.body.house || companion.address.house;
            companion.address.barangay = req.body.barangay || companion.address.barangay;
            companion.address.city = req.body.city || companion.address.city;
            companion.address.province = req.body.province || companion.address.province;
            companion.address.country = req.body.country || companion.address.country;
            companion.updatedAt = Date.now();

            await companion.save();

            res.json({ message: 'Companion updated successfully', updatedCompanion: companion });
        } else {
            return res.status(404).json({ error: 'user not found'});
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//Delete a Companion by ID 
exports.deleteCompanion = async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedCompanion = await Companion.findOneAndDelete({ _id });
        if (deletedCompanion) {
            return res.status(201).json({ message: 'Companion deleted sucessfully' });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

//RESPONSE CODE LIST
//201 Request Successful
//500 Internal Server Error
//404 Request Not Found
//400 Failed Query