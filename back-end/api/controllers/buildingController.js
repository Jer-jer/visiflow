const BuildingLoc = require("../models/buildingLocation");
const { createSystemLog } = require("../utils/helper");
const {
  validateBldgLoc,
  validationResult,
} = require("../middleware/dataValidation");

exports.getBuildings = async (req, res) => {
  try {
    const buildings = await BuildingLoc.find();
    return res.status(200).json({ buildings });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to retrieve buildings from the database" });
  }
};

exports.addBuilding = async (req, res) => {
  const { name, roomNo, userID } = req.body;

  await Promise.all(validateBldgLoc.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const newBuilding = await BuildingLoc.create({
      name,
      roomNo,
    });

    await createSystemLog(userID, "add_building", "success");

    res.status(201).json({ Building: newBuilding });
  } catch (error) {
    if (error.code === 11000) {
      const { keyValue } = error;
      const { name, roomNo } = keyValue;
      return res
        .status(400)
        .json({
          error: `Building with name '${name}' and roomNo '${roomNo}' already exists`,
        });
    }
    return res.status(500).json({ error: "Failed to create new building" });
  }
};

exports.findBuilding = async (req, res) => {
  const { _id } = req.body;

  try {
    const buildingDB = await BuildingLoc.findById(_id);

    if (buildingDB) {
      return res.status(200).json({ Building: buildingDB });
    } else {
      return res.status(404).json({ error: "Building Location not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to find building by ID" });
  }
};

//Find Announcements by Title
exports.getBuildingsbyName = async (req, res) => {
  try {
    const { name } = req.body;
    const regex = new RegExp(name, "i");
    const searchBuildings = await BuildingLoc.find({ name: regex });
    if (searchBuildings) {
      return res.status(201).json({ buildings: searchBuildings });
    } else {
      return res.status(404).json({ error: "Building not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
};

exports.updateBuilding = async (req, res) => {
  const { _id, name, roomNo, userID } = req.body;

  try {
    const buildingDB = await BuildingLoc.findById(_id);
    if (!buildingDB) {
      return res.status(404).json({ error: "Building Location not found" });
    }

    const updateFields = {
      name: name || buildingDB.name,
      roomNo: roomNo || buildingDB.roomNo,
    };

    const filteredUpdateFields = Object.fromEntries(
      Object.entries(updateFields).filter(([key, value]) => value !== undefined)
    );

    if (Object.keys(filteredUpdateFields).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const updatedBuilding = await BuildingLoc.findByIdAndUpdate(
      _id,
      filteredUpdateFields,
      { new: true }
    );
    await createSystemLog(userID, "update_building", "success");

    return res.status(201).json({ updatedBuilding });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update building" });
  }
};

exports.deleteBuilding = async (req, res) => {
  const { _id, userID } = req.body;

  try {
    const buildingDB = await BuildingLoc.findByIdAndDelete(_id);

    await createSystemLog(userID, "delete_building", "success");

    if (buildingDB) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: "Building not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete building" });
  }
};
