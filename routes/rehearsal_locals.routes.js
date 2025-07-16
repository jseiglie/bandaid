const express = require("express");
const rehearsal_localController = require("../controllers/rehearsal_locals.controller");
const router = express.Router();
const { tokenMiddleware } = require("../middleware/auth.middleware");

router.get("/", rehearsal_localController.getRehearsalLocals);
router.get("/:id", tokenMiddleware, rehearsal_localController.getRehearsalLocalById);
router.post("/", tokenMiddleware, rehearsal_localController.createRehearsalLocal);
router.put("/:id", tokenMiddleware, rehearsal_localController.updateRehearsalLocal);
router.delete("/:id", tokenMiddleware, rehearsal_localController.deleteRehearsalLocal);


module.exports = {
    router,
    path: "/rehearsal_locals"
}