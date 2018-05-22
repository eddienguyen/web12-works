//create model for mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create question schema:
const QuestionSchema = new Schema({
    content: {type: String, required: true},
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0}
});

//export model for use later:
module.exports = mongoose.model('Question', QuestionSchema);