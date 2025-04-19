const express = require("express");
const setListController = require("../controllers/setListController");
const router = express.Router();

router.get("/set_lists", setListController.getSetLists);


module.exports = router;