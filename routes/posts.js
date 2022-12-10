const router = require("express").Router();
const {sequelize, Post} = require('../models');
const slug = require("slug");

router.get('/', async (req,res) => {
    try{
        const posts = await Post.findAll();
        return res.json({"blogPosts" : posts});
    } catch(err){
        return res.status(500).json({error:"Greška pri dobavljanju postova."})
    }
});

router.post('/', async (req, res)=>{
    let newPost = req.body.blogPost;
    newPost.slug = slug(newPost.title);
    res.json(newPost);
});

module.exports = router;