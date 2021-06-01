const express = require("express");
const router = express.Router();
const requiredLogin = require("../middleware/requiredLogin");
const userController = require("../database/controller/userController");
const friendController  = require("../database/controller/friendController")
const postController = require("../database/controller/postController")

//User Controller Calls
router.get("/getUserData", requiredLogin,userController.getUserData);
router.put("/updateUserData", requiredLogin,userController.updateUserData);

//Friends Controller Calls

router.get("/getConnectedFriends",requiredLogin,friendController.getConnectedFriendsData);
router.get("/getReceivedFriendCount",requiredLogin,friendController.getReceivedFriendsCount);
router.get("/getSuggesstions",requiredLogin,friendController.getSuggesstions);
router.post("/addFriend",requiredLogin,friendController.addFriend);
router.post("/confirmFriend",requiredLogin,friendController.confirmFriend);
router.post("/rejectFriend",requiredLogin,friendController.rejectFriend);


//Post Controller Calls

//POST
router.post("/createPost",requiredLogin,postController.createPost);
router.post("/createLike",requiredLogin,postController.createLike);
router.post("/createDislike",requiredLogin,postController.createDislike);
router.post("/createComment",requiredLogin,postController.createComment);  
router.post("/createReport",requiredLogin,postController.createReport);
router.post("/deletePost",requiredLogin,postController.deletePost);      

//GET
router.get("/getPosts",requiredLogin,postController.getPosts);
router.get("/getReportedPosts",requiredLogin,postController.getReportedPosts);
router.get("/getMyPostCount",requiredLogin,postController.getMyPostCount);
// router.get("/getLikeCountPerPost",requiredLogin,postController.getLikeCountPerPost);
// router.get("/getDislikeCountPerPost",requiredLogin,postController.getDislikeCountPerPost);
// router.get("/getPostComment",requiredLogin,postController.getComments);
module.exports = router