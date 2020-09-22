import React, { useEffect } from 'react';
import './App.css';
import Landing from './components/layouts/Landing';
import Navbar from './components/layouts/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layouts/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import PrivateRoute from './routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import { Profiles } from './components/profiles/Profiles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from './store';
import { getProfiles } from './actions/profile';
import { getProfileById } from './actions/profile';
import { Profile } from './components/profile/Profile';
import { getCurrentProfile } from './actions/profile';
import { createProfile } from './actions/profile';
import { getGithubRepos } from './actions/profile';
import { Posts } from './components/posts/Posts';
import { addPost, addLike, removeLike, deletePost, getPost, getPosts, addComment, deleteComment } from './actions/post';
import { Post } from './components/post/Post';

if (localStorage.token) {
  setAuthToken(localStorage.token); 
}

export const App = ({
  addLike,
  addPost,
  removeLike,
  deletePost,
  getProfiles,
  getCurrentProfile,
  createProfile,
  auth,
  profile,
  getProfileById,
  getGithubRepos,
  post,
  getPosts,
  getPost, 
  addComment, 
  deleteComment
}) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register" component={Register} />
            <Route path="/profiles">
              <Profiles profile={profile} getProfiles={getProfiles} />
            </Route>
            <Route path="/profile/:id">
              <Profile
                profile={profile}
                auth={auth}
                getProfileById={getProfileById}
                getGithubRepos={getGithubRepos}
              />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/create-profile">
              <CreateProfile />
            </PrivateRoute>
            <PrivateRoute path="/edit-profile">
              <EditProfile
                profile={profile}
                getCurrentProfile={getCurrentProfile}
                createProfile={createProfile}
              />
            </PrivateRoute>
            <PrivateRoute path="/add-experience">
              <AddExperience />
            </PrivateRoute>
            <PrivateRoute path="/add-education">
              <AddEducation />
            </PrivateRoute>
            <PrivateRoute exact path="/posts">
              <Posts
                auth={auth}
                addPost={addPost}
                addLike={addLike}
                removeLike={removeLike}
                deletePost={deletePost}
                getPosts={getPosts}
                post={post}
              />
            </PrivateRoute>
            <PrivateRoute exact path="/posts/:id">
              <Post deleteComment={deleteComment} deletePost={deletePost} addLike={addLike} removeLike={removeLike} auth={auth} addComment={addComment} getPost={getPost} post={post}  />
            </PrivateRoute>
          </Switch>
        </section>
      </div>
    </Router>
  );
};

App.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  getPost : PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {
  getProfiles,
  getProfileById,
  getCurrentProfile,
  createProfile,
  getGithubRepos,
  getPosts,
  addLike,
  removeLike,
  deletePost,
  addPost,
  getPost, 
  addComment, 
  deleteComment
})(App);
