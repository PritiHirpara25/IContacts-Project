import UserTable from '../database/userSchema'
import { Request, Response } from 'express'
import mongoose from 'mongoose';
import { IUser } from '../models/IUser';
import { error, group } from 'console';


/*
    @usage : create a user
    @method : POST
    @params : no-params
    @url : http://localhost:8800/user
*/
export const createUser = async (request: Request, response: Response) => {
    let userBody = request.body;
    console.log("userBody", userBody);
    try {
        let user: any = new UserTable(userBody);
        let userData = await user.save();
        if (userData) {
            return response.json({ data: userData });
        }
        else {
            return response.status(400).send("Not Found");
        }
    }
    catch (err) {
        response.status(400).send("Somthing Went Wrong");
    }
}


/*
    @usage : get all user
    @method : GET
    @params : no-params
    @url : http://localhost:8800/user
*/
export const readUser = async (request: Request, response: Response) => {
    try {
        let userData = await UserTable.find();
        if (userData.length === 0) {
            return response.json({ msg: "userData not found" })
        } else {
            return response.json({
                data: userData
            })
        }
    } catch (err) {
        return response.status(400).json({
            msg: "something went wrong"
        })
    }
}


/*
    @usage : Get a user by ID
    @method : GET
    @params : userId
    @url : http://localhost:8800/user:userId
 */
export const getuserbyId = async (request:Request , response:Response) => {
    let {userId} = request.params;
    const mongouserID = new mongoose.Types.ObjectId(userId)
    let theUser : IUser | undefined | null = await UserTable.findById(mongouserID);
    if(!userId){
        return response.status(404).json({
            data:null,
            error:"No User is found"
        });
    }
    return response.status(200).json(theUser)
}


/*
    @usage :update user by Id
    @method : PUT
    @params : userId
    @url : http://localhost:8800/user:userId
*/
export const updateUser = async (request:Request , response:Response) => {
    let {userId} = request.params;
    let updateUser = request.body;
    try{
        const mongouserID = new mongoose.Types.ObjectId(userId);
        let theUser:IUser | undefined | null = await UserTable.findByIdAndUpdate(mongouserID , updateUser)
        if(theUser){
            return response.status(200).json({
                msg : "User updated Successfully",
                data:updateUser
            })
        }
        else{
            return response.status(404).json({
                data:null,
                error:"User not found"
            })
        }
    }
    catch(error){
        return response.status(500).json({
            msg:"Data not found"
        })
    }
}


/*
    @usage : delete user
    @method : DELETE
    @params : userId
    @url : http://localhost:8800/user:userId
 */
export const deleteUser = async (request:Request , response:Response) => {
    let {userId} = request.params;
    try{
        const mongouserID = new mongoose.Types.ObjectId(userId);
        let theUser:IUser | undefined | null = await UserTable.findByIdAndDelete(mongouserID)
        if(theUser){
            return response.status(200).json({
                msg : "User Deleted Successfully"
            })
        }
        else{
            return response.status(404).json({
                data:null,
                error:"User not found"
            })
        }
    }
    catch(error){
        return response.status(500).json({
            msg:"Data not found"
        })
    }
}