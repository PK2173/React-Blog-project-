const express = require("express"); 
const router = express.Router();
const knex = require("../configuration/dbconnection");
const bcrypt = require("bcrypt");
const { createtoken, virifiToken } = require("../middelwear/jsonwebtoken");

router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  const newpassword = await bcrypt.hash(password, 10);
  const reslt = await knex("User").insert({
    userName: userName,
    password: newpassword,
  });
  if (reslt.error) {
    res.send(reslt.error);
  }
  res.send("registration completed successfully");
});

router.get("/",virifiToken, async (req, res) => {
  console.log(req.userData);
  const reslt = await knex("User").where({id:req.userData[0].id});
  res.send(reslt);
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  let reslt = await knex("User").where({ userName: userName });
  if (!reslt) res.json({ error: "User is not register yet" });
  try {
    
    let check = await bcrypt.compare(reslt[0].password,password)
    const token = createtoken(reslt[0])
    if(!check) res.header('seingToken',token)
    if(!check) res.json({token:token,userName:reslt[0].userName,id:reslt[0].id})
  } catch (error) {
    res.json(`dhat tori mai ke Ch....`)
  }
});

router.get("/auth",virifiToken, async (req, res) => {
  res.send(req.userData[0]);
});

module.exports = router;
