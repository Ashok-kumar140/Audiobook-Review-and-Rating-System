const AudioBook = require("../models/AudioBook");

exports.LikeBook = async (req, res) => {
    try {

        const userId = req.user.id;
        const { book_id } = req.body;

        const book = await AudioBook.findById(book_id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "No book found",
            })
        }

        console.log("dfe",book.Likes)


        if (book.Likes.includes(userId)) {
            book.Likes.pop(userId)
            console.log(book.Likes);
            await book.save();
        }
        else {

            book.Likes.push(userId)
            console.log(book.Likes);
            await book.save();

        }
        return res.status(200).json({
            success: true,
            message: "Successfully Likes/UnLikes the book",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in Like controller",
            error: error
        })
    }
}