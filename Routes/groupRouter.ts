import { Request, Response, Router } from 'express';
import * as groupController from '../controller/groupController';
// import {body} from 'express-validator';

const groupRouter: Router = Router();

/*
    @usage : create a group
    @method : POST
    @params : name
    @url : http://localhost:8800/groups
*/
groupRouter.post("/",[
    // body('name').not().isEmpty().withMessage("Name is required")
], async (request: Request, response: Response) => {
    // console.log("post");
    await groupController.createGroup(request, response)
})

/*
    @usage : Get all groups
    @method : GET
    @params : no-params
    @url : http://localhost:8800/groups
*/
groupRouter.get("/", async (request: Request, response: Response) => {
    await groupController.getAllGroups(request, response)
})

/*
    @usage : to get a group
    @method : POST
    @params : name
    @url : http://localhost:8800/groups:groupId
*/
groupRouter.get("/:groupId", async (request: Request, response: Response) => {
    await groupController.getGroup(request, response)
})


/* 
    @usage : update group by ID
    @method : PUT
    @params : groupId
    @url : http://localhost:8800/groups/:groupId
*/
groupRouter.put('/:groupId',async(request:Request , response:Response) => {
    await groupController.updateGroup(request , response);
})



export default groupRouter;
