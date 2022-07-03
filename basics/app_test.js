const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('../models/blog');

const app = express();

const dbUrl = 'mongodb+srv://jaccobs:welcome1@node-blog.mpyov.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbUrl)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));



//listen for request
// app.listen(3000);

//set view engine
app.set('view engine', 'ejs');

//middleware and static files
//the server protects your files from being access to users. 
//To make them accessible, put in public folder and use express.static

app.use(express.static('public'));

app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log("Request has been made: ");
    console.log(req.hostname);
    console.log(req.method);
    console.log(req.path);
    next();

})

app.use((req, res, next) => {
    console.log("Time:", Date.now())
    next()
})
app.use((req, res, next) => {
    console.log("Request type: ", req.method)
    next()
})

app.use('/about', (req, res, next) => {
    res.send("Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla consequuntur praesentium dolor dicta! Ad autem, error maxime dolorem est aperiam pariatur atque, suscipit dignissimos ipsum expedita labore natus sunt excepturi?")
    next()
})

app.use('/about', (req, res, next) => {
    console.log("Request type: ", req.method)
    next()
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Opps, server not found")
})

//write and save to mongodb database
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'My New Blog2',
        snippet: 'About my new blog2',
        body: 'More about my new blog2'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});



app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('62bfb0a9b171fb93205dcc20')
        .then((result) => {
            res.send(result);
        })
        .catch((err)=> {
            console.log(err);
        });
});




//send response file 
app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index', { title: 'Home', blogs });
})

app.get('/about', (req, res) => {
    //     // res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', { title: 'About' });
})

// app.use((req, res, next) => {
//     console.log('in the next middleware');
//     next();
// })

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
})

//redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// })

//404
app.use((req, res) => {
    //     // res.status(404).sendFile('./views/404.html', { root: __dirname});
    res.status(400).render('404', { title: '404' });
})