import express from 'express';
import 'dotenv/config'
import dbConnect from './src/config/dbConnect.js'
import bodyParser from "body-parser";
import verifyUser from './src/middlewares/user.middleware.js';
import authRouter from './src/routes/auth.route.js';
import chatRouter from './src/routes/chat.route.js';
import messageRouter from './src/routes/message.route.js';
import cors from 'cors'

dbConnect();

const app = express();
app.use(bodyParser.json());

app.use(cors())

app.use("/api/v1/auth", authRouter);
app.use(verifyUser)
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);

const port = process.env.PORT || FRONTEND_URL;
app.listen(port, () => console.log("❄️  Server started on port " + port));

