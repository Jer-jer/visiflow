const Offices = require("../models/offices");
const { createSystemLog } = require("../utils/helper");
const {
  validateOffices,
  validationResult,
} = require("../middleware/dataValidation");
const { uploadFileToGCS } = require("../utils/helper");

//Get list of offices
exports.getAllOffices = async (req, res) => {
  try {
    const office = await Offices.find();
    return res.json({ office });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};

//Create new office
exports.addOffices = async (req, res) => {
  // Run validation middleware
  await Promise.all(validateOffices.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const {
      name,
      roomNo,
      build,
      floor,
      pic,
      contact,
      email,
      opentime,
      closetime,
      openday,
      officeImg,
      userID
    } = req.body;

    //check if the office already exists
    const existingOffice = await Offices.findOne({ name, roomNo });
    if (existingOffice) {
      return res.status(400).json({ error: "Office already exists" });
    }

    const [officepic] = await Promise.all([
      uploadFileToGCS(
        Buffer.from(
          officeImg.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        ),
        `${Date.now()}_${name.toUpperCase()}_office.jpg`
      ),
    ]);

    const newOffice = new Offices({
      name,
      roomNo,
      build,
      floor,
      pic,
      contact,
      email,
      opentime,
      closetime,
      openday,
      officeImg: officepic,
    });
    await createSystemLog(userID, "add_office", "success");
    
    const createdOffice = await newOffice.save();

    res.status(201).json({ office: createdOffice });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create new office" });
  }
};

//Update Office
exports.updateOffices = async (req, res) => {
  try {
    const {
      _id,
      name,
      roomNo,
      build,
      floor,
      pic,
      contact,
      email,
      opentime,
      closetime,
      openday,
      officeImg,
      userID
    } = req.body;

    // const existingOffice = await Offices.findOne({ name, roomNo });
    // if (existingOffice) {
    //     return res.status(400).json({ error: 'Office already exists' });
    // }

    const office = await Offices.findById(_id);
    if (!office) {
      return res.status(404).json({ error: "Office not found" });
    }

    let img = officeImg;
    if (img == null) {
      const [officepic] = await Promise.all([
        uploadFileToGCS(
          Buffer.from(
            officeImg.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          ),
          `${Date.now()}_${name.toUpperCase()}_office.jpg`
        ),
      ]);
      img = officepic;
    }

    const updateFields = {
      name: name !== undefined ? name : office.name,
      roomNo: roomNo !== undefined ? roomNo : office.roomNo,
      build: build !== undefined ? build : office.build,
      floor: floor !== undefined ? floor : office.floor,
      pic: pic !== undefined ? pic : office.pic,
      contact: contact !== undefined ? contact : office.contact,
      email: email !== undefined ? email : office.email,
      opentime: opentime !== undefined ? opentime : office.opentime,
      closetime: closetime !== undefined ? closetime : office.closetime,
      openday: openday !== undefined ? openday : office.openday,
      officeImg: img,
    };

    const filteredUpdateFields = Object.fromEntries(
      Object.entries(updateFields).filter(([key, value]) => value !== undefined)
    );

    if (Object.keys(filteredUpdateFields).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const updatedOffices = await Offices.findByIdAndUpdate(
      _id,
      filteredUpdateFields,
      { new: true }
    );

    await createSystemLog(userID, "update_office", "success");

    return res.status(201).json({ message: updatedOffices });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteOffices = async (req, res) => {
  try {
    const { _id, userID } = req.body;

    const deletedData = await Offices.findByIdAndDelete(_id);

    await createSystemLog(userID, "delete_office", "success");

    if (deletedData) {
      return res.status(201).json({ message: "Data deleted successfully" });
    } else {
      return res.status(404).json({ error: "Office not found" });
    }

  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOffices = async (req, res) => {
  try {
    const { query } = req.body;
    const regex = new RegExp(query, "i");
    const searchOffices = await Offices.find({
      $or: [{ name: regex }, { roomNo: regex }, { pic: regex }],
    });
    if (searchOffices) {
      return res.status(201).json({ office: searchOffices });
    } else {
      return res.status(404).json({ error: "Office not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};
