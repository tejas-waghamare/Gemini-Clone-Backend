import mongoose from "mongoose";
import Chat from "./chat.model.js";

const messageSchema = new mongoose.Schema({
    text:{
        type: String,
        require: true
    },
    chatId:{
        type: String,
        require: true
    },
    isGeminiResponse:{
        type:Boolean,
        require:true
    }
}, {timestamps: true});

const Message = mongoose.model('message', messageSchema);
export default Message;