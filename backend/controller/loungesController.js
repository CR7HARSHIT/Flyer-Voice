const mongoose = require('mongoose')
const asyncHandler = require('../middleware/asyncHandler')

const Lounges = require('../model/Lounges')

const getLounges = asyncHandler(async (req, res, next)=> {
    const lounges = await Lounges.find({})
    res.status(200).json({
        success : true,
        data : lounges
    })
});

module.exports = {getLounges}