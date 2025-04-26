const userClass = require("../class/users.class.js");
const responseObject = require("../utils/response.js");
const userController = {};
const { tokenGenerator } = require("../middleware/auth.js");
userController.getUsers = async (req, res) => {
  try {
    console.log("Fetching bands...");
    const bands = await userClass.getUsers();
    res
      .status(200)
      .send(responseObject(200, true, "Users fetched successfully", bands));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

userController.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userClass.getUserById(userId);
    res
      .status(200)
      .send(responseObject(200, true, "User fetched successfully", user));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

userController.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const user = await userClass.updateUser(userId, userData);
    res
      .status(200)
      .send(responseObject(200, true, "User updated successfully", user));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

userController.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userClass.deleteUser(userId);
    res
      .status(200)
      .send(responseObject(200, true, "User deleted successfully", user));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

userController.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await userClass.getUserByEmail(email);
    res
      .status(200)
      .send(responseObject(200, true, "User fetched successfully", user));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

userController.getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await userClass.getUserByUsername(username);
    res
      .status(200)
      .send(responseObject(200, true, "User fetched successfully", user));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

userController.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ((!email || !username) && !password) {
      throw new Error("All fields are required");
    }
    const user = await userClass.login(username, email, password);
    if (user) {
      res.status(200).send(responseObject(200, true, "Login successful", user));
    } else {
      res
        .status(401)
        .send(responseObject(401, false, "Invalid credentials", null));
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(responseObject(500, false, error.message, null));
  }
};

userController.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await userClass.register(username, email, password);
    if (user) {
      res
        .status(201)
        .send(responseObject(201, true, "Registration successful", user));
    } else {
      res
        .status(400)
        .send(responseObject(400, false, "Registration failed", null));
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

module.exports = userController;
