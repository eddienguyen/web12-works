const express = require('express');

const fileSystem = require('./fileSystem')
const path = require('path');

let app = express();

// app.get("/", function(request, response){
//     response.send("Home page");
// })
// app.get("/about", function(request, response){
//     response.send("About page");
// })
// app.get("/contact", function(request, response){
//     // response.sendFile(path.resolve('../../session2/original.jpg'));
//     response.sendFile(path.resolve('../../session2/simple_menu.html'));
// })
// app.get("/main.css", (req, res)=>{
//     res.sendFile(path.resolve('../../session2/main.css'));
// } )

app.get('/', (req, res)=>{
    res.sendFile(path.resolve('./public/index.html'));
})
app.listen(8000, function(err){
    if(err) console.log(err);
    else {console.log("Server is up")}
});

app.use(express.static('public'));

