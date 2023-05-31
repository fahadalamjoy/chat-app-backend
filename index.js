const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const cors = require('cors');

const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

const router = express.Router();

dotenv.config();
mongoose.set('strictQuery', true);
app.use(cors())

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);



app.listen(8800, () => {
  console.log("Backend server is running!");
});
