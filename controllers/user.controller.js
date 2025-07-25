const userClass = require("../class/users.class.js");
const responseObject = require("../utils/response.js");
const userController = {};
const {
  tokenGenerator,
  tokenExtractor,
} = require("../middleware/auth.middleware.js");
const {
  default: validationUtils,
} = require("../client/src/utils/validationUtils.js");
const { user } = require("../config/db.config.js");

userController.logout = async (req, res) => {
  try {
    const token = tokenExtractor(req);
    await userClass.logout(token);
    return res.status(200).send(responseObject(200, true, "Logout successful"));
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

userController.getUser = async (req, res) => {
  try {
    const userId = req.user.id;
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

userController.getMe = async (req, res) => {
  try {
    const userId = req.user.id;
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
    const userId = req.user.id;
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
    const { identifier, password } = req.body;
    const credentials = {
      username: null,
      email: null,
      password: password || null,
    };

    validationUtils.validateEmail(identifier)
      ? (credentials.email = identifier)
      : (credentials.username = identifier);

    if (
      (!credentials.email || !credentials.username) &&
      !credentials.password
    ) {
      throw new Error(
        "Missing credentials: Password is required. Must provide an username or valid email address "
      );
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
    const { identifier, password } = req.body;
    const user = await userClass.register(identifier, password);
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

userController.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
   
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .send(
          responseObject(
            400,
            false,
            "Current and new passwords are required",
            null
          )
        );
    }
    if (!validationUtils.validatePassword(newPassword)) {
      return res
        .status(400)
        .send(responseObject(400, false, "Invalid password format", null));
    }
    
    
    const user = await userClass.changePassword(userId, currentPassword, newPassword);
    if (!user) {
      return res
        .status(404)
        .send(responseObject(404, false, "User not found", null));
    }

    res
      .status(200)
      .send(responseObject(200, true, "Password changed successfully", user));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

module.exports = userController;
