import { Request , Response } from "express";
// import { validationResult } from "express-validator";
import GroupsTable from "../database/GroupSchema";
import { IGroup } from "../models/IGroup";
import mongoose from "mongoose";

/*
    @usage : Get all groups
    @method : GET
    @params : no-params
    @url : http://localhost:8800/groups/
 */

export const getAllGroups = async(request:Request , response:Response) => {
    try{
        let grops:IGroup[] | undefined = await GroupsTable.find();
        if(grops){
            return response.status(200).json(grops)
        }
    }catch(error:any){
        return response.status(500).json({msg:"Data not found"})
    }
}










