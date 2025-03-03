const mongoose = require('mongoose');
const { Schema } = mongoose;

const checkInFeedbackSchema = new Schema({
    service : {type : Number, required : true,},
    rating : {type : Number, required : true,},
    staff : {type : Number, required : true,},
    feedbackMessage : {type : String, required : true, default:"NA"},
    createdAt: { type: Date, default: Date.now }
});

module.exports = new mongoose.model("checkinfeedback",checkInFeedbackSchema);