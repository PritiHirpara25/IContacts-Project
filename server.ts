import express, { Application, Request, Response } from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: "./.env" })

const hostName: string = '127.0.0.1';

const app: Application = express();

const port: number | string | undefined = process.env.PORT || 9999;
const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
const dbName: string | undefined = process.env.MONGO_DB_DATABASE;
app.use(express.json());

//configure the routers
import groupRouter from './Routes/groupRouter';
app.use("/groups", groupRouter);

if (port) {
    app.listen(Number(port), () => {
        if (dbUrl && dbName) {
            mongoose.connect(dbUrl, { dbName: dbName })
                .then((dbResponse) => {
                    console.log("Connection Established...");
                })
                .catch((error) => {
                    console.log(error);
                    process.exit(0);
                });
        }
        console.log(`Express Server is Started at ${port}`);
    });
}




