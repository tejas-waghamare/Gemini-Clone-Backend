import express from 'express'
import { createChat, deleteChat, getChats } from '../controllers/chat.controller.js'
const chatRouter = express.Router()

chatRouter.get('/get-chats', getChats)
chatRouter.post('/create-chat', createChat)
chatRouter.delete('/delete-chat/:chatId', deleteChat)

export default chatRouter


