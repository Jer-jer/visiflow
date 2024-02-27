const Visitor = require("../models/visitor");
const {
  validateVisitor,
  validationResult,
} = require("../middleware/dataValidation");


exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find({}, "-id_picture");
    return res.status(200).json({ visitors });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to retrieve visitors from the database" });
  }
};

exports.addVisitor = async (req, res) => {
  const { 
    visitor_details: {
      name: {first_name, middle_name, last_name },
      address: {street, house, brgy, city, province, country},
      email, phone
    },
    companion_details,
    plate_num,
    purpose,
    visitor_type,
    status,
    id_picture
   } = req.body;

  await Promise.all(validateVisitor.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg});
  }

  const visitorDB = await Visitor.findOne({
    "visitor_details.name.first_name": first_name,
    "visitor_details.name.middle_name": middle_name,
    "visitor_details.name.last_name": last_name,
  });

  if (visitorDB) {
    return res.status(409).json({ error: "Visitor already exists" });
  } 

  try {
    const newVisitor = await Visitor.create({
      visitor_details: {
        name: { first_name, middle_name, last_name },
        address: { street, house, brgy, city, province, country },
        email,
        phone
      },
      companion_details: companion_details,
      plate_num: plate_num,
      purpose: purpose,
      id_picture: id_picture,
      visitor_type: visitor_type,
      status: status
    })
    
    return res.status(201).json({ Visitor: newVisitor });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new visitor" });
  }
};

exports.findVisitor = async (req, res) => {
  const { _id } = req.body;
  
  try {
  const visitorDB = await Visitor.findById(_id);

    if (visitorDB) {
      return res.status(200).json({ Visitor: visitorDB });
    } else {
      return res.status(404).json({ error: "Visitor not found" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to find visitor by ID" });
  }
};

exports.updateVisitor = async (req, res) => {
  const { 
    _id,
    visitor_details: {
      name: {first_name, middle_name, last_name },
      address: {street, house, brgy, city, province, country},
      email, phone
    },
    companion_details,
    plate_num,
    purpose,
    visitor_type,
    status,
    id_picture
  } = req.body;

  try {
    const visitorDB = await Visitor.findById(_id);
    if (!visitorDB) {
      return res.status(404).json({ error: 'Visitor not found' });
    }

    const updateFields = {
      'visitor_details.name.first_name': first_name,
      'visitor_details.name.middle_name': middle_name,
      'visitor_details.name.last_name': last_name,
      'visitor_details.address.street': street,
      'visitor_details.address.house': house,
      'visitor_details.address.brgy': brgy,
      'visitor_details.address.city': city,
      'visitor_details.address.province': province,
      'visitor_details.address.country': country,
      'visitor_details.email': email,
      'visitor_details.phone': phone,
      companion_details: companion_details,
      plate_num: plate_num,
      purpose: purpose,
      visitor_type: visitor_type,
      status: status,
      id_picture: id_picture
    }

    const filteredUpdateFields = Object.fromEntries(
        Object.entries(updateFields).filter(([key, value]) => value !== undefined)
    );
    
    if (Object.keys(filteredUpdateFields).length === 0) {
        return res.status(400).json({ error: "No valid fields to update" });
    }
      
    const updatedVisitor = await Visitor.findByIdAndUpdate(
      _id,
      filteredUpdateFields,
      { new: true }
    );

    res.status(201).json({ Visitor: updatedVisitor });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update user" });
  }
};

exports.deleteVisitor = async (req, res) => {
  const { _id } = req.body;
  
  try {
    const visitorDB = await Visitor.findByIdAndDelete(_id);

    if (visitorDB) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: "Visitor not found" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
