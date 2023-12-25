const jwt = require("jsonwebtoken");
const knex = require("../configuration/dbconnection");

const createtoken = ({ id }) => {
  return jwt.sign(id, process.env.SECRETKEY || "praveenkumar21heifyefjsbdfiywjdsfygsd");
};

const virifiToken = async (req, res, next) => {
  try {
    // if (!!req.headers.setdata) { 
    //   req.headers.seingtoken = req.headers.setdata;
    // }
    if (req.headers.seingtoken) {
      const token = req.headers.seingtoken;
      const tr = jwt.verify(token, process.env.SECRETKEY || "praveenkumar21heifyefjsbdfiywjdsfygsd");
      const user = await knex("User").where({ id: tr });
      req.userData = user; 
      next();
    } else {
      res.send("token has expaire");
    }
  } catch (error) {
    res.send("token has expaire");
  }
};

module.exports = { createtoken, virifiToken };
