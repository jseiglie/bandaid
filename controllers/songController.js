const songClass = require('../class/songs.class.js')
const responseObject = require('../utils/response.js');
const songController = {}

songController.getSongs = async (req, res) => {
  try {
    console.log('Fetching songs...');
    const bands = await songClass.getSongs()
    res.status(200).send(responseObject(200, true ,'Songs fetched successfully', bands))
  } catch (error) {
    console.error(error)
    res.status(500).send(responseObject(500, false, 'Internal server error', null))
  }
}



module.exports = songController