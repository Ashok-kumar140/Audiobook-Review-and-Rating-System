const AudioBook = require('../models/AudioBook');

exports.getAudiobooks = async (req, res) => {

    try {

        let audiobooks = await AudioBook.find({}).populate("audiobookRatingAndReviews");

        res.status(200).json({
            success: true,
            message: "All audio books fetched successfully",
            audiobooks: audiobooks
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error while fetching audio books",
            error: error
        })

    }

}


exports.getFullDetailsOfAudiobook = async (req, res) => {

    try {

        const { audiobookId } = req.body;

        console.log("H")

        let audiobook = await AudioBook.findById({ _id: audiobookId });

        if (!audiobook) {
            return res.status(404).json({
                success: false,
                message: "Please provide valid audiobook Id",
            })
        }
        console.log("H")

        return res.status(200).json({
            success: true,
            message: "Audio book details fetched successfully",
            audiobook
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in the get full details of audiobook controller",
            error: error
        })
    }
}

exports.userLikedbooks = async (req, res) => {
    try {
        const userId = req.user.id;

        const response = await AudioBook.find();
        let books = [];
        for (let i = 0; i < response.length; i++) {

            if (response[i].Likes.includes(userId)) {
                books.push(response[i]);
            }
        }
        return res.status(200).json({
            success: "true",
            message: "All books fetched which are liked by you",
            books: books
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error while fetching user liked books",
            error: error
        })


    }
}


exports.createAudiobook = async (req, res) => {
    try {

        const { author, title, description, thumbnail, audioUrl, genre, duration, authorProfile } = req.body;

        if (!author || !title || !description || !thumbnail || !audioUrl || !genre) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const audiobook = await AudioBook.create({
            author, audioUrl, title, description, thumbnail, genre, duration, authorProfile
        });
        return res.status(200).json({
            success: true,
            message: "Audio book created",
            audiobook: audiobook
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while creating audio books",
            error: error
        })
    }
}