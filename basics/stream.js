const fs = require('fs');

const readStream = fs.ReadStream('./docs/long.txt');
const writeStream = fs.WriteStream('./docs/doc5.txt');

// readStream.on('data', (chunk) => {
//     console.log(chunk.toString());
//     writeStream.write(chunk.toString());
    
// });

readStream.pipe(writeStream);