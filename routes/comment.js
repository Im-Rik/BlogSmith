const express = require('express');
const router = express.Router();
const {handlePostUserComment} = require('../controller/comment');


router
    .route('/:blogId')
    .post(handlePostUserComment)

module.exports = router;