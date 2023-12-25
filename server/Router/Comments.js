const express = require("express");
const router = express.Router();
const knex = require("../configuration/dbconnection");
const { virifiToken } = require("../middelwear/jsonwebtoken");

router.get("/:postId", virifiToken, (req, res) => {
  let commentUserId = req.userData[0].userName;
  knex("Comments")
    .where({ postId: req.params.postId })
    .then((result) => {
      res.send({ result, commentUserId });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/", virifiToken, (req, res) => {
  let { postId, comments } = req.body;
  let commentUserId = JSON.stringify([
    req.userData[0].userName,
    req.userData[0].id,
  ]);
  knex("Comments")
    .insert({ postId, comments, commentUserId })
    .then((result) => {
      res.send("data inserted");
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/:commentId", virifiToken, async (req, res) => {
  let purge = await knex("Comments")
  .where({ id: req.params.commentId, commentUserId: JSON.stringify([req.userData[0].userName,req.userData[0].id]) })
    .del();
  if (purge == 1) {
    res.send(req.params.commentId)
  } else {
    
  }
});

module.exports = router;
