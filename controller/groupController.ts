import { Request, Response } from "express";
// import { validationResult } from "express-validator";
import GroupsTable from "../database/GroupSchema";
import { IGroup } from "../models/IGroup";
import mongoose from "mongoose";

/*
    @usage : create a group
    @method : POST
    @params : name
    @url : http://localhost:8800/groups
 */
export const createGroup = async (request: Request, response: Response) => {
    let { name } = request.body;
    console.log("create group", name);
    let theGroup: IGroup | null | undefined = await new GroupsTable({
        name: name,
    }).save();
    if (theGroup) {
        return response.status(200).json({
            data: theGroup,
            msg: "Group is created",
        });
    }
};

/*
    @usage : Get all groups
    @method : GET
    @params : no-params
    @url : http://localhost:8800/groups
 */
export const getAllGroups = async (request: Request, response: Response) => {
    try {
        let groups: IGroup[] | undefined = await GroupsTable.find();
        if (groups) {
            return response.status(200).json(groups)
        }
    } catch (error: any) {
        return response.status(500).json({ msg: "Data not found" })
    }
}


/*
    @usage : to get a group by ID
    @method : GET
    @params : groupId
    @url : http://localhost:8800/groups/:groupId
*/
export const getGroup = async (request: Request, response: Response) => {
    let { groupId } = request.params;
    const mongogroupID = new mongoose.Types.ObjectId(groupId);
    let theGroup: IGroup | undefined | null = await GroupsTable.findById(mongogroupID);
    if (!groupId) {
        return response.status(404).json({
            data: null,
            error: "NO Group is found",
        });
    }
    return response.status(200).json(theGroup);
}

/* 
    @usage : update group by ID
    @method : PUT
    @params : groupId
    @url : http://localhost:8800/groups/:groupId
*/
export const updateGroup = async (request: Request, response: Response) => {
    try {
        const { groupId } = request.params;
        const { name } = request.body;
        const mongouserId = new mongoose.Types.ObjectId(groupId);
        const theGroup: IGroup | undefined | null = await GroupsTable.findByIdAndUpdate(mongouserId, { name: name });
        if (theGroup) {
            return response.status(200).json({ msg: "Updated Succeessfuly" });
        } else {
            return response.status(400).json({ msg: "Error" });
        }
    } catch (error) {
        return response.status(500).json({ error: "Server Error" })
    }

}














