const router = require("express").Router();
const {sequelize, Post} = require('../models');

router.get('/', async (req,res) => {
    try{
        const posts = await Post.findAll();
        return res.json({"blogPosts" : posts});
    } catch(err){
        return res.status(500).json({error:"Greška pri dobavljanju postova."})
    }
});


module.exports = router;