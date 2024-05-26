const express = require("express")
const router = express.Router()

const { login, signUp, sendOtp } = require('../controllers/Auth');
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");


router.post("/login", login)
router.post("/signup", signUp)
router.post("/sendotp", sendOtp)

router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)


module.exports = router;