const Blog = require('../models/blogs');
const Comment = require('../models/comment')


const renderAddNewBlogPage = (req, res) => {
    res.render('addBlog', {
        user: req.user,
    })
}

const handleAddNewBlog = async (req, res) => {
    const body = req.body;
    const blog = await Blog.create({
        title: body.title,
        body: body.body,
        coverImageURL: `/uploads/${ req.user._id}/${req.file.filename}`,
        createdBy: req.user._id
    })
    res.redirect(`/blog/${blog._id}`);
}

const renderBlogPage = async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId).populate("createdBy");
    const comments = await Comment.find({blogId:req.params.id }).populate("createdBy");
    res.render('blog', {
        blog: blog,
        user: req.user,
        comments: comments,
    })
}


module.exports = {
    renderAddNewBlogPage,
    handleAddNewBlog,
    renderBlogPage,
}