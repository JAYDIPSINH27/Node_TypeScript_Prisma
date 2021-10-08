import express,{Request,Response} from 'express';
const { exec } = require('child_process');
require('dotenv').config();
import {PrismaClient} from '@prisma/client';
import execa from 'execa';

const PORT=process.env.PORT||3000
const DB=process.env.DB
const app=express()
app.use(express.json())

const prisma=new PrismaClient();

app.get("/db-create",async (req:Request,res:Response)=>{

    // try {
    //     const result=prisma.$executeRaw`CREATE DATABASE IF NOT EXISTS dbUniversity`
    //     console.log("Database Created Successfully!");
    //     res.send("<h1>Database Connected and Created Successfully</h1>")  
        
    // } catch (error) {
    //     console.log(error); 
    //     res.send("<h1>Database Not Connected Successfully</h1>")  
    // }

    try {
         prisma.$connect()
        console.log("Database Connected Successfully!");
        res.send("<h1>Database Connected and Created Successfully</h1>") 

    } catch (error) {
        console.log(error); 
        res.send("<h1>Database Not Connected Successfully</h1>")   
    }

})

app.get("/db-create-table",async (req:Request,res:Response)=>{
    try {
        
       const tb= await execa.command(`prisma migrate dev --preview-feature`)
        console.log("Table and Migration Folder Created");
        res.send(tb);
        
        
    } catch (error) {
        console.log(error); 
        res.send("<h1>Database Not Connected Successfully</h1>")   
    }
    
})

//Crud using Prisma
//Insert data
app.get("/db-insert",async (req:Request,res:Response)=>{
    const data=[{fname:"Jaydipsinh",lname:"Padhiyar",email:"jaydipsinh@mail.com",phoneNo:"123456789"},
                {fname:"Virat",lname:"Kohli",email:"virat@mail.com",phoneNo:"123456789"},
                {fname:"Rohit",lname:"Sharma",email:"rohit@mail.com",phoneNo:"123456789"},
                {fname:"Mahendrasinh",lname:"Dhoni",email:"msd@mail.com",phoneNo:"123456789"},
                {fname:"Ravindrasinh",lname:"Jadeja",email:"jaddu@mail.com",phoneNo:"123456789"}]

    try {
        const user=await prisma.tblRegistration.createMany({
            data:data,
        });
    
        res.json(user);
        
    } catch (error) {
        console.log(error);
        res.send("Error Occured")
        
    }

    

});

//Display data
app.get("/db-display",async (req:Request,res:Response)=>{

  

    try {
        const students= await prisma.tblRegistration.findMany();
        res.json(students);
        
    } catch (error) {
        console.log(error);
        res.send("Error Occured")
        
    }

});

//Update data use put
app.get("/db-update",async (req:Request,res:Response)=>{
    
   

    try {
        const updatedUser=await prisma.tblRegistration.update({
            where:{
                id:4
            },
            data:{
                fname:"Amrendra"
            }
        });
    
        res.json(updatedUser)
        
    } catch (error) {
        console.log(error);
        res.send("Error Occured")
        
    }
});

// Delete data use delete

app.get("/db-delete/:id",async (req:Request,res:Response)=>{

    const id=req.params.id

    try {
        const deletedUser= await prisma.tblRegistration.delete({
            where:{
                id:Number(id),
            },
        });
    
        res.json(deletedUser)
        
    } catch (error) {
        console.log(error);
        res.send("Error Occured")
        
    }

});

app.listen(PORT,()=>{
   console.log(`Server is running on Port ${PORT}`); 
})