const mongoose=require("mongoose");
const validator=require("validator");

const animeSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        unique:[true,"Anime already exist"]
    },
    ratings:{
        type:Number,
        required:true
    },
    genre:{
        type:String,
        required:true,
        minlength:3
    },
    episodes:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});


// Now we will create a collection in the database
const anime= new mongoose.model("Anime",animeSchema);
module.exports=anime;