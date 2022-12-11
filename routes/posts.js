const router = require("express").Router();
const { sequelize, Post, Comment } = require("../models");
const slug = require("slug");

router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll();
        return res.json({ blogPosts: posts });
    } catch (err) {
        return res.status(500).json({ error: "Greška pri dobavljanju postova." });
    }
});

router.post("/", async (req, res) => {
    let { title, description, body, tagList } = req.body.blogPost;
    let postSlug = slug(title);

    try {
        let newPost = await Post.create({
            slug: postSlug,
            title,
            description,
            body,
        });
        return res.json({ blogPost: newPost });
    } catch (err) {
        return res.json(err);
    }
});

router.get("/:slug", async (req, res) => {
    const slug = req.params.slug;
    try {
        const post = await Post.findOne({
            where: { slug },
        });
        return res.json({ blogPost: post });
    } catch (err) {
        return res.status(500).json({ error: "Greška pri dobavljanju posta." });
    }
});

router.post("/:slug/comments", async (req, res) => {
    const slug = req.params.slug;
    let { body } = req.body.comment;
    try {
        const post = await Post.findOne({ where: { slug } });
        const comment = await Comment.create(
            { 
                body: body, 
                postId: post.id 
            });
        return res.json({ comment: comment });
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get("/:slug/comments", async(req,res)=>{
    
    const slug = req.params.slug;
    try{
        const postId = (await Post.findOne({where: {slug}})).id;
        const comments = await Comment.findAll({where:{
            postId
        }});
        return res.json({commnets: comments});
    }catch(err)
    {
        return res.status(500).json(err);
    }
});

router.delete("/:slug/comments/:id", async(req,res)=>{
    const slug = req.params.slug;
    const id = req.params.id;
    try{
        const postId = (await Post.findOne({where: {slug}})).id;
        const done = await Comment.destroy({where:{
            postId,
            id
        }});
        if (done)
            return res.json({"msg" : "Komentar uspjesno izbrisan"})
            else
            return res.json({"msg" : "Komentar ne postoji!"})
    }catch(err)
    {
        return res.status(500).json(err);
    }
});


module.exports = router;
