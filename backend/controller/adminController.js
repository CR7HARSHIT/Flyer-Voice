const mongoose = require("mongoose");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
var jwt = require('jsonwebtoken');
const Admin = require("../model/Admin");

const saveAdmin = asyncHandler(async (req, res, next) => {
  const admin = await new Admin(req.body).save();
  res.status(201).json({
    success: true,
    data: admin,
  });
});

const getAdmin = asyncHandler(async (req, res, next) => {
  const privateKey = process.env.PRIVATE_KEY
  const admin = await Admin.findOne({ email: req.body.email });
  if(!admin){
    return next(new ErrorResponse("Invalid Email! Admin doesn't exixts", 404));
  }
  if (admin.password === req.body.password) {
    const token = jwt.sign({
      adminName : admin.name,
      adminEmail : admin.email
    },privateKey,{expiresIn:'1h'})
    const date = new Date();
    let expiryTime = date.setTime(date.getTime() + 1 * 60 * 60 * 1000);
    res.status(200).json({
      success: true,
      data: admin,
      token : token,
      tokenExpiry : expiryTime
    });
  } else {
    return next(new ErrorResponse("Invalid Login Details", 401));
  }
});

module.exports = { saveAdmin, getAdmin };
