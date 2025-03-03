const mongoose = require('mongoose')
const asyncHandler = require('../middleware/asyncHandler');
const authentication = require('../middleware/authentication');

const FoodCourt = require('../model/FoodCourt');

const saveFoodCourtFeedback = asyncHandler(async (req, res, next)=> {
    const foodCourt = await new FoodCourt(req.body).save()
    res.status(201).json({
        success : true,
        data : foodCourt
    })
});



const getFoodCourtFeedbacks = asyncHandler(async (req, res, next)=> {
    const foodCourts = await FoodCourt.find({})
    res.status(200).json({
        success : true,
        data : foodCourts
    })
});

module.exports = {saveFoodCourtFeedback,getFoodCourtFeedbacks}