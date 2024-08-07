const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');

const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const commentRoute = require('./routes/comment')
const Blog = require('./models/blogs');


const cookieParser = require('cookie-parser');
const checkForAuthenticationCookie = require('./middleware/authentication');

const app = express();
const PORT = 4500;

//connectins
mongoose.connect('mongodb://127.0.0.1:27017/blogging_app')
.then(()=>{console.log('MongoDb connected')})
.catch((e)=>console.log(e));


//views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static('public'))


//Routes
app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({}).sort("createdAt");
    res.render('home',{
        user: req.user,
        blogs: allBlogs,
    })
});

// app.get('/', (req, res) => {res.send({user: req.user})}); 
app.get('/test', (req, res) => {res.render('test')});
app.use('/user', userRoute);
app.use('/blog', blogRoute);
app.use('/comment', commentRoute)


//Listen
app.listen(PORT, () => {console.log(`Listening to PORT ${PORT}`)});