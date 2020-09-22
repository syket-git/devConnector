import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const Routes = () => {
    return (
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
              <Post
                deleteComment={deleteComment}
                deletePost={deletePost}
                addLike={addLike}
                removeLike={removeLike}
                auth={auth}
                addComment={addComment}
                getPost={getPost}
                post={post}
              />
            </PrivateRoute>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </section>
    )
}

Routes.propTypes = {
    prop: PropTypes
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
