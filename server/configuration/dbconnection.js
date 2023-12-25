const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD || "Praveen@123",
    database: process.env.DATABASE || "database_test",
  },
});

knex.schema
  .createTable("Post", (table) => {
    table.increments("id");
    table.string("title");
    table.string("postText");
    table.string("username");
    table.integer("userId");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  })
  .then((result) => {
    console.log("Post Table created");
  })
  .catch((err) => {
    // console.log(err);
  });

knex.schema
  .createTable("Comments", (table) => {
    table.increments("id");
    table.string("postId").notNullable();
    table.string("comments");
    table.string("commentUserId");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.foreign("postId").references("Post.id");
  })
  .then((result) => {
    console.log("Comments Created");
  })
  .catch((err) => {
    // console.log(err);
  });

knex.schema
  .createTable("User", (table) => {
    table.increments("id");
    table.string("userName");
    table.string("password");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  })
  .then((result) => {
    console.log("User Created");
  })
  .catch((err) => {
    // console.log(err);
  });

knex.schema
  .createTable("Likes", (table) => {
    table.increments("id");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.integer("PostId");
    table.string("updateat");
    table.integer("UserId");
  })
  .then((result) => {
    console.log("Like table is created");
  })
  .catch((err) => {
    // console.log(err);
  });
module.exports = knex;
