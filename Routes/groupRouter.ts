import {Request , Response , Router} from 'express';
import * as groupController from '../controller/groupController';
// import * as UserController from '../controller/userController';

const groupRouter:Router = Router();

/*
    @usage : Get all groups
    @method : GET
    @params : no-params
    @url : http://localhost:8800/groups/
 */

groupRouter.get("/",async(request:Request , response:Response) => {
    await groupController.getAllGroups(request,response)
})

export default groupRouter;
