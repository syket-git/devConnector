import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment, getPost } from '../../actions/post';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layouts/Spinner';
import { PostItem } from '../posts/PostItem';
import { CommentForm } from './CommentForm';
import {
  addComment,
  addLike,
  deletePost,
  removeLike,
} from '../../actions/post';
import { CommentItem } from './CommentItem';

export const Post = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  addComment,
  post: { post, loading },
  getPost,
  deleteComment,
}) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem
        deletePost={deletePost}
        addLike={addLike}
        removeLike={removeLike}
        auth={auth}
        showAction={false}
        post={post}
      />
      <CommentForm postId={post._id} addComment={addComment} />
      <div className="comments">
        {post.comment.map((comment) => (
          <CommentItem
            auth={auth}
            deleteComment={deleteComment}
            key={comment._id}
            comment={comment}
            postId={post._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deletePost,
  getPost,
  addComment,
  addLike,
  removeLike,
  deleteComment,
})(Post);
