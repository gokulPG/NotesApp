const express=require('express')
const cors=require('cors')
const app=express()

const path = require("path");
const port = process.env.PORT || 3001  
//it loooks into the heroku's envirnoment variable for the port number
//port value can be set in the server by: heroku config:set port 3001 

const {mongoose}=require('./config/database')

// 1st appoach
const router=require('./config/route')
//2nd approach
const categoriesRouter=require('./app/controllers/categoriesController')
const tagRouter=require('./app/controllers/tagController')
const {usersRouter}=require('./app/controllers/usersController')

app.get('/', (req,res)=>{
    res.send('welcome to my note taking app')
})

app.use(express.json())
app.use(cors())   
app.use('/', router)
app.use('/users', usersRouter)
app.use('/tags',tagRouter) //1st approach map here
app.use('/categories',categoriesRouter) //2nd approach map up here
app.use('/categories/:id',categoriesRouter)

app.use(express.static(path.join(__dirname,"notes-react-app/build")))
app.get("*",(req,res)=>{
	res.sendFile(path.join(__dirname + "/notes-react-app/build/index.html"))
})

app.listen(port,()=>{
    console.log('listening to port',port)
})
