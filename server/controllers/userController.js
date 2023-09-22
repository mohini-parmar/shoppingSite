import { genSalt } from "bcrypt";
import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController{
    static userRegister = async (req, res) => {
        const {name , email , password , confirm_pass , role} = req.body;
        const user = await UserModel.findOne({email : email})
    
        if(user){
            res.status(400).send({"status":"failed","message":"Email already exists."});
        }else{
            if(name && email && password && confirm_pass && role){
                if(password === confirm_pass){
                    try{
                        const salt = await genSalt(8);
                        const hashedPwd = await bcrypt.hash(password,salt);
                        const doc = new UserModel({
                            name : name,
                            email : email,
                            password : hashedPwd,
                            role : role
                        })
                        await doc.save();
                        console.log("docccccc : "+doc);
                        res.status(200).send({"status":"Success","message":"User registered Successfully."});
                    }catch(err){
                        res.status(400).send({"status":"failed","message":"Failed to register."});
                    }
                }else{
                    res.status(400).send({"status":"failed","message":"Password & Confirm Password does not match."});
                }
            }else{
                res.status(400).send({"status":"failed","message":"All fields are required."});
            }
        }
    }
    
    static userLogin = async (req, res) => {
        try{
            const {email , password} = req.body;
            if(email && password){
                const user = await UserModel.findOne({email : email});
                if(user != null){
                    const isMatch = await bcrypt.compareSync(password , user.password);
                    if(user.email == email && isMatch){
                        const jwtToken = jwt.sign({userId : user._id},process.env.JWT_SECRET_KEY ,{expiresIn : '3d'})
                        res.status(200).send({"status":"success","message":"Logged in Successfully.","token":jwtToken});
                    }else{
                        res.status(400).send({"status":"failed","message":"Email or password does not match."});
                    }
                }else{
                    res.status(400).send({"status":"failed","message":"User Not Found."});
                }
            }else{
                res.status(400).send({"status":"failed","message":"All fields are required."});
            }
    
        }catch(err){
            console.log(err)
        }
    }
}

export default UserController;
