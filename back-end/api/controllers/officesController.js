const Offices = require('../models/offices');
const { 
    validateOffices, 
    validationResult 
} = require('../middleware/dataValidation');

//Get list of offices
exports.getAlloffices = async (req, res) => {
    try {
        const off = await offices.find();
        return res.json({ announce });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error "});
    }
};

//Create new office
exports.createNewOffices = async (req, res) => {
    // Run validation middleware
    await Promise.all(validateOffices.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
        const { 
            name, 
            roomNo,
            pic,
            contact,
            email,
            opentime,
            closetime,
            openday,
        } = req.body;
        
        //check if the officec already exists
        const existingOffice = await Offices.findOne({ name, roomNo });
        if (existingOffice) {
            return res.status(400).json({ error: 'Office already exists' });
        }

        const newOffice = new Offices({ 
            name, 
            roomNo,
            pic,
            contact,
            email,
            opentime,
            closetime,
            openday,
        });

        const createdOffices = await newOffice.save();

        if (createdOffices) {
            return res.status(201).json({message:createdOffices});
        } else {
            return res.status(400).json({ error: 'Failed to Create new User' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error'});
    }
};

exports.updateOffices = async (req, res) => {
    try {
        const { _id, name, 
            roomNo,
            pic,
            contact,
            email,
            opentime,
            closetime,
            openday,} = req.body;

        const office = await Announcements.findById(_id);

        if(!office) {
            return res.status(404).json({ error: 'Office not found'});
        }

        const updateFields = {
            name: name !== undefined ? name : office.name,
            roomNo: roomNo !== undefined ? roomNo : office.roomNo,
            pic: pic !== undefined ? pic : office.pic,
            contact: contact !== undefined ? contact : office.contact,
            email: email !== undefined ? email : office.email,
            opentime: opentime !== undefined ? opentime : office.opentime,
            closetime: closetime !== undefined ? closetime : office.closetime,
            openday: openday !== undefined ? openday : office.openday
        }
        
        const filteredUpdateFields = Object.fromEntries(
            Object.entries(updateFields).filter(([key, value]) => value !== undefined)
        );

        if (Object.keys(filteredUpdateFields).length === 0) {
            return res.status(400).json({ error: "No valid fields to update" });
        }

        const updatedAnnouncements = await Announcements.findByIdAndUpdate(_id, filteredUpdateFields, { new: true });

        return res.status(201).json({ announce: sanitizeData(updatedAnnouncements)});
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

