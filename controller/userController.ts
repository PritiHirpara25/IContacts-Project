import UserTable from '../database/userSchema'
import { Request, Response } from 'express'

// create user

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

// get all user 

/*
    @usage : create a contact
    @method : POST
    @params : no-params
    @url : http://localhost:8800/user
*/

export const readUser = async (request: Request, response: Response) => {
    try {
        console.log("hello ji")
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

// get all user by ID

// update method

export const updateUser = () => {

}

// delete method

export const deleteUser = async (request:Request , response:Response) => {
    let userId = request.body.userId;
    try{
        
    }
    catch{

    }
}