// 119
const express = require("express");
const router = express.Router();
const Conversation = require("../models/conversationModel.js");

// 121
// create conversation between two users
router.post("/", async (request, response) => {
    const newConversation = new Conversation({
        members: [request.body.senderId, request.body.receiverId]
    })
    try {
        const conversation = await newConversation.save();
        response.status(200).json(conversation);
    } catch (error) {
        response.status(500).json(error);
    }
})


// 122
// get conversation of a user 
router.get("/:id", async (request, response) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [request.params.id] }
        })
        response.status(200).json(conversation);
    } catch (error) {
        response.status(500).json(error);
    }
})

// 123
// get conversation between two users
router.get("/find/:firstuserId/:secondUserId", async (request, response) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [request.params.firstuserId, request.params.secondUserId] }
        })
        response.status(200).json(conversation);
    } catch (error) {
        response.status(500).json(error);
    }
})


// 120
module.exports = router;