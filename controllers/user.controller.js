const userClass = require("../class/users.class.js");
const responseObject = require("../utils/response.js");
const userController = {};
const { tokenGenerator, tokenExtractor } = require("../middleware/auth.middleware.js");
const { default: validationUtils } = require("../client/src/utils/validationUtils.js");

userController.logout = async (req, res) => {
  try {
    const token = tokenExtractor(req);
    const response = await userClass.logout(token);
      return res
        .status(200)
        .send(responseObject(200, true, "Logout successful"));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", error));
  }
};  

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
    const {  identifier, password } = req.body;
    const credentials = {
     
      username:null,
      email:  null,
      password: password || null,
    }

    
    validationUtils.validateEmail(identifier)? credentials.email = identifier: credentials.username = identifier

    if ((!credentials.email || !credentials.username) && !credentials.password) {
      throw new Error("Missing credentials: Password is required. Must provide an username or valid email address ");
    }
    const user = await userClass.login(credentials);
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
    const { email, password } = req.body;
    const user = await userClass.register(email, password);
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

// get user by name
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

module.exports = userController;
