const express = require("express")
const User=require("../models/user")
const router = express.Router()

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


router.post('/user', async (req, res) => {
  try {
    
    // Check if admin already exists
    const user = User.create({
      name:"Chirag",
      email:"employee@gmail.com",
      password:"employee@123",
      role: 'employee',
    });

    res.status(201).json({
      message: 'User created successfully',
      admin: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/login",(req,res)=>{
    res.render("login.ejs")
})


module.exports = router;