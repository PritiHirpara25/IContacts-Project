// import path from 'path';
// import { IUser } from '../models/IUser';

// const jsonfile = require('jsonfile')

// export class UserUtil {

//     private static usersJsonPath = path.join(__dirname, "..", "db", "users.json")

//     public static getAllUsersFromDB(): Promise<IUser[]> {
//         return new Promise((resolve, reject) => {
//             jsonfile.readFile(this.usersJsonPath, (err: any, data: any) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 else {
//                     resolve(data);
//                 }
//             })
//         })
//     }
// }
