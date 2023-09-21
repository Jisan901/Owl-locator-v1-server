const express = require("express");
const { verifyToken } = require('../controllers/Auth/Firebase.admin')
const { saveLog ,getLog } = require ("../controllers/chat");

const router = express.Router();

router.post("/save/log",verifyToken,saveLog);
router.post("/get/log",verifyToken,getLog);

module.exports = router;