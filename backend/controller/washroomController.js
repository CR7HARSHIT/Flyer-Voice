const mongoose = require('mongoose')
const asyncHandler = require('../middleware/asyncHandler')

const Washroom = require('../model/Washroom')

const saveWashroomFeedback = asyncHandler(async (req, res, next)=> {
    const washroom = await new Washroom(req.body).save()
    res.status(201).json({
        success : true,
        data : washroom
    })

});

const getWashroomFeedbacks = asyncHandler(async (req, res, next)=> {
    const washroom = await Washroom.find({})
    res.status(200).json({
        success : true,
        data : washroom
    })
});

module.exports = {saveWashroomFeedback,getWashroomFeedbacks}