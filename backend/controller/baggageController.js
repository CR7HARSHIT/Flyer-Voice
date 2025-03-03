const mongoose = require('mongoose')
const asyncHandler = require('../middleware/asyncHandler')

const Baggage = require('../model/Baggage')

const saveBaggageFeedback = asyncHandler(async (req, res, next)=> {
    const Baggages = await new Baggage(req.body).save()
    return res.status(201).json({
        success : true,
        data : Baggages
    })
});

const getBaggageFeedbacks = asyncHandler(async (req, res, next)=> {
    const Baggages = await Baggage.find({})
    return res.status(200).json({
        success : true,
        data : Baggages
    })
});

module.exports = {saveBaggageFeedback,getBaggageFeedbacks}