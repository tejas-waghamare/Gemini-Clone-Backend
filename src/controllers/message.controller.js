import Message from "../models/message.model.js";

export const createMessage = async (req, res) => {

    const { text, chatId, isGeminiResponse } = req.body;

    try {
        const message = await Message.create({ text, chatId, isGeminiResponse });

        if (!message) {
            res.status(400).json({
                status: 'error',
                message: "Unable to create new message"
            })
        }

        res.status(201).json({
            status: 'success',
            message: 'Message created',
            data: message
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}

export const getAllMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await Message.find({ chatId });
        if (!messages) {
            res.status(400).json({
                status: 'error',
                message: "Unable to fetch new message"
            })
        }

        res.status(200).json({
            status: 'success',
            message: "All messages",
            data: messages
        })
    } catch (error) {

    }
}