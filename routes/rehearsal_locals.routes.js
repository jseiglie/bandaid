const express = require("express");
const rehearsal_localController = require("../controllers/rehearsal_locals.controller");
const router = express.Router();
const { tokenMiddleware } = require("../middleware/auth.middleware");

router.get("/", rehearsal_localController.getRehearsalLocals);
router.get("/:id", rehearsal_localController.getRehearsalLocalById);
router.post("/", rehearsal_localController.createRehearsalLocal);
router.put("/:id", rehearsal_localController.updateRehearsalLocal);
router.delete("/:id", rehearsal_localController.deleteRehearsalLocal);

module.exports = router;