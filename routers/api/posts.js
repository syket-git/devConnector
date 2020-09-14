const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../modals/Post');
const User = require('../../modals/User');
const Profile = require('../../modals/Profile');

//Post Posts in Profile ex: api/post

router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// Get all post ex: api/posts
// des: Get all the posts
// private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send({ msg: 'Server Error' });
  }
});

// Get Specific post using id route: api/posts/:post_id
// Private

router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found!' });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Profile not found!' });
    }
    res.status(500).send('Server Error');
  }
});

// @ Delete Route
// @ This route is delete post using id
// @ Private

router.delete('/:id', auth, async (req, res) => {
  try {
    //console.log("Request dot params value" + req.params.id);
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ msg: 'Post Not Found!' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Post Not Found!' });
    }
    res.status(500).json({ err: 'Server Error' });
  }
});

// @ Like Router /api/posts/likes/:id
// @ Like Route
// @ Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: 'Post Not Found!' });
    }
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ err: 'Post not Found' });
    }
    res.status(500).json({ err: 'Post not found!' });
  }
});

// @ Unlike router api/posts/unlike/:id
// @ Unlike Router
// @ Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: 'Post Not Found!' });
    }

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not been like yet' });
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json({ msg: 'Like removed' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ err: 'Post Not Found!' });
    }
    res.status(500).json({ err: 'Server Not Found!' });
  }
});

// @ Add comment Router api/posts/comment/:id
// @ Add Comment in a post
// Private

router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comment.unshift(newComment);

      await post.save();
      res.json(post.comment);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ err: 'Server Error' });
    }
  }
);

// Delete Comment api/posts/comment/

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //find the comment
    const comment = await post.comment.find(
      (cmnt) => cmnt.id === req.params.comment_id
    );

    //check comment
    if (!comment) {
      return res.status(400).json({ msg: 'Comment not found' });
    }

    //check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized user' });
    }

    const removeIndex = post.comment
      .map((cmnt) => cmnt.user.toString())
      .indexOf(req.user.id);

    post.comment.splice(removeIndex, 1);
    await post.save();
    res.json({ msg: 'Comment Removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: 'Server Error' });
  }
});

module.exports = router;
