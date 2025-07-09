const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/users", userController.getUsers);
router.post('/auth/login', userController.login);
router.post('/auth/register', userController.register);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);




module.exports = router;