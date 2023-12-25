const express = require("express");
const router = express.Router();
const knex = require("../configuration/dbconnection");
const {virifiToken} = require('../middelwear/jsonwebtoken')

router.get("/", async (req, res) => {
  let result = await knex("Post");
  for (er of result) {
    er.Likes = await knex("Likes").where({ PostId: er.id });
  }
  res.send(result);
});

router.get("/byId/:id", (req, res) => {
  knex("Post")
    .where({ id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/delet", virifiToken,async (req,res)=>{
  let id = req.body.postId
  try {
    await knex("Post").where({id:id}).del()
    res.send("deleted sucessfully")
  } catch (error) {
    res.send("Somthing was wrong",error)
  }
})

router.post("/",virifiToken, async (req, res) => {
  let {title,postText} = req.body
  let username = req.userData[0].userName
  let userId = req.userData[0].id
  knex("Post")
    .insert({title,postText,username,userId})
    .then((result) => {
      res.send("data inserted");
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
