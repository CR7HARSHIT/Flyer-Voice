const mongoose = require('mongoose')
const asyncHandler = require('../middleware/asyncHandler')

const Store = require('../model/Store')

const saveStoreFeedback = asyncHandler(async (req, res, next)=> {
    const store = await new Store(req.body).save()
    res.status(201).json({
        success : true,
        data : store
    })
});

const getStoreFeedbacks = asyncHandler(async (req, res, next)=> {
    const stores = await Store.find({})
    res.status(200).json({
        success : true,
        data : stores
    })
});

module.exports = {saveStoreFeedback,getStoreFeedbacks}