const mongoose = require('mongoose');
const { leaveStatus } = require("../utils/data")

const leaveSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User",required:true },
    date: { type: Date, required: true },
    message: {
        type: String,
    },
    status: { type: String, enum: leaveStatus, default: 'pending' },
},
    {
        timestamps: true
    });



module.exports = mongoose.model('Leave', leaveSchema);


