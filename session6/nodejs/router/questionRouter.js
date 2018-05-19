const express = require('express');
const fs = require('fs');

const QuestionModel = require('../models/question.model');

let Router = express.Router();

module.exports = Router;


Router.get('/:id/:vote', (req,res)=>{

    let questionId = req.params.id;
    let vote = req.params.vote;
    
    QuestionModel.findById(questionId, (err, question)=>{
        if(err) console.log(err)
        else{
            question[vote] += 1;
            question.save((err)=>{
                if(err) console.log(err)
            })
            res.redirect(`/question/${question._id}`);
        }
    })

})

//show question
Router.get('/:id', (req, res)=>{
    
    if(req.params.id === 'null') res.render('question', {question: null});
    else {
        let requestQuestionId = req.params.id;
        //find question with requested id in model
        QuestionModel.findById(requestQuestionId, (err, question)=>{
            if(err) console.log(err)
            else {
                res.render('question', {
                    question : question,
                    totalVote : question.yes + question.no
                });
            }
        })
        
        
    } 
    
});


