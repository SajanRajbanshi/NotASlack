
const mongoose=require("mongoose");

mongoose.connect(process.env.MONGODB || "mongodb+srv://sasararasajanpersonal:papjpmmw@cluster.cz96uup.mongodb.net/slack");

const db=mongoose.connection

db.on("open",()=>{console.log("connected")})
db.on('error', console.error.bind(console, 'connection error:'));

module.exports=db;