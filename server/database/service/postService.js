const { postModel } = require("../model/post");
const { commentModel } = require("../model/comment");
const { likeModel } = require("../model/like");
const { Error } = require("mongoose");

module.exports.createPost = async (req) => {
  try {
    const { id } = req;
    const { caption, images } = req.body;
    // // console.log(images,caption,id)
    if (!id || !caption || !images) {
      return { error: "Please Add All Fields" };
    }
    const subData = await postModel.create({
      postedBy: id,
      caption: caption,
      images: images,
    });
    // const mainData = await postModel.findOneAndUpdate(
    //   {
    //     postedBy: id,
    //     _id: subData._id,
    //   },
    //   {
    //     $push: { images: images },
    //   }
    // );
    // console.log(id , caption ,images);
    // console.log(mainData);
    return subData;
    // console.log(req.body.images)
  } catch (err) {
    throw err;
  }
};

module.exports.createReport = async (req) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return { error: "Please Add All Fields" };
    }
    const data = await postModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { reportCount: 1 } }
    );
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports.createDelete = async (req) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return { error: "Please Add All Fields" };
    }
    const data = await postModel.findOneAndDelete({ _id: postId });
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports.deletePost = async (req) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return { error: "Please Add All Fields" };
    }
    const deleteComment = await commentModel.findOneAndDelete({ post: postId });
    const deleteLike = await likeModel.findOneAndDelete({ post: postId });
    const postDelete = await postModel.findOneAndDelete({ _id: postId });
    return postDelete;
  } catch (err) {
    throw err;
  }
};

module.exports.createComment = async (req) => {
  try {
    const { id } = req;
    const { postId, comment } = req.body;
    // console.log(images,caption,id)
    if (!id || !postId || !comment) {
      return { error: "Please Add All Fields" };
    }
    const data = await commentModel.create({
      postedBy: id,
      post: postId,
      comment: comment,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports.createLike = async (req) => {
  try {
    const { id } = req;
    const { postId } = req.body;

    // console.log(images,caption,id)
    if (!id || !postId) {
      return { error: "Please Add All Fields" };
    }
    const data = await likeModel.findOneAndUpdate(
      { post: postId, postedBy: id },
      { status: "like" },
      { upsert: true }
    );
    return data;
  } catch (err) {
    throw err;
  }
};
module.exports.createDislike = async (req) => {
  try {
    const { id } = req;
    const { postId } = req.body;
    // console.log(images,caption,id)
    if (!id || !postId) {
      return { error: "Please Add All Fields" };
    }
    const data = await likeModel.findOneAndUpdate(
      { post: postId, postedBy: id },
      { status: "dislike" },
      { upsert: true }
    );
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports.getPosts = async ({skip,limit}) => {
  try {
    // console.log(skip,limit)
    const allPosts = await postModel
      .find(null, { updatedAt: 0 }, { skip: +skip, limit: +limit })
      .sort({createdAt:-1})
      .populate("postedBy", {
        createdAt: 0,
        updatedAt: 0,
        role: 0,
        email: 0,
        coverImage: 0,
        _id: 0,
      })

    // let data = allPosts.slice();

    const data = await getNewPostObject(allPosts);
    // console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports.getReportedPosts = async ({skip,limit}) => {
  try {
    // console.log("in report cotroler")
    // console.log(skip,limit)
    const allReportedPosts = await postModel
      .find({ reportCount: { $gt: 0 } }, { updatedAt: 0 },{ skip: +skip, limit: +limit })
      .populate("postedBy", {
        createdAt: 0,
        updatedAt: 0,
        role: 0,
        email: 0,
        coverImage: 0,
        _id: 0,
      })
      .sort({ reportCount: -1 });
    // let data = allPosts.slice();
    // console.log(allReportedPosts)
    const data = await getNewPostObject(allReportedPosts);
    //   console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

const getNewPostObject = async (allPosts) => {
  try {
    let data = await Promise.all(
      allPosts.map(async (item) => {
        let likeObject = null;
        let dislikeObject = null;
        let commentObject = null;
        let newObj = null;
        let likeCount = await getLikesCount(item._id);
        let dislikeCount = await getDislikesCount(item._id);
        let comments = await getComments(item._id);
        likeObject = {
          like: likeCount,
        };
        dislikeObject = {
          dislike: dislikeCount,
        };
        commentObject = {
          comments: comments,
        };
        return (newObj = {
          ...item.toJSON(),
          ...likeObject,
          ...dislikeObject,
          ...commentObject,
        });
      })
    );
    return data;
  } catch (err) {
    throw err;
  }
};

const getLikesCount = async (id) => {
  try {
    const postLikes = await likeModel
      .find({ post: id, status: "like" })
      .countDocuments();
    return postLikes;
  } catch (err) {
    throw err;
  }
};

const getDislikesCount = async (id) => {
  try {
    const postDislikes = await likeModel
      .find({ post: id, status: "dislike" })
      .countDocuments();
    return postDislikes;
  } catch (err) {
    throw err;
  }
};

const getComments = async (id) => {
  try {
    //   console.log(id);
    const commentData = await commentModel
      .find({ post: id }, { createdAt: 0, updatedAt: 0, _id: 0, post: 0 })
      .populate("postedBy", { firstname: 1, lastname: 1, profileImage: 1 });
    return commentData;
  } catch (err) {
    throw err;
  }
};

module.exports.getMyPostsCount = async ({ id }) => {
  try {
    const myPostCount = await postModel.find({ postedBy: id }).countDocuments();
    return myPostCount;
  } catch (err) {
    throw err;
  }
};
