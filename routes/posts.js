const router = require("express").Router();
const { sequelize, Post, Tag } = require("../models");
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
        let newPost = await Post.create(
            {
                slug: postSlug,
                title,
                description,
                body,
            },
        );
        return res.json(newPost);
    } catch (err){
        return res.json(err);
    }
});

router.get("/:slug", async(req, res)=>{
    const slug = req.params.slug;
    try {
        const post = await Post.findOne({
            where: {slug},
        });
        return res.json({ blogPost: post });
    } catch (err) {
        return res.status(500).json({ error: "Greška pri dobavljanju posta." });
    }
});



module.exports = router;