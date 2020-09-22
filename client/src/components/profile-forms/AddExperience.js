import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [from, setFrom] = useState('');
  const [current, setCurrent] = useState(false);
  const [to, setTo] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      company,
      location,
      from,
      current,
      to,
      description,
    };

    addExperience(formData, history);

    setTitle('');
    setCompany('');
    setLocation('');
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="* Job Title"
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="* Company"
            name="company"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            name="location"
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
            Current Job
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

AddExperience.propTypes = {
  AddExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
