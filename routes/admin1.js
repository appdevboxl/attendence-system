const express = require("express")
const User=require("../models/user")
const Announcement=require("../models/announcement")
const router = express.Router()


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




module.exports = router;