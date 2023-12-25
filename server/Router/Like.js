const express = require("express");
const { virifiToken } = require("../middelwear/jsonwebtoken");
const knex = require("../configuration/dbconnection");
const router = express.Router();

router.post("/", virifiToken, async (req, res) => {
  let userId = req.userData[0].id;
  let chackdata = await knex("Likes").where({
    PostId: req.body.PostId,
    UserId: userId
  }); 
  if (chackdata.length > 0) {
    await knex("Likes")
      .where({
        PostId: req.body.PostId,
        UserId: userId,
      })
      .del();
    res.send("remove like");
  } else {
    let data = await knex("Likes").insert({
      PostId: req.body.PostId,
      UserId: userId,
      updateat: new Date(),
    });
    if (!!data) {
      res.send("sucess");
    } else {
      res.send("fail");
    }
  }
});
module.exports = router;
