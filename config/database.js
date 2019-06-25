const mongoose=require('mongoose')

mongoose.Promise = global.Promise
// const path="mongodb://localhost:27017/notes-app"

const connection_uri = process.env.MONGODB_URI || "mongodb+srv://Gokul:#gokul888@cluster0-oylve.mongodb.net/test?retryWrites=true&w=majority"
	mongoose
    .connect(connection_uri, {
      useNewUrlParser: true
    })
    .then(() => {
      console.log("db connected succefully");
    })
    .catch(err => {
      console.log("Error connecting to DB", err);
    });


module.exports={mongoose}

