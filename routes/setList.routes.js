const express = require("express");
const setListController = require("../controllers/setList.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/:id", setListController.getSetListById);
router.post("/", setListController.createSetList);
router.put("/:id", setListController.updateSetList);
router.delete("/:id", setListController.deleteSetList);
router.get("/band/:bandId", setListController.getSetListsByBandId);



module.exports = router;