const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//modals
const User = require("../models/user")
const Leave=require("../models/leave")
const Attendance=require("../models/attendance")



// router.get('/createAdmin', async (req, res) => {
//   try {
//     // Check if admin already exists
//     const admin = await User.create({
//       name:"Boxl",
//       email:"admin@gmail.com",
//       password:"admin@123",
//       role: 'admin',
//     });

//     res.status(201).json({
//       message: 'Admin created successfully',
//       admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

//signup
// router.post('/signup', async (req, res) => {
//     try {

//         // Check if admin already exists
//         const user = User.create({
//             name: "Chirag",
//             email: "employee@gmail.com",
//             password: "employee@123",
//             role: 'employee',
//         });

//         res.status(201).json({
//             message: 'User created successfully',
//             admin: { id: user._id, name: user.name, email: user.email, role: user.role },
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });





// ADMIN

// POST /signup
router.post("/addUser", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        //  Generate JWT token
        // const token = jwt.sign(
        //   { id: newUser._id, email: newUser.email },
        //   process.env.JWT_SECRET || "secretkey",
        //   { expiresIn: "1d" }
        // );

        // Send response
        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            //   token,
            //   user: {
            //     id: newUser._id,
            //     name: newUser.name,
            //     email: newUser.email,
            //   },
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

// POST /api/login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for empty fields
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields." });
        }

       
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } 
        );

        //  Send response
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        }).json({
            success: true,
            message: "Logged In Successfully",
            user
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});






// USER

router.post('/checkin/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const today = new Date();
    today.setHours(0,0,0,0); // start of today

    //  Check if leave is approved today
    const leave = await Leave.findOne({
      userId,
      date: today,
      status: 'approved'
    });

    if (leave) {
      return res.status(403).json({ message: 'Leave approved for today. Check-in not allowed.' });
    }

    //  Check if already checked in today
    const existingAttendance = await Attendance.findOne({
      userId,
      date: today
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Already checked in today.' });
    }

    // Create new attendance record
    const attendance = await Attendance.create({
      userId,
      checkIn: new Date(),
      date: today
    });

    res.status(200).json({ message: 'Checked in successfully', attendance });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;