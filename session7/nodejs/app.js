//external
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//internal
const fs = require('fs');
const port = 2436;
let app = express();
const QuestionModel = require('./models/question.model');

// routers:
const questionRouter = require('./router/questionRouter');    
app.use('/question', questionRouter);

//use links from static folder 'views'
app.use(express.static('./views'));

//listen through port
app.listen(port, (err)=>{
    if(err) console.log(err)
    else console.log('Server is up');
})

//connect to mongo or create db
mongoose.connect('mongodb://localhost/quyetde', (err)=>{
    if(err) console.log(err)
    else console.log('DB connect successful')
})

//parse app/x-www-form urlEncoded
app.use(bodyParser.urlencoded({extended: false}));
//set new engine (name: handlebars) from handlebars ({default layout:'main'})
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
//set view engine as handlebars
app.set('view engine', 'handlebars');


//http methods:
app.get('/', (req, res, next)=>{
    //HOMEPAGE
    //check for all question (questions),
    // if question == null => render home with null question
    QuestionModel.find( {}, (err, questions)=>{
        if(err) console.log(err)
        req.questionList = questions;
        if (req.questionList.length <= 0) res.render('home', { question: null });
        else next();
    })
}, (req, res)=>{
    //if questions != null => get random question && render to home
    res.render('home', {
        question: req.questionList[Math.floor(Math.random()*req.questionList.length)]
    })
});

app.get('/ask', (req, res)=>{
    //ASK PAGE
    res.render('ask');
});

app.post('/api/submit-question', (req, res)=>{
    //ASK PAGE
    let newQuestion = { content: req.body.question };

    QuestionModel.create(newQuestion, (err, questionCreated)=>{
        if(err) console.log(err);
        else res.redirect(`/question/${questionCreated._id}`);
    })
});

    //
//end http methods