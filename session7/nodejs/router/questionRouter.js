//mini app.js with '/question' path

//external
const express = require('express');

//internal
const QuestionModel = require('../models/question.model');

let Router = express.Router();

//Middleware:
Router.use( function(req, res, next){
    //get all questions && put it in an object(req.questionList)
    QuestionModel.find( {}, function(err, questions){
        if(err) console.log(err)
        else {
            req.questionList = questions;
            next();
        }
    });
} );
//http methods
Router.get('/:id', (req, res)=>{
    //check votes or send a newQuestion
    let questionId = req.params.id;
    QuestionModel.findById(questionId, (err, question)=>{
        if(err) console.log(err)
        else{
            res.render('question', {
                question: question,
                totalVote: question.yes + question.no
            });
        }
    });
});

Router.get('/:id/:vote', (req, res)=>{
    //when user press a vote btn (yes or no)
    let questionId = req.params.id;
    let vote = req.params.vote;

    QuestionModel.findById(questionId, (err, question)=>{
        if(err) console.log(err)
        else{
            question[vote] += 1;
            //save question to models
            question.save( (err)=>{
                if(err) console.log(`error at saving question: ${err}`);
            });

            //redirect to question.hdb to see votes
            res.redirect(`/question/${questionId}`);
        }
    });
});

module.exports = Router;