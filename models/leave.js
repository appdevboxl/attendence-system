const mongoose = require('mongoose');
const { role } = require("../utils/data")





module.exports = mongoose.model('Attendance', attendanceSchema);


