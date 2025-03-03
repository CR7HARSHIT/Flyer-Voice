const mongoose = require('mongoose');
const { Schema } = mongoose;

const storeFeedbackSchema = new Schema({
    name : {type : String, required : true},
    rating : {type : Number, required : true,},
    recommendation : {type : Number, required : true,},
    service : {type : Number, required : true,},
    staff : {type : Number, required : true,},
    valueForMoney : {type : Number, required : true,},
    productQuality : {type : Number, required : true,},
    feedbackMessage : {type : String, required : true, default:"NA"},
    createdAt: { type: Date, default: Date.now }
});

module.exports = new mongoose.model("storefeedback",storeFeedbackSchema);