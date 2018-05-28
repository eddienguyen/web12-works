//create model girl for mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create commentSchema for GirlSchema
const CommentSchema = new Schema({
    createdBy : { type: String, required: true },
    content : { type: String, required: true }
});
//create girl schema:
//TODO: handle default birthday
const GirlSchema = new Schema({
    imageUrl : { type: String, required: true },
    name : {type: String, required: true},
    title : {type: String, default: ""},
    description : { type: String, default: "" },
    birthday : { type: Date, default: Date.now } ,
    createdBy : { type: String, required: true },
    view : { type: Number, default: 0 },
    like : { type: Number, default: 0 },
    active : { type: Boolean, default: true },
    comment : { type: [CommentSchema], default: [] }
});


module.exports = mongoose.model('Girl', GirlSchema);