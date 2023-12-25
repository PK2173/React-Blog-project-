const express = require("express");
const app = express();
const knex = require("./configuration/dbconnection");
const cors = require("cors");
// const dotenv = require('dotenv')

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hey This is new project");
});
// Router
const PostRpouter = require("./Router/Post");
const Comments = require("./Router/Comments");
const User = require("./Router/User");
const Like = require("./Router/Like");
const Profile = require("./Router/Profile");

app.use("/post", PostRpouter);
app.use("/comments", Comments);
app.use("/auth", User);
app.use("/like", Like);
app.use("/profile",Profile )

// app.get("/",(req,res)=>{
// res.send("bhaaak Mderch")
// })
app.listen(process.env.PORT || 8000, () => {
  console.log("connected localhost:8000");
});
