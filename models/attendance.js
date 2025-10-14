const mongoose = require('mongoose');
const { role } = require("../utils/data")

const attendanceSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,ref:"User"},
    date: { type: Date, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'WFH', 'Leave'], default: 'Absent' },
    checkIn: { type: String },
    checkOut: { type: String },
    totalHours: { type: Number },
});



module.exports = mongoose.model('Attendance', attendanceSchema);


