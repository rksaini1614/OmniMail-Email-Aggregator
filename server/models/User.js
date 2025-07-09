
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true,
        },
        lastName : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
            unique : true,
        },
        password : {
            type : String,
            required : true,
        },
        createdAt : {
            type : Date,
            default : Date.now,
        },
        // emailAccounts: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'EmailAccount'
        // }],
        profile_image:{
            type: String,
            required : true,
        },
        token: {
            type: String,
            default: null
        },
    }
);


const User = mongoose.model('User', userSchema);
module.exports = User;