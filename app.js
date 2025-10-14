const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const connectDb=require("./config/connectMongo.js")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// routers
const parentRouter=require("./routes/routes.js")



connectDb()
app.get('/', (req, res) => {
  res.render('login');
});

app.get('/admin', (req, res) => {
  res.render('admin');
});

app.get('/user', (req, res) => {
  res.render('user');
});


app.use("/api",parentRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));