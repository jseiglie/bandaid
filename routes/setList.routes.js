const express = require("express");
const setListController = require("../controllers/setList.controller");
const router = express.Router();

router.get("/set_lists/:id", setListController.getSetListById);
router.post("/set_lists", setListController.createSetList);
router.put("/set_lists/:id", setListController.updateSetList);
router.delete("/set_lists/:id", setListController.deleteSetList);
router.get("/set_lists/band/:bandId", setListController.getSetListsByBandId);



module.exports = router;