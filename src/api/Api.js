const BASE_URL = process.env.REACT_APP_BASE_URL

export const userEndPoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const audiobookEndPoints = {
  GET_AUDIOBOOK_LIST_API: BASE_URL + "/audiobook/getAudiobooks",
  GET_FULL_DETAILS_OF_AUDIOBOOK_API: BASE_URL + "/audiobook/getFullDetailsOfAudiobook",
  LIKE_AND_UNLIKE_BOOK_API: BASE_URL + "/audiobook/LikeBook",
  USER_LIKED_BOOK_API: BASE_URL + "/audiobook/userLikedbooks"
}

export const reviewAndRatingEndPoints = {
  GET_ALL_REVIEWS_API: BASE_URL + "/audiobook/getAllReviews",
  CREATE_REVIEW_API: BASE_URL + "/audiobook/createReview",
}