const User = require("../models/user");
const bcrypt = require("bcrypt");

const { body, validationResult } = require("express-validator");

// Middleware to validate the request body
const validateData = [
  body("first_name")
    .isString()
    .withMessage("First name must be a string")
    .notEmpty()
    .withMessage("First name is required"),
  body("last_name")
    .isString()
    .withMessage("Last name must be a string")
    .notEmpty()
    .withMessage("Last name is required"),
  body("username")
    .notEmpty()
    .isString()
    .withMessage("Username is required")
    .optional(),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("phone")
    .isLength({ min: 11 })
    .withMessage("Phone number must be at least 11 digits")
    .isString()
    .withMessage("Phone must be a string")
    .notEmpty()
    .withMessage("Phone number is required"),
  body("role")
    .isString()
    .withMessage("Role must be a string")
    .isIn(["admin", "employee"])
    .withMessage("Invalid role")
    .optional(),
];

//used to return only values we want (to remove password)
function sanitizeUser(user) {
  return {
    user_id: user.user_id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

//RESPONSE CODE LIST
//201 Request Successful
//500 Internal Server Error
//404 Request Not Found
//400 Failed Query

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
  // Run validation middleware
  await Promise.all(validateData.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  try {
    const {
      user_id,
      first_name,
      middle_name,
      last_name,
      username,
      email,
      password,
      phone,
      role,
    } = req.body;

    //check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    //hashing the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      user_id,
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

    const createdUser = await newUser.save();

    if (createdUser) {
      res.status(201).json({ user: sanitizeUser(createdUser) });
    } else {
      return res.status(400).json({ error: "Failed to Create new User" });
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
      return res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const {
      user_id,
      first_name,
      middle_name,
      last_name,
      username,
      email,
      phone,
      password,
      role,
    } = req.body;

    //hashing the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updateFields = {
      name: {
        first_name,
        middle_name,
        last_name,
      },
      username,
      password: hashedPassword,
      phone,
      email,
      role,
    };

    const filter = { user_id };

    const userUpdated = await User.findOneAndUpdate(filter, updateFields);

    if (userUpdated) {
      return res.status(201).json({
        success: "User has been updated",
        user: sanitizeUser(updateFields),
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { user_id } = req.body;
    const deletedUser = await User.findOneAndDelete({
      user_id: user_id,
    });

    if (deletedUser) {
      return res.status(201).json({ message: "User deleted sucessfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
