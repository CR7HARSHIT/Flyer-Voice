const mongoose = require('mongoose');
const validator=require('validator')
const { Schema } = mongoose;

const adminSchema = new Schema({
    name : {type : String, required : true},
    email : {
        type : String, 
        required : true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Enter a valid email");

            }
        }
    },
    password : {type : String, required : true},
});

module.exports = new mongoose.model("admin",adminSchema);