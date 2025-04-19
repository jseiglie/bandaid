const SetListsClass = require('../class/setLists.class.js')
const responseObject = require('../utils/response.js');
const setListController = {}

setListController.getSetLists = async (req, res) => {
  try {
    console.log('Fetching bands...');
    const bands = await SetListsClass.getSetLists()
    res.status(200).send(responseObject(200, true ,'setLists fetched successfully', bands))
  } catch (error) {
    console.error(error)
    res.status(500).send(responseObject(500, false, 'Internal server error', null))
  }
}



module.exports = setListController