const mongoose = require('mongoose');
const DB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.a6eqd.mongodb.net/AirportFeedback?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        await mongoose.connect(DB)
        console.log("Connection to MongoDB database successful")
    } catch (error) {
        console.log("Connection to MongoDB database failed")
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
