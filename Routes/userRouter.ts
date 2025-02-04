import {Request , Response , Router} from 'express';
import * as UserController from '../controller/userController';

const userRouter:Router = Router();

// usage : 
// http://127.0.0.1:9999/api/users/home
// method : GET

userRouter.get("/",async(request:Request , response:Response) => {
    await UserController.getAllUsers(request,response)
})

export default userRouter;
