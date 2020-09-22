import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import ProfilesItems from './ProfilesItems';
import { getProfiles } from '../../actions/profile';

export const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" aria-hidden="true"></i> Browse
            and connect with developers
          </p>
          <div className="profiles">
            {profiles.length < 0 || profiles === undefined ? (
              <h4>No Profiles Found!</h4>
            ) : (
              profiles.map((pfl) => (
                <ProfilesItems key={pfl._id} profile={pfl} />
              ))
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
