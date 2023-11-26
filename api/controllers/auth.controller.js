import User from '../models/user.model.js';
import bcrpytjs from 'bcryptjs';
const signup=async(req,res,next)=>{
   // console.log(req.body);
   const {username,email,password}=req.body;
   const hashedPassword=bcrpytjs.hashSync(password,10);
   const newUser=new User({username,email,password:hashedPassword});
  try{
   await newUser.save()
   res.status(201).json("User created successfully");
  }catch(error){
  //  res.status(500).json(error.message);
  next(error);
  }
}
// try{ 
// catch(error){
//    console.log("error in creating user")
//    res.status(500).json({
//       error:"Internal server"
//    })
// }
// }
export default signup;
