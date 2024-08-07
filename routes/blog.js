const express = require('express');
const router = express.Router();
const {renderAddNewBlogPage, handleAddNewBlog, renderBlogPage} = require('../controller/blogs')
const handleUploadCoverImage = require('../middleware/blog')

router
    .route('/add-new')
    .get(renderAddNewBlogPage)


router
    .route('/')
    .post(handleUploadCoverImage('coverImage'), handleAddNewBlog)

router
    .route('/:id')
    .get(renderBlogPage)

module.exports = router;