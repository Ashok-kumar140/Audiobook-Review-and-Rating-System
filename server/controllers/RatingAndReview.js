const RatingAndReviews = require('../models/RatingAndReview');
const AudioBook = require("../models/AudioBook");



exports.createRatingAndReviews = async (req, res) => {

    try {

        const userId = req.user.id;
        const { rating, review, bookId } = req.body;

        const alreadyReview = await RatingAndReviews.findOne({ user: userId, audioBook: bookId });
        if (alreadyReview) {
            return res.status(403).json({
                success: false,
                message: "book is already reviewed by the user"
            })
        }


        // console.log("HI 2")
        const ratingReview = new RatingAndReviews(
            {
                rating: rating,
                review: review,
                audioBook: bookId,
                user: userId
            }
        );
        ratingReview.save();
        // console.log("HI 3")

        await AudioBook.findByIdAndUpdate(bookId, { $push: { audiobookRatingAndReviews: ratingReview._id } }, { new: true });

        return res.status(200).json({
            success: true,
            message: `rating and review added successfully`,
            ratingReview,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error while creating rating and review`,
        })
    }
}

exports.getAllRatingReview = async (req, res) => {

    try {

        const { bookId } = req.body;

        const allReviews = await RatingAndReviews.find({audioBook:bookId}).sort({ rating: "desc" })
            .populate({
                path: "user"
            });
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            allReviews,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Unable to fetched reviews. Please try again"
        })

    }
}

