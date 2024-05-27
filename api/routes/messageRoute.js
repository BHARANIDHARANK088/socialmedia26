// 126
const express = require("express");
const router = express.Router();
const Message = require("../models/messageModel.js");

// 127
// add message
router.post("/", async (request, response) => {
    const newMessage = new Message(request.body);
    try {
        const message = await newMessage.save();
        response.status(200).json(message);
    } catch (error) {
        response.status(500).json(error);
    }
})


// 128
// get message
router.get("/:conversationId", async (request, response) => {
    try {
        const messages = await Message.find({
            conversationId: request.params.conversationId,
        });
        response.status(200).json(messages);
    } catch (error) {
        response.status(500).json(error);
    }
})


// 129
module.exports = router;