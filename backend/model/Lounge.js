const mongoose = require('mongoose');
const { Schema } = mongoose;

const loungeFeedbackSchema = new Schema({
    name : {type : String, required : true},
    rating : {type : Number, required : true,},
    recommendation : {type : Number, required : true,},
    food : {type : Number, required : true,},
    service : {type : Number, required : true,},
    staff : {type : Number, required : true,},
    feedbackMessage : {type : String, required : true, default:"NA"},
    createdAt: { type: Date, default: Date.now }
});

module.exports = new mongoose.model("loungefeedback",loungeFeedbackSchema);