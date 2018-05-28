//external
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

//internal
const GirlModel = require('../models/girl.model');
const path = require('path');

let Router = express.Router();

//parse app//-www-form urlEncoded
Router.use(bodyParser.urlencoded({extended:false}));

//declare storage for uploaded image
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './localStorage/images');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    },
});

let upload = multer({storage: storage});

//middleware
Router.use('/', (req, res, next)=>{
    //get all data & put it in an object 
    GirlModel.find( {}, (err, girls)=>{
        if(err) console.log(err);
        else{
            girlList = girls;
            next();
        }
    })
});

//http methods
Router.get('/', (req, res)=>{
    res.render('upload');
})

Router.post('/submit', upload.single("imageUrl"), (req, res)=>{
    //TODO: handle upload image to cloud or local server
    console.log(req.file);
    res.send('SUCCESSFUL UPLOADED');
    let newGirl = {
        imageUrl : req.file.path ,
        name : req.body.name,
        title : req.body.title,
        description: req.body.description,
        birthday: req.body.birthday,
        createdBy :'admin',
    }

    GirlModel.create(newGirl, (err, newGirlCreated)=>{
        if(err)console.log(err)
        else{
            console.log(newGirlCreated);
        }
    });
});

module.exports = Router;