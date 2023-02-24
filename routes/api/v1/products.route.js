const express= require("express");
const { postUser, getUser } = require("../../../controllers/products.controller");
const router = express.Router();
router.route('/post').post(postUser);
router.route('/').get(getUser)
module.exports= router;