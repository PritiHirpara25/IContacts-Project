import { Request, Response, Router } from "express";
import * as userController from '../controller/userController'
import {body} from 'express-validator';

const userRouter: Router = Router();

/*
    @usage : register a contact
    @method : POST
    @params : no-params
    @url : http://localhost:8800/users/register
*/
userRouter.post('/register', [
    body('username').not().isEmpty().withMessage("Username is Required"),
    body('email').isEmail().withMessage("Proper Email is Required"),
    body('password').isStrongPassword().withMessage("String Password is Required")
],async (request: Request, response: Response) => {
    await userController.registerUser(request, response)
})


/*
    @usage : login a contact
    @method : POST
    @params : no-params
    @url : http://localhost:8800/users/login
*/
userRouter.post('/login', [
    body('email').isEmail().withMessage("Proper Email is Required"),
    body('password').isStrongPassword().withMessage("String Password is Required")
],async (request: Request, response: Response) => {
    await userController.loginUser(request, response)
})


/*
    @usage : get all contact
    @method : GET
    @params : no-params
    @url : http://localhost:8800/user
*/
userRouter.get('/', async (request: Request, response: Response) => {
    await userController.readUser(request, response)
})



/*
@usage : get a User by ID
@method : GET
@params: userId
@url : http://localhost:8800/user:userId
*/
userRouter.get('/:userId', async (request:Request , response:Response) => {
    await userController.getuserbyId(request , response)
})


/*
@usage : update User by ID
@method : PUT
@params: userId
@url : http://localhost:8800/user:userId
*/
userRouter.put('/:userId', async (request:Request , response:Response) => {
    await userController.updateUser(request , response)
})


/*
@usage : delete user
@method : DELETE
@params: no-params
@url : http://localhost:8800/user:userId
*/
userRouter.delete('/:userId', async (request:Request , response:Response) => {
    await userController.deleteUser(request , response)
})


export default userRouter;