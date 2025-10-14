const express = require("express")
const User=require("../models/user")
const Announcement=require("../models/announcement")
const router = express.Router()
const methodOverride = require("method-override");
router.use(methodOverride("_method"));



router.get('/admin', async (req, res) => {
  try {
    const users = await User.find();
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.render('admin', { users ,announcements});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add new announcement
router.post('/announcements/add', async (req, res) => {
  try {
    const { message } = req.body;
    await Announcement.create({ message });
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete announcement
router.post('/announcements/delete/:id', async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.get("/users/edit/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    res.render("editUser", { user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Server error");
  }
});

router.post("/users/edit/:id", async (req, res) => {
  try {
    const { name, email ,isActive } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, email ,isActive: isActive === "true" || isActive === "on"  });
    res.redirect("/admin");
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).send("Server error");
  }
});

router.delete("/users/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).send("Server error");
  }
});



module.exports = router;