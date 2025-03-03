const mongoose = require('mongoose')
const asyncHandler = require('../middleware/asyncHandler')

const HelpDesk = require('../model/HelpDesk')

const saveHelpDeskFeedback = asyncHandler(async (req, res, next)=> {
    const helpDesk = await new HelpDesk(req.body).save()
    res.status(201).json({
        success : true,
        data : helpDesk
    })
});

const getHelpDeskFeedbacks = asyncHandler(async (req, res, next)=> {
    const helpDesks = await HelpDesk.find({})
    return res.status(200).json({
        success : true,
        data : helpDesks
    })
});

module.exports = {saveHelpDeskFeedback,getHelpDeskFeedbacks}