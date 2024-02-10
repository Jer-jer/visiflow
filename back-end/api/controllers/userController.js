//DONE CHECKING
const User = require("../models/user");
const { hashPassword, comparePassword } = require('../utils/helper');
const { validateData, handleValidationErrors, validationResult } = require("../middleware/dataValidation");
const { filterData } = require("../middleware/filterData");
const mongoose = require("mongoose");

//Get list of all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};

//Create a new user
exports.createNewUser = async (req, res) => {
  const { first_name, middle_name, last_name, username, email, password, phone, role } = req.body;

  await Promise.all(validateData.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  try {
    const userDB = await User.findOne({ email });
    console.log(userDB);
    if (userDB) {
      res.status(401).json({ error: "User already exists" });
    } else {
      const hashedPassword = hashPassword(password);
      const _id = new mongoose.Types.ObjectId();

      const newUser = await User.create({
        _id: _id,
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
      res.status(201).json({ newUser: filterData(newUser), id: _id });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { _id } = req.body;
    const searchedUser = await User.findById(_id, "-password");

    if (searchedUser) {
      return res.status(201).json({ user: searchedUser });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Update a user by ID
exports.updateUser = async (req, res) => {
    const { _id } = req.body;
    try {
        const user = await User.findById(_id);
        if(user) {
            //need to add validation for data here
            user.name.first_name = req.body.first_name || user.name.first_name;
            user.name.middle_name = req.body.middle_name || user.name.middle_name;
            user.name.last_name = req.body.last_name || user.name.last_name;
            user.username = req.body.username || user.username;
            //need to create validation for change of email
            user.email = req.body.email || user.email;
            // need to create separate update password for user
            user.password = req.body.password || user.password;
            user.phone = req.body.phone || user.phone;
            user.role = req.body.role || user.role;
            user.updatedAt = Date.now();

            await user.save();

            res.json({ message: "User updated successfully", updatedUser: user });
    } else {
      return res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedUser = await User.findOneAndDelete({ _id });

    if (deletedUser) {
      return res.status(201).json({ message: "User deleted sucessfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//RESPONSE CODE LIST
//201 Request Successful
//500 Internal Server Error
//404 Request Not Found
//400 Failed Query