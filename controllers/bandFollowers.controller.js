const BandFollerClass = require('../class/bandFollowers.class.js');

const responseObject = require('../utils/response.js');
const bandFollowersController = {};

bandFollowersController.getFollowersByBandId = async (req, res) => {
    try {
        const bandId = req.params.band_id;
        const followers = await BandFollerClass.getFollowersByBandId(bandId);
        res.status(200).send(responseObject(200, true, 'Followers fetched successfully', followers));
    } catch (error) {
        console.error(error);
        res.status(500).send(responseObject(500, false, 'Internal server error', null));
    }
}

bandFollowersController.addFollower = async (req, res) => {
    try {
        const bandId = req.params.band_id;
        userId = req.user.id; 
        await BandFollerClass.addFollower(bandId, userId);
        res.status(200).send(responseObject(200, true, 'Band followed successfully', null));
    } catch (error) {
        console.error(error);
        res.status(500).send(responseObject(500, false, 'Internal server error', null));
    }
}

bandFollowersController.removeFollower = async (req, res) => {
    try {
        const bandId = req.params.band_id;
        userId = req.user.id; 
        await BandFollerClass.removeFollower(bandId, userId);
        res.status(200).send(responseObject(200, true, 'Band unfollowed successfully', null));
    } catch (error) {
        console.error(error);
        res.status(500).send(responseObject(500, false, 'Internal server error', null));
    }
}

bandFollowersController.getBandsFollowersCount = async (req, res) => {
    try {
        const bandId = req.params.band_id;
        const count = await BandFollerClass.getBandsFollowersCount(bandId);
        res.status(200).send(responseObject(200, true, 'Followers count fetched successfully', { count }));
    } catch (error) {
        console.error(error);
        res.status(500).send(responseObject(500, false, 'Internal server error', null));
    }
}

bandFollowersController.getBandsUserFollows = async (req, res) => {
    try {
        const bandId = req.params.band_id;
        const userId = req.user.id; 
        const follows = await BandFollerClass.getBandsUserFollows(bandId, userId);
        res.status(200).send(responseObject(200, true, 'User follows fetched successfully', follows));
    } catch (error) {
        console.error(error);
        res.status(500).send(responseObject(500, false, 'Internal server error', null));
    }
}

module.exports = bandFollowersController;