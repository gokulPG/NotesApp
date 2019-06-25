const express=require('express')
const router=express.Router()
const {User}=require('../models/User') 
const _=require('lodash')
const {authenticateUser}=require('../middlewares/authentication')

//localhost:3000/users/register
router.post('/register',(req,res)=>{
    const body=req.body
    // console.log(body)
    // res.send('registeration')
    const user=new User(body)
    console.log(body)
    user.save()
    .then(user=> res.send(user))
    // console.log(user.isNew)
    .catch(err=> res.send(err))

})

//localhost:3000/users/login
router.post('/login',(req,res)=>{
    const body=req.body

    User.findByCredentials(body.email, body.password)
    .then((user)=>{
        return user.generateToken()
        // res.send(user)
    })
    .then((token)=>{
        console.log(token)
        res.send({token})
        res.send(_.pick(user,['_id','username','email','createdAt']))
    //    res.header('x-auth',token).send()
    })
    .catch((err)=>{
        res.send(err)
    })
})

//localhost:3000/users/account
router.get('/account',authenticateUser,(req,res)=>{
    const {user}=req
    res.send(user)
    // console.log(user)
    // User.find()
    // .then(user=>{
    //     console.log(user)
    //     res.send(user)  
    // })
    res.send(_.pick(user,['_id','username','email','createdAt']))       
})

//localhost:3000/users/logout

router.delete('/logout', authenticateUser,(req,res)=>{
    const {user,token}=req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
    .then(()=>{
        res.send({notice:"successfully logged out"})
    })
    .catch(err=>{
        res.send(err)
    })

})


module.exports={
    usersRouter:router
}
 