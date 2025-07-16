const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripe.controller.js");
const { tokenMiddleware } = require("../middleware/auth.middleware");

//router.post('/charge', tokenMiddleware, stripeController.charge);
router.post(
  "/payment-intent",
  stripeController.createPaymentIntent
);
router.post("/create-subscription", tokenMiddleware, stripeController.createSubscription);
///router.post('/webhook', bodyParser.raw({ type: 'application/json' }), stripeController.stripeWebhookHandler);

module.exports = {
  router,
  path: "/stripe"
};
