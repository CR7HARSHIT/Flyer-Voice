const mongoose = require('mongoose')
const asyncHandler = require('../middleware/asyncHandler')

const Lounge = require('../model/Lounge')

const saveLoungeFeedback = asyncHandler(async (req, res, next)=> {
    const lounge = await new Lounge(req.body).save()
    res.status(201).json({
        success : true,
        data : lounge
    })
});

const getLoungeFeedbacks = asyncHandler(async (req, res, next)=> {
    const lounges = await Lounge.find({})
    return res.status(200).json({
        success : true,
        data : lounges
    })
});

module.exports = {saveLoungeFeedback,getLoungeFeedbacks}