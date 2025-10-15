const mongoose = require('mongoose');
const { dayType } = require("../utils/data")

const attendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'WFH', 'Leave'], default: 'Absent' },
    dayType: { type: String, enum: dayType, default: "Half-day" },
    checkIn: { type: String, required: true },
    checkOut: { type: String },
    totalHours: { type: Number },
});

attendanceSchema.pre(['save',"findOneAndUpdate"], function (next) {
    if (this.checkIn && this.checkOut) {
        const [inHour, inMin] = this.checkIn.split(':').map(Number);
        const [outHour, outMin] = this.checkOut.split(':').map(Number);

        const diffHours = ((outHour - inHour) + (outMin - inMin) / 60);

        this.totalHours = parseFloat(diffHours.toFixed(2));
        this.dayType = diffHours >= 7 ? 'Full-day' : 'Half-day';
        if (diffHours > 0) this.status = 'Present';
    }
    next();
});


module.exports = mongoose.model('Attendance', attendanceSchema);


