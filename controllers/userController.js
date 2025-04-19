const userClass = require('../class/users.class.js')
const responseObject = require('../utils/response.js');
const userController = {}

userController.getUsers = async (req, res) => {
  try {
    console.log('Fetching bands...');
    const bands = await userClass.getUsers()
    res.status(200).send(responseObject(200, true ,'Users fetched successfully', bands))
  } catch (error) {
    console.error(error)
    res.status(500).send(responseObject(500, false, 'Internal server error', null))
  }
}



module.exports = userController