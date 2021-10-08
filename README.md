# Node_TypeScript_Prisma
I have learned basics of Prisma ORM with TypeScript and MySQL

19CE081AWTCE377

**Practical-9**


**Aim: Use any one ORM from Sequelize ORM, TypeORM and Prisma ORM and implement following task.**

1. **Create Connection**
1. **Create Database**
1. **Create Table**
1. **Insert Record**
1. **Display Record**
1. **Association (any two)-> only for those who use Sequelize ORM**

**ORM: -** Prisma ORM with Typescript


CSPIT(CE)		 PAGE   \\* MERGEFORMAT 12

**File- Structure: -**

` `**.env:-**

**

**Code:-**

1. index.ts

import express,{Request,Response} from 'express';

const { exec } = require('child\_process');

require('dotenv').config();

import {PrismaClient} from '@prisma/client';

import execa from 'execa';

const PORT=process.env.PORT||3000

const DB=process.env.DB

const app=express()

app.use(express.json())

const prisma=new PrismaClient();

app.get("/db-create",async (req:Request,res:Response)=>{

`    `// try {

`    `//     const result=prisma.$executeRaw`CREATE DATABASE IF NOT EXISTS dbUniversity`

`    `//     console.log("Database Created Successfully!");

`    `//     res.send("<h1>Database Connected and Created Successfully</h1>")  



`    `// } catch (error) {

`    `//     console.log(error); 

`    `//     res.send("<h1>Database Not Connected Successfully</h1>")  

`    `// }

`    `try {

`         `prisma.$connect()

`        `console.log("Database Connected Successfully!");

`        `res.send("<h1>Database Connected and Created Successfully</h1>") 

`    `} catch (error) {

`        `console.log(error); 

`        `res.send("<h1>Database Not Connected Successfully</h1>")   

`    `}

})

app.get("/db-create-table",async (req:Request,res:Response)=>{

`    `try {



`       `const tb= await execa.command(`prisma migrate dev --preview-feature`)

`        `console.log("Table and Migration Folder Created");

`        `res.send(tb);





`    `} catch (error) {

`        `console.log(error); 

`        `res.send("<h1>Database Not Connected Successfully</h1>")   

`    `}



})

//Crud using Prisma

//Insert data

app.get("/db-insert",async (req:Request,res:Response)=>{

`    `const data=[{fname:"Jaydipsinh",lname:"Padhiyar",email:"jaydipsinh@mail.com",phoneNo:"123456789"},

`                `{fname:"Virat",lname:"Kohli",email:"virat@mail.com",phoneNo:"123456789"},

`                `{fname:"Rohit",lname:"Sharma",email:"rohit@mail.com",phoneNo:"123456789"},

`                `{fname:"Mahendrasinh",lname:"Dhoni",email:"msd@mail.com",phoneNo:"123456789"},

`                `{fname:"Ravindrasinh",lname:"Jadeja",email:"jaddu@mail.com",phoneNo:"123456789"}]

`    `try {

`        `const user=await prisma.tblRegistration.createMany({

`            `data:data,

`        `});



`        `res.json(user);



`    `} catch (error) {

`        `console.log(error);

`        `res.send("Error Occured")



`    `}



});

//Display data

app.get("/db-display",async (req:Request,res:Response)=>{



`    `try {

`        `const students= await prisma.tblRegistration.findMany();

`        `res.json(students);



`    `} catch (error) {

`        `console.log(error);

`        `res.send("Error Occured")



`    `}

});

//Update data use put

app.get("/db-update",async (req:Request,res:Response)=>{





`    `try {

`        `const updatedUser=await prisma.tblRegistration.update({

`            `where:{

`                `id:4

`            `},

`            `data:{

`                `fname:"Amrendra"

`            `}

`        `});



`        `res.json(updatedUser)



`    `} catch (error) {

`        `console.log(error);

`        `res.send("Error Occured")



`    `}

});

// Delete data use delete

app.get("/db-delete/:id",async (req:Request,res:Response)=>{

`    `const id=req.params.id

`    `try {

`        `const deletedUser= await prisma.tblRegistration.delete({

`            `where:{

`                `id:Number(id),

`            `},

`        `});



`        `res.json(deletedUser)



`    `} catch (error) {

`        `console.log(error);

`        `res.send("Error Occured")



`    `}

});

app.listen(PORT,()=>{

`   `console.log(`Server is running on Port ${PORT}`); 

})

1. schema.prisma

// This is your Prisma schema file,

// learn more about it in the docs: https://pris.ly/d/prisma-schema

datasource db {

`  `provider = "mysql"

`  `url      = env("DATABASE\_URL")

}

generator client {

`  `provider = "prisma-client-js"

}

model tblRegistration{

`  `id Int @default(autoincrement()) @id

`  `fname String @db.VarChar(50)

`  `lname String @db.VarChar(50)

`  `email String @unique

`  `phoneNo String @db.VarChar(10)

}


1. .env

DATABASE\_URL="mysql://root:@localhost:3306/dbUniversity?schema=public"

DB=dbUniversity

PORT=5000



**Output:-**

1. Starting commands:

npm install prisma typescript ts-node @types/node --save-dev

npm install express @types/express nodemon execa

npx prisma

npx prisma init



1. localhost:5000/db-create:




1. localhost:5000/db-create-table:






1. localhost:5000/db-insert:




1. localhost:5000/db-display:



1. localhost:5000/db-update:



1. localhost:5000/db-delete/:id:



1. Database:



