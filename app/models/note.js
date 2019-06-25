const mongoose=require('mongoose')
const Tag=require('./tag')
// const User=require('./User')
//Schema - Object constructor Function

const Schema=mongoose.Schema

const NoteSchema=new Schema({
    //field:{configuration}
    title:{
        type:String,
        required:true
    },
    body:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'  
    },
    tags:[{
        tag:{
            type:Schema.Types.ObjectId,
            ref:'Tag'
        }
    }],
    isPinned:{
        type:Boolean,
        default:false
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }
})

//mongoose middleware-es5 version to bind= {const note=this} its refers to document

NoteSchema.post('save',function(next){
    const note=this
    note.tags.forEach(function(tagItem){
        Tag.findById(tagItem.tag)
        .then(tag=>{
            tag.notes.push({note:note._id})
            tag.save()
        })
        .then(function(){
            next()
        })
    })  
})

//model based on the schema

const Note=mongoose.model('Note',NoteSchema) //ocf

module.exports=Note 