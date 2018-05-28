//external
const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
//internal
let app = express();
const port = 2323;
const GirlModel = require('./models/girl.model');
const UserModel = require('./models/user.model');
const path = require('path');

//listen through port
app.listen(port, (err)=>{
    if(err) console.log(err)
    else console.log('Server is up');
})

//connect to mongo or create db
mongoose.connect('mongodb://localhost/techkids-hotgirls', (err)=>{
    if(err) console.log(err)
    else console.log('DB connect successful')
})

//use links from static folder 'views'
app.use(express.static('./views'));
app.use('/localStorage/images', express.static(path.join(__dirname, '/localStorage/images')));


//parse app/x-www-form urlEncoded
app.use(bodyParser.urlencoded({extended:false}));
//set new engine (name: handlebars) from handlebars ({default layout:'main'})
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
//set view engine as handlebars
app.set('view engine', 'handlebars');

//routers:
const uploadRouter = require('./router/uploadRouter');
app.use('/upload', uploadRouter);

//http methods
app.get('/', (req, res)=>{

    GirlModel.find( {}, (err, girls)=>{
        if(err) console.log(err)
        else {
            res.render('home', {
                girls : girls,
            });
        }
    })
    
});

//test:
