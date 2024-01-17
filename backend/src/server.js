import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
// cors package helps to render the backend and frontend differently.
import foodRouter from "./routers/food.router.js";
// since in te=he package.json file we've mentioned type as module we need to import user defined file as .js as well unlike the predefined ex express which is imported as just name
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';

import {dbconnect} from './config/database.config.js';
dbconnect();

const app = express();
app.use(express.json());
// becz in case of users routers we r sending data as json object so we need to tell the app to use json

// and we know currently port 3000 is hosting the react app and to use express app on the same port we need to use the cors package
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", // this means the call from frontend will be from this url(origin)
  })
);

app.use("/api/foods", foodRouter);
app.use('/api/users',userRouter);
app.use('/api/orders',orderRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
