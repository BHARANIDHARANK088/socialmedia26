const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");

// update user
router.put("/:id", async (request, response) => {
    const { _id } = request.body;
    if ( _id === request.params.id || request.user.isAdmin )
    {
       if ( request.body.password )
       {
         try {
             const salt = await bcrypt.genSalt(10);
             req.body.password = await bcrypt.hash(req.body.password, salt);
         } catch (error) {
             return response.status(500).json(error);
         }
       }

       try {
         const user = await User.findByIdAndUpdate(request.params.id, {
            $set: request.body
         }, {new: true});
         response.status(200).json(user);
       } catch (error) {
         return response.status(500).json(error);
       }
    }
    else
    {
        return response.status(403).json("You can update only your account!");
    }
})

// delete user
router.delete("/:id", async (request, response) => {
    if ( request.body.userId === request.params.id || request.user.isAdmin )
    {
       try {
         const user = await User.findByIdAndDelete(request.params.id);
         response.status(200).json("Account has been deleted");
       } catch (error) {
         return response.status(500).json(error);
       }
    }
    else
    {
        return response.status(403).json("You can delete only your account!");
    }
})

// get a user
router.get("/", async (request, response) => {
    const userId = request.query.userId;
    const username = request.query.username;
    try {
        const user = userId ? await User.findById(userId) : await User.findOne({username: username});
        const { password, updatedAt, ...others} = user._doc;
        response.status(200).json(others);
    } catch (error) {
        return response.status(500).json(error);
    }
})

router.get("/all", async (request, response) => {
  try {
    let users = await User.find().limit(5);
    users = users.map((user) => {
        const { password, ...otherDetails} = user._doc;
        return otherDetails;
    });
    response.status(200).json(users);
   } catch (error) {
    response.status(500).json(error);
  }
})

// follow a user
router.put("/:id/follow", async (request, response) => {
    if ( request.body.userId !== request.params.id )
    {
       try {
          const user = await User.findById(request.params.id);
          const currentUser = await User.findById(request.body.userId);

          if ( !user.followers.includes(request.body.userId) )
          {
            await user.updateOne({ $push: { followers: request.body.userId } });
            await currentUser.updateOne({ $push: { followings: request.params.id } });
            response.status(200).json("User has been followed");
          }
          else
          {
            response.status(403).json("you already follow this user");
          }
       } catch (error) {
          response.status(500).json(error);
       }
    }
    else
    {
        response.status(403).json("You can't follow yourself")
    }
})

// unfollow user
router.put("/:id/unfollow", async (request, response) => {
    if ( request.body.userId !== request.params.id )
    {
       try {
          const user = await User.findById(request.params.id);
          const currentUser = await User.findById(request.body.userId);

          if ( user.followers.includes(request.body.userId) )
          {
            await user.updateOne({ $pull: { followers: request.body.userId } });
            await currentUser.updateOne({ $pull: { followings: request.params.id } });
            response.status(200).json("User has been unfollowed");
          }
          else
          {
            response.status(403).json("you don't follow this user");
          }
       } catch (error) {
          response.status(500).json(error);
       }
    }
    else
    {
        response.status(403).json("You can't unfollow yourself")
    }
})

// get friends
router.get("/friends/:userId", async (request, response) => {
  try {
    const user = await User.findById(request.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    )

    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({_id, username, profilePicture});
    })

    response.status(200).json(friendList);
  } catch (error) {
    response.status(500).json(error);
  }
})


// partial search
router.get("/partial/:searchQuery", async (request, response) => {
   const query = request.params.searchQuery;
   const searchRegex = new RegExp(query, 'i');
   try {
     const users = await User.find({ username: searchRegex });
     let friendList = [];
     users.map((friend) => {
      const { password, ...others } = friend._doc;
      friendList.push(others);
    })

     response.status(200).json(friendList);
   } catch (error) {
     response.status(500).json(error);
   }
})

module.exports = router;