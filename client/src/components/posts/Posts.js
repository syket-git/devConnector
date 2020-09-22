import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import PostItem from './PostItem';
import {
  addPost,
  getPosts,
  addLike,
  removeLike,
  deletePost,
} from '../../actions/post';
import PostForm from './PostForm';
export const Posts = ({
  addLike,
  addPost,
  removeLike,
  deletePost,
  getPosts,
  post: { posts, loading },
  auth: { user },
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Hi,
            <span style={{ fontWeight: 'bold' }}>
              {user.name.trim().split(' ')[0]}
            </span>
            ! Welcome to the community
          </p>
          <PostForm addPost={addPost} />
          <div className="posts">
            {posts.map((post) => (
              <PostItem
                addLike={addLike}
                removeLike={removeLike}
                deletePost={deletePost}
                key={post._id}
                post={post}
              />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPosts,
  addLike,
  removeLike,
  deletePost,
  addPost,
})(Posts);
