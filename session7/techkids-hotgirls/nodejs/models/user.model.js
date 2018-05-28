const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create user model:
//TODO: handle encryption for password
const UserSchema = new Schema({
    avatarUrl : {type: String, required:true},
    userName : {type: String, required:true},
    password : {type: String, required:true},
    active: {type: Boolean, default: true}
});

module.exports = mongoose.model('User', UserSchema);