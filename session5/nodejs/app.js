const express = require('express');
const handlebars = require('express-handlebars');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 2436;

let app = express();

//parse app/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false }));
//declare a new engine(name:'handlebars') from handlebars({default layout:'main'})
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
//set this app's view engine as handlebars
app.set('view engine', 'handlebars');

app.get('/', (req, res)=>{
    res.render('home');
})

app.get('/ask', (req, res)=>{
    res.render('ask');
})

app.post('/api/questions', (req, res)=>{
    //get list of exist questions
    let questionList = JSON.parse(fs.readFileSync('./questionList.json'));
    
    let newQuestion = {
        questionContent : req.body.question,
        questionId : questionList.length,
        yes : 0,
        no : 0
    }

    questionList.push(newQuestion);
    
    //parse updated question list to json file
    fs.writeFileSync('./questionList.json', JSON.stringify(questionList, 'utf-8'));

    res.redirect(`/question/${newQuestion.questionId}`);
});

//show question
app.get('/question/:id', (req, res)=>{
    let requestQuestionId = req.params.id;
    let questionList = JSON.parse(fs.readFileSync('./questionList.json'));

    //find question with requested id in questionList
    let questionFound = questionList.filter(question => question.questionId == requestQuestionId)[0];

    res.render('question', {
        question : questionFound,
        totalVote : questionFound.yes + questionFound.no
    });
});

//get a request for a question to answer
app.get('/answer', (req, res)=>{
    //get questionList from json file
    let questionList = JSON.parse(fs.readFileSync('./questionList.json'));
    //get random questionId from questionList
    let randomQuestionId = Math.floor(Math.random() * questionList.length);
    //choose question from questionList by randomQuestionId
    let chosenQuestion = questionList.filter(question=> question.questionId == randomQuestionId)[0];
    
    //reander to showquestion
    // res.render('question', {
    //     question: chosenQuestion,
    //     totalVote: chosenQuestion.yes + chosenQuestion.no
    // });

    //redirect to showquestion
    res.redirect(`/question/${chosenQuestion.questionId}`);
});

//post an answer of a question
app.post('/question/:quesId/api/answer/:ans', (req, res)=>{
    
    
        let ans = req.params.ans;
        let quesId = req.params.quesId;
        //get questionList from json file
    let questionList = JSON.parse(fs.readFileSync('./questionList.json'));

    questionList.forEach(question => {
        if(question.questionId == quesId){
            ans == 'yes' ? question.yes++ : question.no++;
        }
    });

    //find question with requested id in questionList
    // let questionFound = questionList.filter(question => question.questionId == quesId)[0];
    fs.writeFileSync('./questionList.json', JSON.stringify(questionList, 'utf-8'));
    res.redirect(`/question/${quesId}`);
    // res.render('question', {
    //     question: questionList[quesId],
    //     totalVote: questionList[quesId].yes+questionList[quesId].no
    // })
    
});

//get links from folder 'views'
app.use(express.static('./views'));

//let server listen through port 2436
app.listen(port, (err)=>{
    if(err) console.log(err);
    else console.log('Server is up')
});