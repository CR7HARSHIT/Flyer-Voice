const mongoose = require('mongoose');
const { Schema } = mongoose;

const helpDeskFeedbackSchema = new Schema({
    rating : {type : Number, required : true,},
    staffEfficiency : {type : Number, required : true,},
    staff : {type : Number, required : true,},
    feedbackMessage : {type : String, required : true, default:"NA"},
    createdAt: { type: Date, default: Date.now }
});

module.exports = new mongoose.model("helpdeskfeedback",helpDeskFeedbackSchema);