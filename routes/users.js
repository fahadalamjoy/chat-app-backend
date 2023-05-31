const User = require("../models/User");
const router = require("express").Router();

//create user
 
router.post("/", async (req, res) => {
    const newUser = new User(req.body);
    console.log(newUser)
  
    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  ///////////////// postgress ID /////////////
  

  router.get("/:techID", async (req, res) => {
    try {
      const userID = await User.find({
        postgressql: req.params.techID,
      });
      console.log('hit')
      res.status(200).json(userID);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/mongo/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId); // Use findById instead of find
      // console.log(user);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user



//unfollow a user



module.exports = router;
