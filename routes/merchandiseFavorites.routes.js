const express = require('express');
const router = express.Router();
const merchandiseFavoritesController = require('../controllers/merchandiseFavorites.controller.js');
const { tokenMiddleware } = require('../middleware/auth.middleware');

// router.get('/', tokenMiddleware, merchandiseFavoritesController.getMerchandiseFavorites);
router.get('/user', tokenMiddleware, merchandiseFavoritesController.getFavoritesByUserId);
router.post('/:merchandise_id', tokenMiddleware, merchandiseFavoritesController.addMerchandiseToFavorites);
router.delete('/:merchandise_id', tokenMiddleware, merchandiseFavoritesController.removeMerchandiseFromFavorites);
router.get('/:merchandise_id/count', merchandiseFavoritesController.getFavoritesCount);
router.get('/band/:band_id/count', merchandiseFavoritesController.getAllFavoritesCountForBandMerchandise);

module.exports = router;