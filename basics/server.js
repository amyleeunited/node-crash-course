const http = require('http');
const fs = require('fs');
const _ = require('lodash');

//create a server using http object
const server = http.createServer((req, res) => {
    console.log(_.random(0, 20));
    console.log(req.url, req.method);

    //set Header content
    res.setHeader('Content-type', 'text/html');
    // res.write('<p>Hello my friends</p>');
    // res.write('<p>Hello again my friends</p>');

    //send an html file

    let path = './views/';

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end();
        } else {
            res.write(data);
            res.end();
            // res.end(data);
        }


    })




});

server.listen(3000, 'localhost', () => {
    console.log('Listening on port 3000');
});

