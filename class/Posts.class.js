const PostsModel = require("../models/").Posts;

module.exports = class Posts {
  static async getAllPosts() {
    try {
      const posts = await PostsModel.findAll();
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }
  static async getPostById(id) {
    try {
      if (!id) {
        throw new Error("Post ID is required");
      }
      const post = await PostsModel.findByPk(id);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  }
  static async createPost(postData) {
    try {
      if (!postData || !postData.title || !postData.content) {
        throw new Error("Post title and content are required");
      }
      const newPost = await PostsModel.create(postData);
      return newPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  static async updatePost(id, postData) {
    try {
      if (!id || !postData) {
        throw new Error("Post ID and data are required");
      }
      const post = await PostsModel.findByPk(id);
      if (!post) {
        throw new Error("Post not found");
      }
      const updatedPost = await post.update(postData);
      return updatedPost;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }
  static async deletePost(id) {
    try {
      if (!id) {
        throw new Error("Post ID is required");
      }
      const result = await PostsModel.destroy({
        where: { id },
      });
      return result > 0; // Returns true if a post was deleted
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }
  static async searchPosts(searchTerm) {
    try {
      if (!searchTerm) {
        throw new Error("Search term is required");
      }
      const posts = await PostsModel.findAll({
        where: {
          title: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
      });
      return posts;
    } catch (error) {
      console.error("Error searching posts:", error);
      throw error;
    }
  }
  static async getPostsByUserId(userId) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }
      const posts = await PostsModel.findAll({
        where: { author_id: userId },
      });
      return posts;
    } catch (error) {
      console.error("Error fetching user posts:", error);
      throw error;
    }
  }
  static async getPostsByTag(tag) {
    try {
      if (!tag) {
        throw new Error("Tag is required");
      }
      const posts = await PostsModel.findAll({
        where: {
          tags: {
            [Op.like]: `%${tag}%`,
          },
        },
      });
      return posts;
    } catch (error) {
      console.error("Error fetching posts by tag:", error);
      throw error;
    }
  }
  static async getPostsByDateRange(startDate, endDate) {
    try {
      if (!startDate || !endDate) {
        throw new Error("Start date and end date are required");
      }
      const posts = await PostsModel.findAll({
        where: {
          createdAt: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        },
      });
      return posts;
    } catch (error) {
      console.error("Error fetching posts by date range:", error);
      throw error;
    }
  }
  static async getPostsByCategory(category) {
    try {
      if (!category) {
        throw new Error("Category is required");
      }
      const posts = await PostsModel.findAll({
        where: { category },
      });
      return posts;
    } catch (error) {
      console.error("Error fetching posts by category:", error);
      throw error;
    }
  }
  static async getPostsByPopularity() {
    try {
      const posts = await PostsModel.findAll({
        order: [["likes_count", "DESC"]],
      });
      return posts;
    } catch (error) {
      console.error("Error fetching popular posts:", error);
      throw error;
    }
  }
  static async getPostsByAuthor(author) {
    try {
      if (!author) {
        throw new Error("Author is required");
      }
      const posts = await PostsModel.findAll({
        where: { author },
      });
      return posts;
    } catch (error) {
      console.error("Error fetching posts by author:", error);
      throw error;
    }
  }
};
