const express=require('express')
const router=express.Router()
const Tag=require('../models/tag')

router.get('/',(req,res)=>{
    Tag.find()
    .then(tags=>res.json(tags))
    .catch(err=> res.json(err))
})

router.post('/',(req,res)=>{ 
    const body=req.body
    const tag=new Tag(body)
    tag.save()
    .then(tag=> res.json(tag))
    .catch(err=> res.json(err))
})
router.get('/:id',(req,res)=>{
    const id=req.params.id
    Tag.findById(id).populate('notes.note',['title', 'body'])
    .then(tag=> res.json(tag))
    .catch(err=> res.json(err))
})
router.put('/:id',(req,res)=>{
    const id=req.params.id
    const body=req.body
    Tag.findByIdAndUpdate(id,body,{new:true})
    .then(tag=> res.json(tag))
    .catch(err=> res.json(err))
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id
    Tag.findByIdAndDelete(id)
    .then(tag=> res.json(tag))
    .catch(err=> res.json(err))
})

module.exports=router