const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
    PNR : {type : Number, required : true},
    flightNumber : {type : String, required : true},
    gate : {type : String, required : true},
});

module.exports = new mongoose.model("tickets",ticketSchema);