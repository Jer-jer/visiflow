const BuildingLoc = require('../models/buildingLocation');

const { body, validationResult } = require('express-validator');

// Middleware to validate the request body
const validateData = [
    body('name').isString().withMessage("Building name must be a String")
    .notEmpty().withMessage('Building Name is required'),
    body('roomNo').isString().withMessage("Room Number must be a string")
    .notEmpty().withMessage('Room Number is required')
];

function sanitizeData(bldgLoc) {
    return {
        _id: bldgLoc._id,
        name: bldgLoc.name,
        roomNo: bldgLoc.roomNo,
        createdAt: bldgLoc.createdAt,
        updatedAt: bldgLoc.updatedAt
    };
}

//Get list of all building locations
exports.getAllBldgLoc = async (req, res) => {
    try {
        const bldgLoc = await BuildingLoc.find();
        return res.json({ bldgLoc });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error "});
    }
};

//Create a new building record
exports.createNewBldgLoc = async (req, res) => {
    // Run validation middleware
    await Promise.all(validateData.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { 
            name, 
            roomNo
        } = req.body;
        
        //check if the bldgLoc already exists
        const existingbldgLoc = await BuildingLoc.findOne({ name, roomNo });
        if (existingbldgLoc) {
            return res.status(400).json({ error: 'Bldg Loc already exists' });
        }

        const newBldgLoc = new BuildingLoc({ 
            name, 
            roomNo,
        });

        const createdBldgLoc = await newBldgLoc.save();
        if (createdBldgLoc) {
            return res.status(201).json({ bldgLoc: sanitizeData(createdBldgLoc) });
        } else {
            return res.status(400).json({ error: 'Failed to Create new User' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error'});
    }
};

exports.getBldgLocByID = async (req, res) => {
    try {
        const {_id} = req.body;
        const searchedBldgLoc = await BuildingLoc.findById(_id);

        if(searchedBldgLoc) {
            return res.status(201).json({ bldgLoc: searchedBldgLoc });
        } else {
            return res.status(404).json({ error: 'Building Location not found'});
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error '});
    }
};

exports.updateBldgLoc = async (req, res) => {
    try {
        const { _id, name, roomNo} = req.body;

        const bldgLoc = await BuildingLoc.findById(_id);

        if(!bldgLoc) {
            return res.status(404).json({ error: 'Buildi4ot found'});
        }

        const updateFields = {
            name: name !== undefined ? name : bldgLoc.name,
            roomNo: roomNo !== undefined ? roomNo : bldgLoc.roomNo
        }
        
        const filteredUpdateFields = Object.fromEntries(
            Object.entries(updateFields).filter(([key, value]) => value !== undefined)
        );

        if (Object.keys(filteredUpdateFields).length === 0) {
            return res.status(400).json({ error: "No valid fields to update" });
        }

        const updatedBldgLoc = await BuildingLoc.findByIdAndUpdate(_id, filteredUpdateFields, { new: true });

        return res.status(201).json({ bldgLoc: sanitizeData(updatedBldgLoc)});
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteBldgLoc = async (req, res) => {
      try {
        const {_id} = req.body;

        const deletedData = await BuildingLoc.findByIdAndDelete(_id);

        if (deletedData) {
            return res.status(201).json({ message: 'Data deleted successfully'});
        } else {
            return res.status(404).json({ error: "Building locations not found"});
        }
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}