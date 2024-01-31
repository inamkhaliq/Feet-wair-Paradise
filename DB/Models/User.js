const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        // required:true,
        // unique:true,
    },
    Email:{
        type:String,
        // required:true,
        // unique:true,
    },
    Password:{
        type:String,
        // required:true,
    },
    StreetAddress:{
        type:String,
    },
    City:{
        type:String,
    },
    State:{
        type:String
    },
    Country:{
        type:String,
    },
    Zip:{
        type:String,
    }
})


const User=mongoose.model("User",UserSchema)



module.exports = {User};