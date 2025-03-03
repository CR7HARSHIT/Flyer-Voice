const mongoose = require('mongoose');
const { Schema } = mongoose;

const storesSchema = new Schema({
    name : {type : String, required : true},
});

module.exports = new mongoose.model("stores",storesSchema);