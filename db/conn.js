import mongoose from "mongoose"
import { config } from 'dotenv';
config();
const DB=process.env.DATABASE;

mongoose.connect(DB).then(()=>console.log("connection is successfully done")).catch((error)=>console.log("error hai" + error.message))