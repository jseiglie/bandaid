const PostClass = require("../class/Posts.class.js");
const responseObject = require("../utils/response.js");
const postController = {};

postController.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { posts, totalItems } = await PostClass.getAllPosts(limit, offset);
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).send(
      responseObject(200, true, "Posts fetched successfully", {
        posts,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          pageSize: limit,
        },
      })
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

postController.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostClass.getPostById(postId);
    res
      .status(200)
      .send(responseObject(200, true, "Post fetched successfully", post));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

postController.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await PostClass.createPost(title, content);
    res
      .status(201)
      .send(responseObject(201, true, "Post created successfully", newPost));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

postController.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const updatedPost = await PostClass.updatePost(postId, title, content);
    res
      .status(200)
      .send(
        responseObject(200, true, "Post updated successfully", updatedPost)
      );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

postController.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostClass.deletePost(postId);
    res
      .status(204)
      .send(responseObject(204, true, "Post deleted successfully", null));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

postController.getPostsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { posts, totalItems } = await PostClass.getPostsByUserId(
      userId,
      limit,
      offset
    );
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).send(
      responseObject(200, true, "Posts by user fetched successfully", {
        posts,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          pageSize: limit,
        },
      })
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

postController.getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await PostClass.getMyPosts(userId);
    res
      .status(200)
      .send(responseObject(200, true, "My posts fetched successfully", posts));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

postController.getPostsByTag = async (req, res) => {
  try {
    const tagName = req.params.tag;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { posts, totalItems } = await PostClass.getPostsByTag(
      tagName,
      limit,
      offset
    );
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).send(
      responseObject(200, true, "Posts by tag fetched successfully", {
        posts,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          pageSize: limit,
        },
      })
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

postController.searchPosts = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res
        .status(400)
        .send(responseObject(400, false, "Search term is required", null));
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { posts, totalItems } = await PostClass.searchPosts(
      searchTerm,
      limit,
      offset
    );
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).send(
      responseObject(200, true, "Posts searched successfully", {
        posts,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          pageSize: limit,
        },
      })
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

postController.getPostsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { posts, totalItems } = await PostClass.getPostsByCategory(
      categoryId,
      limit,
      offset
    );
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).send(
      responseObject(200, true, "Posts by category fetched successfully", {
        posts,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          pageSize: limit,
        },
      })
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

postController.getPostsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res
        .status(400)
        .send(
          responseObject(400, false, "Start and end dates are required", null)
        );
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { posts, totalItems } = await PostClass.getPostsByDateRange(
      startDate,
      endDate,
      limit,
      offset
    );
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).send(
      responseObject(200, true, "Posts by date range fetched successfully", {
        posts,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          pageSize: limit,
        },
      })
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

postController.getPostsByAuthor = async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const posts = await PostClass.getPostsByAuthor(authorId);
    res
      .status(200)
      .send(
        responseObject(200, true, "Posts by author fetched successfully", posts)
      );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

postController.getPostsByPopularity = async (req, res) => {
  try {
    const posts = await PostClass.getPostsByPopularity();
    res
      .status(200)
      .send(
        responseObject(
          200,
          true,
          "Posts by popularity fetched successfully",
          posts
        )
      );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};
postController.uploadPostMedia = async (req, res) => {
  try {
    const files = req.files;
    const folderName = req.body.folder || "posts";
    if (!files || files.length === 0) {
      return res
        .status(400)
        .send(responseObject(400, false, "No files uploaded", null));
    }

    const uploadPromises = files.map((file) =>
      PostClass.uploadPostMedia(file, folderName)
    );

    const uploadResults = await Promise.all(uploadPromises);

    const mediaUrls = uploadResults.map((result) => result.secure_url);

    res
      .status(200)
      .send(
        responseObject(200, true, "Media uploaded successfully", {
          mediaUrls,
        })
      );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

module.exports = postController;
