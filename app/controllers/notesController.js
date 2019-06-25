const express=require('express')
const Note=require('../models/note')
const {authenticateUser}=require('../middlewares/authentication')

module.exports.list=function(req,res){
    const {user}=req
    console.log(req.user)
    Note.find({
        user:user._id
    }) 
    .sort({createdAt:-1})
    .then((notes)=>{  
        res.json(notes)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.create=function(req,res){
    const {user}=req
    const body=req.body
    const note=new Note(body)
    note.user=user._id
    note.save()
    .then((note)=>{
        res.json(note)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.show=(req,res)=>{
    const {user}=req
    const id=req.params.id
    Note.findOne({
        _id:id,
        user:req.user._id
    }).populate('category').populate('tags.tag',['name'])
    .then((note)=>{
            if(!note){
                res.json({})
            }
            res.json(note)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Note.findOneAndUpdate({
        _id:id, 
        user:req.user._id},
        {$set:body},
        {new:true, 
        runValidators:true})
    .then((note)=>{
        if(!note){
            res.json({})
        }
        res.json(note)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.destroy=(req,res)=>{
    const id=req.params.id
    console.log(id)
    Note.findOneAndDelete({
        _id:id,
        user:req.user._id
    })
    .then((note)=>{
        if(!note){
            res.json({})
        }
        res.json(note)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.removeTag=(req,res)=>{
   
    const id=req.query.noteId
    console.log(id)
    const tagId=req.query.tagId
    Note.findById(id)
    .then(note=>{
        note.tags.id(tagId).remove()
        note.save()
        .then(note=>{
            res.json(note)
        })
    })

    Note.findOneAndUpdate({_id:id},{
        $pull:{tags:{_id:tagId}}
    },{new:true})
    .populate('category').populate('tags.tag',['name'])
    .then(note=>{
        res.json(note)
    })
}