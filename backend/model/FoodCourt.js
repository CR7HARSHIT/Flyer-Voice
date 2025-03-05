const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodCourtFeedbackSchema = new Schema({
    service : {type : Number, required : true,},
    staff : {type : Number, required : true,},
    foodQuality : {type : Number, required : true,},
    valueForMoney : {type : Number, required : true,},
    cleanliness : {type : Number, required : true,},
    rating : {type : Number, required : true,},
    feedbackMessage : {type : String, required : true, default:"NA"},
    createdAt: { type: Date, default: Date.now }
});

module.exports = new mongoose.model("foodcourtfeedback",foodCourtFeedbackSchema);

