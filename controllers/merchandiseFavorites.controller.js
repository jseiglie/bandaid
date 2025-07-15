const MerchandiseController = require('../class/merchandiseFavorites.class.js');
const responseObject = require('../utils/response.js');
const { tokenMiddleware } = require('../middleware/auth.middleware');
const merchandiseFavoritesController = {};

merchandiseFavoritesController.getFavoritesByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const favorites = await MerchandiseController.getFavoritesByUserId(userId);
        res.status(200).send(responseObject(200, true, 'Favorites fetched successfully', favorites));
    } catch (error) {
        console.error(error);
        res.status(500).send(responseObject(500, false, 'Internal server error', null));
    }
}

merchandiseFavoritesController.addMerchandiseToFavorites = async (req, res) => {
    try {
        const { merchandise_id } = req.params;
        const userId = req.user.id;
        const favorite = await MerchandiseController.addMerchandiseToFavorites(merchandise_id, userId);
        res.status(200).send(responseObject(200, true, 'Merchandise added to favorites successfully', favorite));
    } catch (error) {
        console.error(error);
        res.status(500).send(responseObject(500, false, 'Internal server error', null));
    }
}

merchandiseFavoritesController.removeMerchandiseFromFavorites = async (req, res) => {
    try {
        const { merchandise_id } = req.params;
        const userId = req.user.id;
        const result = await MerchandiseController.removeMerchandiseFromFavorites(merchandise_id, userId);
        if (result) {
            res.status(200).send(responseObject(200, true, 'Merchandise removed from favorites successfully', null));
        } else {
            res.status(404).send(responseObject(404, false, 'Favorite not found', null));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(responseObject(500, false, 'Internal server error', null));
    }
}

merchandiseFavoritesController.getFavoritesCount = async (req, res) => {
    try {
        const { merchandise_id } = req.params;
        const count = await MerchandiseController.getFavoritesCount(merchandise_id);
        res.status(200).send(responseObject(200, true, 'Favorites count fetched successfully', { count }));
    } catch (error) {
        console.error(error);
        res.status(500).send(responseObject(500, false, 'Internal server error', null));
    }
}

merchandiseFavoritesController.getAllFavoritesCountForBandMerchandise = async (req, res) => {
    try {
        const { band_id } = req.params;
        const count = await MerchandiseController.getAllFavoritesCountForBandMerchandise(band_id);
        res.status(200).send(responseObject(200, true, 'Total favorites count for band merchandise fetched successfully', { count }));
    } catch (error) {
        console.error(error);
        res.status(500).send(responseObject(500, false, 'Internal server error', null));
    }
}

module.exports = merchandiseFavoritesController;
