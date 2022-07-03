// const {people, age} = require('./people')


// console.log(people[2], age[3]);

const fs = require('fs');

//reading files

fs.readFile('./docs/doc1.txt', (err, data) => {
    if(err) {
        console.log(err)
    }
    console.log(data.toString());
}) 


//writing files

fs.writeFile('./docs/doc4.txt', 'Hello Doc4', () => {
    console.log("File written")
    }
)

//create directories

if (!fs.existsSync('./assets')){
    fs.mkdir('./assets', (err) => {
        if(err){
            console.log(err)
        }
        console.log("Folder created");
    });
} else {
    fs.rmdir('./assets', (err) => {
        console.log(err)
    })
    console.log('Folder deleted');
}

//deleting files

if (fs.existsSync('./docs/doc3.txt')){
    fs.unlink('./docs/doc3.txt', (err)=>{
        if(err) throw err
        console.log("File deleted");
    })
}