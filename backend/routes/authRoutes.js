const express = require("express");
const { protect } = require("../middleware/authMiddleware");
// const protect = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    getUserInfo
} = require("../controllers/authController");
const upload = require("../middleware/updateMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image",upload.single("image"),(req,res) => {
    if(!req.file) {
        return res.status(400).json({message:"No file uploaded"});
    }
    const imgeUrl =`${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`; 
    res.status(200).json({imageUrl:imgeUrl});
})


module.exports = router;