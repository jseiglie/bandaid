const bandClass = require('../class/bandClass')

const bandController = {}

bandController.getBands = async (req, res) => {
  try {
    console.log('Fetching bands...');
    const bands = await bandClass.getBands()
    res.status(200).json(bands)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}



module.exports = bandController