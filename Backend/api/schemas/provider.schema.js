const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    "company_name": {type: String, required: true},
    "address": {type: String, required: true},
    "city": {type: String, required: true},
    "state": {type: String, required: true, min: 2, max: 2},
    "postal_code": {type: String, required: true},
    "phone": {type: String, required: true},
    "email": {type: String, required: true, unique: true},
    "description": String,
    "tagline": String
});

const providerSchema = new Schema({
    "id": {type: Number, required: true, unique: true},
    "firstname": {type: String, required: true},
    "lastname": {type: String, required: true},
    "position": String,
    "company": companySchema
});

module.exports = {providerSchema, companySchema}