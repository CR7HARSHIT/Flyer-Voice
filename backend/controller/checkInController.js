const mongoose = require('mongoose')
const asyncHandler = require('../middleware/asyncHandler')

const CheckIn = require('../model/CheckIn')

const saveCheckInFeedback = asyncHandler(async (req, res, next)=> {
    const checkIn = await new CheckIn(req.body).save()
    return res.status(201).json({
        success : true,
        data : checkIn
    })
});

const getCheckInFeedbacks = asyncHandler(async (req, res, next)=> {
    const checkIns = await CheckIn.find({})
    return res.status(200).json({
        success : true,
        data : checkIns
    })
});

module.exports = {saveCheckInFeedback,getCheckInFeedbacks}