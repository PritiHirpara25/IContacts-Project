import { Request , Response } from "express"
import mongoose from "mongoose";
import { IContact } from "../models/IContact";
import ContactTable from "../database/ContactSchema";

/*
    @usage : create contact
    @method : POST
    @params : no-params
    @url : http://localhost:8800/contact
*/  
export const createContact = async (request:Request , response:Response) => {
    let { user ,name , imageUrl , mobile , email , company , title , groupId } = request.body;
    let theContact: IContact | null | undefined = await new ContactTable({
        user : user,
        name : name,
        imageUrl : imageUrl , 
        mobile : mobile , 
        email : email ,
        company : company, 
        title:title , 
        groupId:groupId
    }).save();
    if(theContact){
        return response.status(200).json({
            data:theContact,
            msg:"Contact is created"
        });
    }
}


/*
    @usage : get All contact
    @method : GET
    @params : no-params
    @url : http://localhost:8800/contact
*/  
export const getallContact =async (request : Request , response: Response) => {
    try{
        let contact : IContact[] | undefined   = await ContactTable.find();
        if(contact){
            return response.status(200).json(contact)
        }
    }    
    catch(error:any){
        return response.status(500).json({
            msg:"Not Found"
        });
    }
}

/*
    @usage : get a contact by Id
    @method : GET
    @params : contactId
    @url : http://localhost:8800/contact:contactId
*/  
export const getContactbyId = async (request:Request , response:Response) => {
    let {contactId} = request.params;
    const mongocontactId = new mongoose.Types.ObjectId(contactId);
    let thecontact : IContact | undefined | null = await ContactTable.findById(mongocontactId);
    if(!contactId){
        return response.status(404).json({
            data:null,
            msg:"No Contact is Found"
        });
    }
    return response.status(200).json(thecontact);
}


/*
    @usage : update a contact by Id
    @method : PUT
    @params : contactId
    @url : http://localhost:8800/contact:contactId
*/  
export const updateContact = async (request:Request , response:Response) => {
    let {contactId} = request.params;
    let updateContact = request.body;
    const mongocontactId = new mongoose.Types.ObjectId(contactId);
    let thecontact : IContact | undefined | null = await ContactTable.findByIdAndUpdate(mongocontactId , updateContact);
    if(!thecontact){
        return response.status(404).json({
            data:null,
            msg:"No Contact is Found"
        });
    }
    return response.status(200).json({
        data:updateContact,
        msg:"contact updated successfully"
    });
}


/*
    @usage : delete a contact by Id
    @method : DELETE
    @params : contactId
    @url : http://localhost:8800/contact:contactId
*/  
export const deleteContact = async (request:Request , response:Response) => {
    let {contactId} = request.params;
    const mongocontactId = new mongoose.Types.ObjectId(contactId);
    let thecontact : IContact | undefined | null = await ContactTable.findByIdAndDelete(mongocontactId);
    if(!thecontact){
        return response.status(404).json({
            data:null,
            msg:"No Contact is Found"
        });
    }
    return response.status(200).json({
        data:updateContact,
        msg:"contact deleted successfully"
    });
}



