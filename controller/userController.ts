import UserTable from '../database/userSchema'
import { Request, Response } from 'express'
import mongoose from 'mongoose';
import { IUser } from '../models/IUser';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import gravatar from 'gravatar';
import { error, group } from 'console';
import { validationResult } from 'express-validator';


/*
    @usage : regitster a user
    @method : POST
    @params : no-params
    @url : http://localhost:8800/users/register
*/
export const registerUser = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        // read the form data
        let { username, email, password } = request.body;
        // check if the user is exists
        const userObj = await UserTable.findOne({ email: email });
        if (userObj) {
            return response.status(400).json({
                error: "The user is already exists"
            })
        }

        // password encryption
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        // gravatar
        const imageUrl = gravatar.url(email, {
            size: "200",
            rating: "pg",
            default: "mm"
        });


        // insert to db
        const newUser: IUser = {
            username: username,
            email: email,
            password: hashPassword,
            imageUrl: imageUrl,
            isAdmin: false
        }

        const theUserObj = await new UserTable(newUser).save();
        if (theUserObj) {
            return response.status(200).json({
                data: theUserObj,
                msg: "Registration is success!"
            });
        }

    } catch (error: any) {
        return response.status(500).json({
            error: error.message
        });
    }
}

/*
    @usage : login a user
    @method : POST
    @params : no-params
    @url : http://localhost:8800/users/login
*/
export const loginUser = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        // read the form data
        let { email, password } = request.body;
        // check if the user is exists
        const userObj = await UserTable.findOne({ email: email });
        if (!userObj) {
            return response.status(400).json({
                error: "The user is already exists"
            })
        }

        // check for password
        let isMatch: boolean = await bcryptjs.compare(password, userObj.password);
        if (!isMatch) {
            return response.status(500).json({
                error: "Invalid Password"
            });
        }

        // create a token
        const secretKey: string | undefined = process.env.JWT_SECRET_KEY;
        const payload: any = {
            user: {
                id: userObj._id,
                email: userObj.email
            }
        };
        if (secretKey && payload) {
            jwt.sign(payload, secretKey, {
                expiresIn: 100000000000
            }, (error, encoded) => {
                if (error) throw error;
                if (encoded) {
                    return response.status(200).json({
                        data: userObj,
                        token: encoded,
                        msg: "Login is Success!"
                    })
                }
            }
            )
        }

    } catch (error: any) {
        return response.status(500).json({
            error: error.message
        });
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
export const getuserbyId = async (request: Request, response: Response) => {
    let { userId } = request.params;
    const mongouserID = new mongoose.Types.ObjectId(userId)
    let theUser: IUser | undefined | null = await UserTable.findById(mongouserID);
    if (!userId) {
        return response.status(404).json({
            data: null,
            error: "No User is found"
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
export const updateUser = async (request: Request, response: Response) => {
    let { userId } = request.params;
    let updateUser = request.body;
    try {
        const mongouserID = new mongoose.Types.ObjectId(userId);
        let theUser: IUser | undefined | null = await UserTable.findByIdAndUpdate(mongouserID, updateUser)
        if (theUser) {
            return response.status(200).json({
                msg: "User updated Successfully",
                data: updateUser
            })
        }
        else {
            return response.status(404).json({
                data: null,
                error: "User not found"
            })
        }
    }
    catch (error) {
        return response.status(500).json({
            msg: "Data not found"
        })
    }
}


/*
    @usage : delete user
    @method : DELETE
    @params : userId
    @url : http://localhost:8800/user:userId
 */
export const deleteUser = async (request: Request, response: Response) => {
    let { userId } = request.params;
    try {
        const mongouserID = new mongoose.Types.ObjectId(userId);
        let theUser: IUser | undefined | null = await UserTable.findByIdAndDelete(mongouserID)
        if (theUser) {
            return response.status(200).json({
                msg: "User Deleted Successfully"
            })
        }
        else {
            return response.status(404).json({
                data: null,
                error: "User not found"
            })
        }
    }
    catch (error) {
        return response.status(500).json({
            msg: "Data not found"
        })
    }
}