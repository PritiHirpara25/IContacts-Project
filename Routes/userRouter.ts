import { Request, Response, Router } from "express";
import * as userController from '../controller/userController'
// import {}

const userRouter: Router = Router();

/*
    @usage : create a contact
    @method : POST
    @params : no-params
    @url : http://localhost:8800/user
*/

userRouter.post('/', async (request: Request, response: Response) => {
    await userController.createUser(request, response)
})


/*
    @usage : create a contact
    @method : GET
    @params : no-params
    @url : http://localhost:8800/user
*/

userRouter.get('/', async (request: Request, response: Response) => {
    await userController.readUser(request, response)
})

export default userRouter;