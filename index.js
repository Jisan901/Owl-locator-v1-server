const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketInit = require('./utilities/handleSocket');

require("dotenv").config();
const mongoose = require("mongoose");
// routers  
const authRouter = require("./routes/AuthRouter");
const groupRouter = require("./routes/groupRouter");
const chatRouter = require("./routes/chatRouter");

//end
const PORT = process.env.PORT || 5000;
const app = express();
const corsFonfig = {
  origin: ["http://localhost:5173"],
  credentials: true
};

//middlewars
app.use(express.json());
app.use(cors(corsFonfig));
app.use(cookieParser());

// Database 
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

// Routes 
app.get("/", (req, res) => res.send("server is running..."));
// router routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/group", groupRouter);
app.use("/api/v1/chat", chatRouter);

// All Routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});


const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// socket Initialization 

socketInit(server);