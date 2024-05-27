const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
dotenv.config();
const path = require("path");

const cors = require("cors");
app.use(cors());

// 78
// app.use(express.static("public"));
// app.use("/images", express.static("images"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

const authRoutes = require("./routes/authRoute.js");
const userRoutes = require("./routes/userRoute.js");
const postRoutes = require("./routes/postRoute.js");

// 76
const uploadRoutes = require("./routes/uploadRoute.js");

// 124
const conversationRoutes = require("./routes/conversationRoute.js");

// 130
const messageRoutes = require("./routes/messageRoute.js");

mongoose.connect("mongodb://localhost:27017/lSocialDB", {
     useNewUrlParser: true, 
     useUnifiedTopology: true
}).then(console.log("Connected to Database"))
.catch(error => console.log(error));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// 125
app.use("/api/conversations", conversationRoutes);

// 131
app.use("/api/messages", messageRoutes);

// 77
app.use("/api/upload", uploadRoutes);

app.listen(5000, () => {
    console.log("Server started");
})
