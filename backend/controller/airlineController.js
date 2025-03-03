const mongoose = require('mongoose')
const asyncHandler = require('../middleware/asyncHandler')

const Airline = require('../model/Airline')

const saveAirlineFeedback = asyncHandler(async (req, res, next)=> {
    const airline = await new Airline(req.body).save()
    res.status(201).json({
        success : true,
        data : airline
    })
});

const getAirlineFeedback = asyncHandler(async (req, res, next)=> {
    const airlines = await Airline.find({})
    return res.status(200).json({
        success : true,
        data : airlines
    })
});

module.exports = {saveAirlineFeedback,getAirlineFeedback}