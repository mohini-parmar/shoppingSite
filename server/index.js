import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDB } from "./config/db.js";
import allRouters from './routes/routers.js'

//importing constants from env file
const databaseURL = process.env.DB_URL;
const port = process.env.PORT


const app = express();

app.use(express.json());
app.use('/api',allRouters);

//connecting database
connectDB(databaseURL)

//listening to server
app.listen(port , ()=>{
    console.log(`server listening at ${port}`);
})