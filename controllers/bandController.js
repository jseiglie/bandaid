const bandClass = require('../class/bands.class.js')
const responseObject = require('../utils/response.js');
const bandController = {}

bandController.getBands = async (req, res) => {
  try {
    console.log('Fetching bands...');
    const bands = await bandClass.getBands() 
    res.status(200).send(responseObject(200, true ,'Bands fetched successfully', bands))
  } catch (error) {
    console.error(error)
    res.status(500).send(responseObject(500, false, 'Internal server error', null))
  }
}

 

module.exports = bandController