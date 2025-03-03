const mongoose = require('mongoose');
const validator=require('validator')
const { Schema } = mongoose;

const userSchema = new Schema({
    name : {type : String, required : true},
    email : {
        type : String, 
        required : true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Enter a valid email");

            }
        }},
    mobileNumber : {type : Number, required : true, minLength : [10,"Error"]},
    pnr : {type : String, required : true},
});

module.exports = new mongoose.model("user",userSchema);