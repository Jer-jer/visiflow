const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EmployeesSchema = new Schema({
    name: {type: String, require: true },
    email: {type: String, require: true },
    contact:{type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const EmployeesModel = mongoose.model('employees', EmployeesSchema);

module.exports = EmployeesModel;