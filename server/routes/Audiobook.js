const express = require("express")
const router = express.Router()

const { getAudiobooks, createAudiobook, getFullDetailsOfAudiobook,userLikedbooks } = require('../controllers/AudioBook');
const { Auth } = require('../middlewares/Auth');
const { createRatingAndReviews, getAllRatingReview } = require('../controllers/RatingAndReview');
const { LikeBook } = require('../controllers/Like');
router.get("/getAudiobooks", getAudiobooks)
router.post("/createAudiobook", createAudiobook)
router.post("/getFullDetailsOfAudiobook", getFullDetailsOfAudiobook);
router.post("/createReview", Auth, createRatingAndReviews);
router.post("/getAllReviews", getAllRatingReview);
router.post("/LikeBook", Auth, LikeBook)
router.get("/userLikedbooks", Auth, userLikedbooks)


module.exports = router;