const express = require("express");
const { verifyCookie } = require('../controllers/Auth/Firebase.admin')
const { saveLog ,getLog } = require ("../controllers/chat");

const router = express.Router();

router.post("/save/log",verifyCookie,saveLog);
router.post("/get/log",verifyCookie,getLog);

module.exports = router;