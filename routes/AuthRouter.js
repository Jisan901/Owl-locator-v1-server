const express = require("express");
const { login } = require ("../controllers/auth.js");
const { verifyToken } = require('../controllers/Auth/Firebase.admin')

const router = express.Router();

router.post("/login",verifyToken,login);

module.exports = router;