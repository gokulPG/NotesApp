    
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const TagSchema=new Schema({
    name:{
        type:String
    },
    notes:[{
        note:{
            type:Schema.Types.ObjectId,
            ref:'Note'
        }
    }]
})

const Tag=mongoose.model('Tag', TagSchema)

module.exports=Tag