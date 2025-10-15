const mongoose = require('mongoose');
const { role } = require("../utils/data")

// const attendanceSchema = new mongoose.Schema({
//     date: { type: Date, required: true },
//     status: { type: String, enum: ['Present', 'Absent', 'WFH', 'Leave'], default: 'Absent' },
//     checkIn: { type: String },
//     checkOut: { type: String },
//     totalHours: { type: Number },
// });

// const leaveSchema = new mongoose.Schema({
//     type: { type: String, enum: ['Casual', 'Sick', 'Earned'], default: 'Casual' },
//     fromDate: { type: Date },
//     toDate: { type: Date },
//     reason: { type: String },
//     status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
// });

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'employee'], default: 'employee' },
    isActive: { type: Boolean, default: true },
    leavesTaken: { type: Number, default:0},
    
    //   attendance: [attendanceSchema],
    //   leaves: [leaveSchema],   // ✅ separate leave requests
    //   leaveBalance: {
    //     casual: { type: Number, default: 12 },
    //     sick: { type: Number, default: 6 },
    //     earned: { type: Number, default: 10 }
    //   },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema);
