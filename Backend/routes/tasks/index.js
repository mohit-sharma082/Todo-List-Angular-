const express = require('express');
const router = express.Router({ margeParams:true });
const checkAuth = require("../../middleware/check-auth")
const fileUploadHandler = require("../../middleware/file-upload-handler");
const multer = require('multer');

let get = require('./get');
let post = require('./post');
let put = require('./put');
let del = require('./delete');

router.get('/',get.getAll);
router.get('/:id',get.getById);

router.post('/',checkAuth,fileUploadHandler, post.createTask);
router.put('/:id', checkAuth ,fileUploadHandler,put.updateTask);
router.delete('/:id', checkAuth ,del.deleteTask);

module.exports = router;
