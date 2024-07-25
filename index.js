var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost:27017/mydb")
var db=mongoose.connection
db.on('error',()=>console.log("Error in connecting to db"))
db.once('open',()=>console.log("Connected to db"))



app.post("/sign_up",(req,res)=>{
   var name=req.body.name
   var age=req.body.age
   var email=req.body.email
   var phno=req.body.phno
   var gender=req.body.gender
   var password=req.body.password

   var data={
        "name":name,
        "age":age,
        "email":email,
        "phno":phno,
        "gender":gender,
        "password":password
   }
   db.collection("users").insertOne(data,(err,collection)=>{
       if(err)
       {
           throw err;
       }
       console.log("Record inserted Sucessfully")
   })
   return res.redirect("signup_success.html")
})

app.get("/",(req,res)=>{
    res.set({"allow-access-allow-origin":'*'})
    return res.redirect("index.html")
}).listen(5000);

console.log("Server is running on port 5000")