const router = require("express").Router();
const Message = require("../models/Message");

//add

router.post("/", async (req, res) => {
  // const { conversationId, sender, receiver, text } = req.body;
  // console.log(conversationId, sender, receiver, text)
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/getMessage/:sender/:receiver", async (req, res) => {
  try {
    const messages = await Message.find({
      sender: req.params.sender,
      receiver: req.params.receiver
    });
    // console.log(messages)

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
