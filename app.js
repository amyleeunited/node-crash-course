const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

const app = express();

const dbUrl = 'mongodb+srv://jaccobs:welcome1@node-blog.mpyov.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbUrl)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


//set view engine
app.set('view engine', 'ejs');

//middleware and static files
//the server protects your files from being access to users. 
//To make them accessible, put in public folder and use express.static

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

//routes 
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', { title: 'About' });
})

//blog routes
app.use('/blogs', blogRoutes);


//404
app.use((req, res) => {
    res.status(400).render('404', { title: '404' });
})