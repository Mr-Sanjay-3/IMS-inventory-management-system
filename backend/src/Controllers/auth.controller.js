import Users from '../models/Users.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// import express from 'express'

//Login 
dotenv.config()
export const  login = async (req, res)=>{

    try {
      console.log("REQ BODY:", req.body); 
      
      // const { email , password} =req.body
      const email = req.body.email?.toLowerCase().trim();
      const password = req.body.password;
      
      if (! email || !password) {
      return res.status(400).json({msg: "All fileds required "});
      }

      const user = await  Users.findOne({ email });

      if (! user || !user.isActive) {
       return res.status(401).json({msg:"Invalid Credentials"})
      }
      console.log(user)

        const IsMatch = await bcrypt.compare(password, user.password);
        console.log("PASSWORD MATCH RESULT:", IsMatch);

        if (!IsMatch) {
         return res.status(401).json({msg: "Invalid Credentials"})
        }
  
         const token = jwt.sign(
            {id: user._id , role: user.role},
            process.env.JWT_CRIDTE,
            { expiresIn: "1d" }
         );
       return  res.status(200).json({
            token,
          
                user: {
                    id: user._id,
                    name: user.name,
                    role: user.role,
              

        },
      });
     } catch (error){
res.status(500).send({msg:"Server Error"})
     }
};

//Register (ADMIN ONLY :)....NOVA...)

export const register = async (req, res)=>{
    try{
   const {name, email, password, role} = req.body;

   const existing = await Users.findOne({email});

   if (existing) {
   return res.status(400).send({msg: "User alredy exists"});
   }
   const  hashedPassword = await bcrypt.hash(password, 10);
  //  consol.log (hashedPassword);


   const User = await Users.create({
    name,
    email,
    password: hashedPassword,
    role,
   });

   res.status(201).json({
    msg: "User created",
    User : {
        id: User.id,
        name: User.name,
        role: User.role,
    },
   });
    }catch(error){
      res.status(500).json({msg: "Internal Server Error"})
    }
};



