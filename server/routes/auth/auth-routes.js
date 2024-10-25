const express = require("express");
const {
  registerUSer,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUSer);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    messaeg: 'Authenticated user',
    user
  })
});
module.exports = router;
