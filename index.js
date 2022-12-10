const express = require('express');
const {sequelize} = require("./models");
const posts = require("./routes/posts");


const app = express();
app.use(express.json());
app.use("/api/posts", posts);


app.listen({port:3000}, async() =>{
    await sequelize.authenticate();
});

module.exports = app;