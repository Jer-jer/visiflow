const mongoose = require("mongoose");
const User = require("../models/user");
const { hashPassword } = require('../utils/helper');
const { filterData } = require("../middleware/filterData");
const { 
  validateData, 
  validationResult 
} = require("../middleware/dataValidation");


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to retrieve users from the database" });
  }
};

exports.addUser = async (req, res) => {
  const { first_name, middle_name, last_name, username, email, password, phone, role } = req.body;
  const ObjectId = mongoose.Types.ObjectId;

  await Promise.all(validateData.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  const userDB = await User.findOne({ email: email});
  if (userDB) {
    return res.status(409).json({ error: 'User already exists' });
  }
  
  try {
    const hashedPassword = hashPassword(password);
    const _id = new ObjectId();

    const newUser = await User.create({
      _id,
      name: {
        first_name,
        middle_name,
        last_name,
      },
      username: username || (first_name + last_name).toLowerCase(),
      email,
      password: hashedPassword,
      phone,
      role,
    });

    res.status(201).json({ User: filterData(newUser), id: _id });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new user" });
  }
};

exports.findUser = async (req, res) => {
  const { _id } = req.body;
  
  try {
    const userDB = await User.findById(_id, "-password");

    if (userDB) {
      return res.status(200).json({ User: userDB });
    } else {
      return res.status(404).json({ error: "User not found" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to find user by ID" });
  }
};

exports.updateUser = async (req, res) => {
  const { _id, first_name, middle_name, last_name, username, email, phone, role } = req.body;

  try {
    const userDB = await User.findById(_id);
    if (!userDB) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const updateFields = {
      name: {
        first_name: first_name || userDB.first_name,
        middle_name: middle_name || userDB.middle_name,
        last_name: last_name || userDB.last_name,
      },
      username: username || userDB.username,
      email: email || userDB.email,
      phone: phone || userDB.phone,
      role: role || userDB.role
  }

    const filteredUpdateFields = Object.fromEntries(
        Object.entries(updateFields).filter(([key, value]) => value !== undefined)
    );
    
    if (Object.keys(filteredUpdateFields).length === 0) {
        return res.status(400).json({ error: "No valid fields to update" });
    }
        
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      filteredUpdateFields,
      { new: true }
    );

    res.status(201).json({ User: filterData(updatedUser) });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  const { _id } = req.body;
  
  try {
    const userDB = await User.findOneAndDelete(_id);

    if (userDB) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: "User not found" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
