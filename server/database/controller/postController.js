const postService = require("../service/postService");

exports.createPost = async (req, res) => {
  try {
    const response = await postService.createPost(req);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: "Error Creating Post" });
  }
};

exports.createLike = async (req, res) => {
  try {
    const response = await postService.createLike(req);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: "Error Liking Post" });
  }
};

exports.createDislike = async (req, res) => {
  try{
    const response = await postService.createDislike(req);
    return res.status(200).json(response);
  }
  catch(err)
  {
    return res.status(500).json({ error: "Error Disliking Post" });
  }

};

exports.createComment = async (req, res) => {
  try{
    const response = await postService.createComment(req);
    return res.status(200).json(response);
  }
  catch(err)
  {
    return res.status(500).json({ error: "Error Commenting Post" });
  }

};

exports.createReport = async (req, res) => {
  try{
    const response = await postService.createReport(req);
    return res.status(200).json(response);
  }
  catch(err)
  {
    return res.status(500).json({ error: "Error Reporting Post" });
  }
};

exports.deletePost = async (req, res) => {
  try{
    const response = await postService.deletePost(req);
    return res.status(200).json(response);
  }
  catch(err)
  {
    return res.status(500).json({ error: "Error Deleting Post" });
  }

};

exports.getPosts = async (req, res) => {
  try{
    const response = await postService.getPosts(req.query);
      // console.log(response)
    return res.status(200).json(response);
  }
  catch(err)
  {
    console.log(err)
    return res.status(500).json({ error: "Error Fetching Post" });
  }

};

exports.getReportedPosts = async (req, res) => {
  try
  {
    const response = await postService.getReportedPosts(req.query);
    //   console.log(response)
    return res.status(200).json(response);
  }
  catch(err)
  {
    return res.status(500).json({ error: "Error Fetching Reported Post" });
  }

};

exports.getMyPostCount = async (req, res) => {
  try{
    const response = await postService.getMyPostsCount(req);
    //   console.log(response)
    res.json(response);
  }
  catch(err)
  {
    return res.status(500).json({ error: "Error Fetching Post Count" });
  }

};

// module.exports.getLikeCountPerPost = async (req, res) => {
//   const response = await postService.getLikesCount(req);
//   res.json(response);
// };

// module.exports.getDislikeCountPerPost = async (req, res) => {
//     const response = await postService.getDislikesCount(req);
//     res.json(response);
//   };

// module.exports.getComments = async (req, res) => {
//   const response = await postService.getComments(req.body);
//   res.json(response);
// };
