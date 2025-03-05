import { Router  , Request , Response} from "express";
import * as contactController from '../controller/contactController'


const contactRouter:Router = Router();

/*
    @usage : create contact
    @method : POST
    @params : no-params
    @url : http://localhost:8800/contact
*/  
contactRouter.post('/',async (request:Request , response:Response) => {
    await contactController.createContact(request , response)
})


/*
    @usage : get All contact
    @method : GET
    @params : no-params
    @url : http://localhost:8800/contact
*/  
contactRouter.get('/',async (request:Request , response:Response) => {
    await contactController.getallContact(request , response)
})


/*
    @usage : get a contact by Id
    @method : GET
    @params : contactId
    @url : http://localhost:8800/contact:contactId
*/  
contactRouter.get('/:contactId',async (request:Request , response:Response) => {
    await contactController.getContactbyId(request , response)
})


/*
    @usage : update a contact by Id
    @method : PUT
    @params : contactId
    @url : http://localhost:8800/contact:contactId
*/ 
contactRouter.put('/:contactId',async(request:Request , response:Response) => {
    await contactController.updateContact(request , response)
})


/*
    @usage : delete a contact by Id
    @method : DELETE
    @params : contactId
    @url : http://localhost:8800/contact:contactId
*/  
contactRouter.delete('/:contactId',async(request:Request , response:Response) => {
    await contactController.deleteContact(request , response)
})

export default contactRouter