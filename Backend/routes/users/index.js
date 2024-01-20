const express = require('express');

const router = express.Router({ margeParams:true });

let post = require('./post');


router.post('/login', post.login);
router.post('/signup', post.signup);

module.exports = router;
