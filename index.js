import  express  from "express";
import mysql from "mysql";
import cors from "cors";


const app=express()
app.use(express.json())
app.use(cors())

const db=mysql.createConnection({
    host:"Localhost",
    password:"",
    user:"root",
    database:"to_do_list"
})

app.get("/", (req,res)=>{
    res.json("API is LIVE!")
})



app.post("/signup",(req,res)=>{
    const q="insert into users_db (Username,Password) values (?)"
    const value=[
        req.body.Username=String(req.body.Username),
        req.body.Password=String(req.body.Password)    
    ]
    db.query(q,[value],(err,data)=>{
        if(err){
            return res.json(err)


        }
        else if(data){

            return res.json("User Added")
        }
    })
})







app.post("/signin",(req,res)=>{
    const q="select * from users_db where Username=? and Password=?"
    const value=[
        req.body.Username=String(req.body.Username),
        req.body.Password=String(req.body.Password)      
    ]
    db.query(q,[...value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            console.log(data)
            return res.json(data)
        }
    })
})



app.post("/addtask",(req,res)=>{
    const q="insert into tasks (UserID, Task, Status) values (?)"
    const value=[
        req.body.UserID=String(req.body.UserID),
        req.body.Task=String(req.body.Task),
        req.body.Status=String(req.body.Status),
    ]
    db.query(q,[value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json("Task Added")
        }
    })
})




app.post("/updatetask",(req,res)=>{
    const q="update tasks set Task=?, Status=? where UserID=? and TaskID=?"
    const value=[
        req.body.Task=String(req.body.Task),
        req.body.Status=String(req.body.Status),
        req.body.UserID=String(req.body.UserID),
        req.body.TaskID=String(req.body.TaskID),
    ]
    db.query(q,[...value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json("Task Updated")
        }
    })
})


app.post("/deletetask",(req,res)=>{
    const q="delete from tasks where UserID=? and TaskID=?"
    const value=[
        req.body.UserID=String(req.body.UserID),
        req.body.TaskID=String(req.body.TaskID),
    ]
    db.query(q,[...value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json("Task Deleted")
        }
    })
})


app.get("/tasks:UserID",(req,res)=>{
    const value=String(req.params.UserID)

    const q="select * from tasks where UserID=?"
    db.query(q,[value],(err,data)=>{
        if(err){
            return res.json(err)

        }
        else if(data){
            console.log(data)

            return res.json(data)
        }
    })
})






app.listen(8800,()=>{
    console.log("Port has been set to localhost:8800")
})