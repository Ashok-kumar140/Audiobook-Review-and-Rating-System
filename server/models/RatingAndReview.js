const mongoose = require('mongoose');

const ratingAndReviewsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    rating: {
        type: Number,
        require: true
    },
    review: {
        type: String,
        require: true
    },
    audioBook: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "AudioBook",
        index: true,
    },
    createdAt: { type: Date, default: Date.now },

})

module.exports = mongoose.model("RatingAndReviews", ratingAndReviewsSchema);

