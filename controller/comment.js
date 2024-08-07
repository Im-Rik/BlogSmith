const Comment = require('../models/comment')

const handlePostUserComment = async (req, res) => {

    const comment = await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    })

    res.redirect(`/blog/${req.params.blogId}`)

    console.log(comment)
}

module.exports = {
    handlePostUserComment,
}