const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Resume = new Schema({
})

module.exports = mongoose.model("Resume", Resume);