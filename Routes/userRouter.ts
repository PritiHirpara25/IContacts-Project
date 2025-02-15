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