const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", userController.getUsers);
router.post('/auth/login', userController.login);
router.post('/auth/register', userController.register);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/auth/logout", tokenMiddleware, userController.logout);




module.exports = router;