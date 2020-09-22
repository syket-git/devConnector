import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldofstudy, setFieldofstudy] = useState('');
  const [from, setFrom] = useState('');
  const [current, setCurrent] = useState(false);
  const [to, setTo] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      school,
      degree,
      fieldofstudy,
      from,
      current,
      to,
      description,
    };

    addEducation(formData, history);

    setSchool('');
    setDegree('');
    setFieldofstudy('');
    setFrom('');
    setCurrent(false);
    setTo('');
    setDescription('');
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="* School"
            name="school"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            placeholder="* Degree"
            name="degree"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={fieldofstudy}
            onChange={(e) => setFieldofstudy(e.target.value)}
            placeholder="* Field of Study"
            name="fieldofstudy"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            type="date"
            name="from"
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              value={current}
              onChange={(e) => setCurrent(!current)}
              name="current"
            />{' '}
            Current School
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={current ? null : to}
            onChange={(e) => setTo(e.target.value)}
            disabled={current ? true : false}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
