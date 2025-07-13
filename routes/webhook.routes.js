const stripeController = require("../controllers/stripe.controller.js");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.post('/webhook', bodyParser.raw({ type: 'application/json' }), stripeController.stripeWebhookHandler);
module.exports = router;
