const express = require("express");
const { createGroup,myGroups,getById,searchById,createRequest,answerRequest } = require ("../controllers/group");
const { verifyToken } = require('../controllers/Auth/Firebase.admin')

const router = express.Router();

router.post("/create",verifyToken,createGroup);
router.get("/my",verifyToken,myGroups);
router.get("/search/:id",verifyToken,searchById);
router.get("/get/:id",verifyToken,getById);
router.get("/request/:id",verifyToken,createRequest);
router.post("/set/request/:id",verifyToken,answerRequest);

module.exports = router;