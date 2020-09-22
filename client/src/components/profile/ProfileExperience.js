import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

export const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => (
  <div>
    <h3 className="text-dark">{company}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{from}</Moment>-{' '}
      {current ? ' Now' : <Moment format="YYY/MM/DD">{to}</Moment>}
    </p>
    <p>
      <strong>Position: </strong>
      {title}
    </p>
    <p>
      <strong>Description: </strong>
      {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default connect(null)(ProfileExperience);
