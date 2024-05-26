const mongoose = require('mongoose');

const AudioBookSchema = new mongoose.Schema({
    audioUrl: {
        type: String,
        require: true,

    },
    title: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    thumbnail: {
        type: String,
        require: true,

    },
    genre: {
        type: String,
        trim: true
    },
    duration: {
        type: String,
        trim: true,
    },
    author: {
        type: String,
        trim: true,
    },
    audiobookRatingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReviews"

    }],
    Likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    createdAt: { type: Date, default: Date.now },
    authorProfile: {
        type: String,

    }

});

module.exports = mongoose.model("AudioBook", AudioBookSchema);