const fs = require('fs');

let obj = {
    a : 5,
    b : 10
}


let a = 10;
// console.log("begin write file");
// fs.writeFile('test.txt', JSON.stringify(obj), function(err){
//     if(err) console.log("ERR:" + err);
//     console.log("write file success");
// });

// let dataFileSync = fs.readFileSync('./test.txt');
// console.log("dataFileSync" + dataFileSync);

// fs.readFile('test.txt', function(err, data){
//     if(err) console.log("ERR" + err);
//     console.log("data:" + data);
// })

// console.log(JSON.parse(dataFileSync).a);

const writeFile = function(fileName, data){
    fs.writeFile('test2.txt', 'data');
}

const readFile = function(path, onReadFileDone){
    fs.readFile(path, function(err, data){
        onReadFileDone(data);
    });
    
}
module.exports = {
    writeFile,
    readFile
}