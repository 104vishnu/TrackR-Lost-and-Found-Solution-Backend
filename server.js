import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import authRoute from "./routes/auth.route.js";
import itemRoute from "./routes/item.route.js";
import lostItemsRoute from "./routes/lostItems.route.js";
import foundItemsRoute from "./routes/foundItems.route.js";
import myItemsRoute from "./routes/myItems.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async()=>{
  
    try {

        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb");
        
    } catch (error) {

        console.log("not connected to mongoDB");
        console.log(error);
    
    }
};

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));


app.use(express.json({limit: "16kb"}));

app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.use(express.static("public"));

app.use(cookieParser());

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/postitem',itemRoute);
app.use('/api/v1/lostitems',lostItemsRoute);
app.use('/api/v1/founditems',foundItemsRoute);
app.use('/api/v1/myitems',myItemsRoute);

app.listen(process.env.PORT || 8000, () => {
    connect();
    console.log("Backend server is running!");
  });
