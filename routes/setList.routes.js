const express = require("express");
const setListController = require("../controllers/setList.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/:id", setListController.getSetListById);
router.post("/", tokenMiddleware, setListController.createSetList);
router.put("/:id", tokenMiddleware, setListController.updateSetList);
router.delete("/:id", tokenMiddleware, setListController.deleteSetList);
router.get("/band/:bandId", tokenMiddleware, setListController.getSetListsByBandId);




module.exports = {
    router,
    path: "/set_list"
}