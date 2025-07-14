const express = require('express');
const merchandiseController = require('../controllers/merchandise.controller.js');
const router = express.Router();
const {tokenMiddleware} = require('../middleware/auth.middleware');

router.get('/', merchandiseController.getAllMerchandise);
router.get('/:id', merchandiseController.getMerchandiseById);
router.post('/', tokenMiddleware, merchandiseController.createMerchandise);
router.put('/:id', tokenMiddleware, merchandiseController.updateMerchandise);
router.delete('/:id', tokenMiddleware, merchandiseController.deleteMerchandise);
router.get('/search', merchandiseController.searchMerchandise);
router.get('/availability', merchandiseController.getMerchandiseByAvailability);
router.get('/price_range', merchandiseController.getMerchandiseByPriceRange);
router.get('/category/:categoryId', merchandiseController.getMerchandiseByCategory);
router.get('/band/:bandId', merchandiseController.getMerchandiseByBand);

module.exports = router;