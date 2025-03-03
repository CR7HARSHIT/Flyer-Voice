const mongoose = require('mongoose');
const { Schema } = mongoose;

const airlinesSchema = new Schema({
    name : {type : String, required : true},
});

module.exports = new mongoose.model("airlines",airlinesSchema);