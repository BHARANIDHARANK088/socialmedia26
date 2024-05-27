const express = require("express");
const router = express.Router();
const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");

// create a post
router.post("/", async (request, response) => {
    const newPost = new Post(request.body);
    try {
      const post = await newPost.save();
      response.status(200).json(post);
    } catch (error) {
      response.status(500).json(error);
    }
});

// update a post
router.put("/:id", async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if ( post.userId === request.body.userId )
        {
          await post.updateOne({ $set: request.body });
          response.status(200).json("Post has been updated");
        }
        else
        {
          response.status(403).json("You can update only your post");
        }
    } catch (error) {
      response.status(500).json(error);
    }
});

// delete a post
router.delete("/:id", async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if ( post.userId === request.body.userId )
        {
          await post.deleteOne();
          response.status(200).json("Post has been deleted");
        }
        else
        {
          response.status(403).json("You can delete only your post");
        }
    } catch (error) {
      response.status(500).json(error);
    }
});

// like or dislike a post
router.put("/:id/like", async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if ( !post.likes.includes(request.body.userId) )
        {
            // like post
            await post.updateOne({ $push: { likes: request.body.userId } });
            response.status(200).json("Post has been liked");
        }
        else
        {
            // dislike post 
            await post.updateOne({ $pull: { likes: request.body.userId } });
            response.status(200).json("Post has been disliked");
        }
    } catch (error) {
        response.status(500).json(error);
    }
})

// get a post
router.get("/:id", async (request, response) => {
    try {
      const post = await Post.findById(request.params.id);
      response.status(200).json(post);
    } catch (error) {
      response.status(500).json(error);
    }
});

// get timeline posts
router.get("/timeline/:userId", async(request, response) => {
    try {
        const currentUser = await User.findById(request.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId});
            })
        )
        response.status(200).json(userPosts.concat(...friendPosts));
    } catch (error) {
        response.status(500).json(error);
    }
})

// get posts of a particular user
router.get("/profile/:username", async (request, response) => {
  try {
    const user = await User.findOne({username: request.params.username});
    const posts = await Post.find({userId: user._id});
    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json(error);
  }
})

module.exports = router;