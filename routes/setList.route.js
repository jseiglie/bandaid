const express = require("express");
const setListController = require("../controllers/setList.controller");
const router = express.Router();

router.get("/set_lists", setListController.getSetLists);


module.exports = router;