const express = require("express");
const { createGroup,myGroups,getById,searchById,createRequest,answerRequest } = require ("../controllers/group");
const { verifyCookie } = require('../controllers/Auth/Firebase.admin')

const router = express.Router();

router.post("/create",verifyCookie,createGroup);
router.get("/my",verifyCookie,myGroups);
router.get("/search/:id",verifyCookie,searchById);
router.get("/get/:id",verifyCookie,getById);
router.get("/request/:id",verifyCookie,createRequest);
router.post("/set/request/:id",verifyCookie,answerRequest);

module.exports = router;