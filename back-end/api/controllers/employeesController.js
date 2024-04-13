require('dotenv').config();
const Employees = require('../models/employees');
const { sendEmail } = require('../utils/helper');
const { validateEmployees,  validationResult } = require('../middleware/dataValidation');

//Get list of announcements
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employees.find();
        return res.json({ employees });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error "});
    }
};

// //Find Announcements by Title
exports.getEmployeesByName = async (req, res) => {
    try {
        const {name} = req.body;
        const regex = new RegExp(name, 'i');
        const searchEmployees = await Employees.find({name: regex});
        if(searchEmployees) {
            return res.status(201).json({ employees: searchEmployees });
        } else {
            return res.status(404).json({ error: 'Announcement not found'});
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error '});
    }
};

//Create new announcements
exports.createNewEmployees = async (req, res) => {
    // Run validation middleware
    const { name, email, contact } = req.body;

    await Promise.all(validateEmployees.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const existingEmployee = await Employees.findOne({ name, email });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Employee already exists' });
        }

    try {
        const newEmployee = await Employees.create({ 
            name,
            email,
            contact
        });

        res.status(201).json({ employees: newEmployee });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to create new Employee" });
    }
};

exports.updateEmployees = async (req, res) => {
    try {
        
        const { _id, name,  email, contact} = req.body;

        const existingEmployee = await Employees.findOne({ name, email });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Employee already exists' });
        }

        const employee = await Employees.findById(_id);

        if(!employee) {
            return res.status(404).json({ error: 'Employee not found'});
        }

        const updateFields = {
            name: name !== undefined ? name : employee.name,
            email: email !== undefined ? email : employee.email,
            contact: contact !== undefined ? contact : employee.contact
        }
        
        const filteredUpdateFields = Object.fromEntries(
            Object.entries(updateFields).filter(([key, value]) => value !== undefined)
        );

        if (Object.keys(filteredUpdateFields).length === 0) {
            return res.status(400).json({ error: "No valid fields to update" });
        }

        const updatedEmployees = await Employees.findByIdAndUpdate(_id, filteredUpdateFields, { new: true });

        return res.status(201).json({ employees: updatedEmployees});
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteEmployees = async (req, res) => {
      try {
        const {_id} = req.body;

        const deletedData = await Employees.findByIdAndDelete(_id);

        if (deletedData) {
            return res.status(201).json({ message: 'Data deleted successfully'});
        } else {
            return res.status(404).json({ error: "Announcement not found"});
        }
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

exports.notifyPOI = async (req, res) => {
  try {
    const { recipients, subject, message } = req.body;

    await Promise.all(
      recipients.map(async (recipient) => {
        const mailOptions = {
          from: process.env.MAILER,
          to: recipient,
          subject: subject,
          text: message
        };
        await sendEmail(mailOptions);
      })
    );

    return res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to notify person of interest.' });
  }
}