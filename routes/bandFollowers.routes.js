const exactor = require("express");
const router = exactor.Router();
const bandFollowersController = require("../controllers/bandFollowers.controller.js");
const { tokenMiddleware } = require("../middleware/auth.middleware");

router.get("/:band_id", tokenMiddleware, bandFollowersController.getFollowersByBandId);
router.post("/:band_id", tokenMiddleware, bandFollowersController.addFollower);
router.delete("/:band_id", tokenMiddleware, bandFollowersController.removeFollower);
router.get("/:band_id/count",  bandFollowersController.getBandsFollowersCount);
router.get("/:band_id/user_follows", tokenMiddleware, bandFollowersController.getBandsUserFollows);

module.exports = router;