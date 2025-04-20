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

bandController.getBandById = async (req, res) => {
  try {
    const bandId = req.params.id
    const band = await bandClass.getBandById(bandId)
    res.status(200).send(responseObject(200, true, 'Band fetched successfully', band))
  } catch (error) {
    console.error(error)
    res.status(500).send(responseObject(500, false, 'Internal server error', null))
  }
}

bandController.createBand = async (req, res) => {
  try {
    const bandData = req.body
    const band = await bandClass.createBand(bandData)
    res.status(201).send(responseObject(201, true, 'Band created successfully', band))
  } catch (error) {
    console.error(error)
    res.status(500).send(responseObject(500, false, 'Internal server error', null))
  }
}
 
bandController.updateBand = async (req, res) => {
  try {
    const bandId = req.params.id
    const bandData = req.body
    const band = await bandClass.updateBand(bandId, bandData)
    res.status(200).send(responseObject(200, true, 'Band updated successfully', band))
  } catch (error) {
    console.error(error)
    res.status(500).send(responseObject(500, false, 'Internal server error', null))
  }
}

bandController.deleteBand = async (req, res) => {
  try {
    const bandId = req.params.id
    const band = await bandClass.deleteBand(bandId)
    res.status(200).send(responseObject(200, true, 'Band deleted successfully', band))
  } catch (error) {
    console.error(error)
    res.status(500).send(responseObject(500, false, 'Internal server error', null))
  }
}

module.exports = bandController