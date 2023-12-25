const express = require("express");
const knex = require("../configuration/dbconnection");
const router = express.Router();

router.get("/basicinnfo/:id", async (req, res) => {
  let id = req.params.id;
  let result = await knex("User").where({ id: id });
  let result1 = await knex("Post");
  for (er of result1) {
    er.Likes = await knex("Likes").where({ PostId: er.id });
  }
  res.send([result,result1]);
//   res.send(result);
});

module.exports = router;
