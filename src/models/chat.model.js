import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    userId:{
        type: String,
        require: true
    }
}, {timestamps: true});

const Chat = mongoose.model('chat', chatSchema);
export default Chat;