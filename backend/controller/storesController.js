const mongoose = require('mongoose')
const asyncHandler = require('../middleware/asyncHandler')

const Stores = require('../model/Stores')

const getStores = asyncHandler(async (req, res, next)=> {
    const stores = await Stores.find({})
    res.status(200).json({
        success : true,
        data : stores
    })
});

module.exports = {getStores}