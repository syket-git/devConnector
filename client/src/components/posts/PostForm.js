import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {addPost} from '../../actions/post';

export const ProfileForm = ({addPost}) => {
    const [text, setText] = useState('');
    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={e => {
            e.preventDefault();
            addPost({text});
            setText('');
            window.scrollTo(0, 0);
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

ProfileForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, {addPost})(ProfileForm)
