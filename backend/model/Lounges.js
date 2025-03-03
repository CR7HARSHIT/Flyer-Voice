const mongoose = require('mongoose');
const { Schema } = mongoose;

const loungesSchema = new Schema({
    name : {type : String, required : true},
});

module.exports = new mongoose.model("lounges",loungesSchema);