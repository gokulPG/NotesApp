const mongoose=require('mongoose')

mongoose.Promise = global.Promise
// const path="mongodb://localhost:27017/notes-app"

//it loooks into the heroku's envirnoment variable for the port number
//port value can be set in the server by: heroku config:set mongodb_uri {link} , link generated after the cluster connect in MONGOD 
const connection_uri = process.env.MONGODB_URI || "mongodb://localhost:27017/notes-app"
console.log(process.env.MONGODB_URI);
	mongoose.connect(connection_uri, {
      useNewUrlParser: true
    })
    .then(() => {
      console.log("db connected succefully");
    })
    .catch(err => {
      console.log("Error connecting to DB", err);
    });


module.exports={mongoose}

