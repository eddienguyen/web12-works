const express = require('express');
const handlebars = require('express-handlebars');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 2436;

const QuestionModel = require('./models/question.model');

//connect to mongodb && create db
mongoose.connect('mongodb://localhost/quyetde', (err)=>{
    if(err) console.log(err)
    else console.log("DB connect success");
});


const questionRouter = require('./router/questionRouter');
let app = express();

//parse app/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false }));
//declare a new engine(name:'handlebars') from handlebars({default layout:'main'})
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
//set this app's view engine as handlebars
app.set('view engine', 'handlebars');

//get routers
app.use('/question', questionRouter);

app.get('/', (req, res)=>{
    res.render('home');
})

app.get('/ask', (req, res)=>{
    res.render('ask');
})

app.post('/api/questions', (req, res)=>{
    
    let newQuestion = {
        content : req.body.question,
    }

    QuestionModel.create(newQuestion, (err, questionCreated)=>{
        if(err) console.log(err)
        else res.redirect(`/question/${questionCreated._id}`);
    })

    
});

//get a request for a question to answer
app.get('/answer', (req, res, next)=>{
    QuestionModel.find( {}, (err, questions)=>{
        if(err) console.log(err)
        req.questionList = questions;
        if(req.questionList.length <= 0) res.redirect(`/question/${null}`)
        else {
            // //get random question from questions
            randomQuestion = questions[Math.floor(Math.random()*questions.length)];
            //redirect to showquestion
            res.redirect(`/question/${randomQuestion._id}`);
        }
    });
}
// , (req, res)=>{} //on verify
);



//get links from folder 'views'
app.use(express.static('./views'));

//let server listen through port 2436
app.listen(port, (err)=>{
    if(err) console.log(err);
    else console.log('Server is up')
});