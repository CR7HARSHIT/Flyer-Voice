const mongoose = require('mongoose')
const asyncHandler = require('../middleware/asyncHandler')

const Airlines = require('../model/Airlines')

const getAirlines = asyncHandler(async (req, res, next)=> {
    const airlines = await Airlines.find({})
    res.status(200).json({
        success : true,
        data : airlines
    })
});

module.exports = {getAirlines}