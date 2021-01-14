const router = require("express").Router();
const Blog = require("../models/noticeModel");

router.post("/", async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author)
    return res
      .status(400)
      .json({ msg: "Not all required data has been received." });

  try {
    const newBlog = new Blog({
      title,
      content,
      author
    });

    const savedBlog = await newBlog.save();
    res.json(savedBlog);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    res.json(deletedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;