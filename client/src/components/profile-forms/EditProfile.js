import React, { Fragment, useState, useEffect } from 'react';
import { createProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const EditProfile = ({
  profile: { profile, loading },
  getCurrentProfile,
  createProfile,
  history,
}) => {
  const [displaySocialInput, toggleSocialInput] = useState(false);

  const [status, setStatus] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [githubusername, setGithubusername] = useState('');
  const [bio, setBio] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');

  useEffect(() => {
    getCurrentProfile();

    setStatus(loading || !profile.status ? '' : profile.status);
    setCompany(loading || !profile.company ? '' : profile.company);
    setWebsite(loading || !profile.website ? '' : profile.website);
    setLocation(loading || !profile.location ? '' : profile.location);
    setSkills(loading || !profile.skills ? '' : profile.skills.join(','));
    setGithubusername(
      loading || !profile.githubusername ? '' : profile.githubusername
    );
    setBio(loading || !profile.bio ? '' : profile.bio);
    setFacebook(loading || !profile.social ? '' : profile.social.facebook);
    setYoutube(loading || !profile.social ? '' : profile.social.youtube);
    setTwitter(loading || !profile.social ? '' : profile.social.twitter);
    setLinkedin(loading || !profile.social ? '' : profile.social.linkedin);
    setInstagram(loading || !profile.social ? '' : profile.social.instagram);
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      status,
      company,
      website,
      location,
      skills,
      githubusername,
      bio,
      facebook,
      youtube,
      twitter,
      linkedin,
      instagram,
    };

    createProfile(formData, history, true);

    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <h1 id="#scrollTop" className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            name="status"
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            name="company"
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            type="text"
            placeholder="Website"
            name="website"
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            name="location"
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="* Skills"
            name="skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            value={githubusername}
            onChange={(e) => setGithubusername(e.target.value)}
            type="text"
            placeholder="Github Username"
            name="githubusername"
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="A short bio of yourself"
            name="bio"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInput(!displaySocialInput)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInput && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="Twitter URL"
                name="twitter"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="Facebook URL"
                name="facebook"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="YouTube URL"
                name="youtube"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="Linkedin URL"
                name="linkedin"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>

              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Instagram URL"
                name="instagram"
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
