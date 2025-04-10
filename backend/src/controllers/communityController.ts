import { Request, Response } from 'express';
import CommunityPost from '../models/Community';

// Get all posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await CommunityPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

// Get a single post
export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
};

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { title, content, category, tags } = req.body;
    const author = {
      id: req.user._id,
      name: req.user.email.split('@')[0], // Using email prefix as name
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(req.user.email.split('@')[0])}`,
      role: req.user.role,
    };

    const post = new CommunityPost({
      title,
      content,
      author,
      category,
      tags,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

// Update a post
export const updatePost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user is the author of the post
    if (post.author.id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const { title, content, category, tags } = req.body;
    post.title = title;
    post.content = content;
    post.category = category;
    post.tags = tags;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user is the author of the post
    if (post.author.id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};

// Increment view count
export const incrementViews = async (req: Request, res: Response) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.views += 1;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error incrementing views', error });
  }
};

// Add a comment to a post
export const addComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    post.comments.push({
      content,
      author: req.user._id,
      createdAt: new Date(),
    });
    
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
};

// Like a post
export const likePost = async (req: Request, res: Response) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error liking post' });
  }
}; 