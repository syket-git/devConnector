import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, deleteEducation, deleteExperience, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import {Link} from 'react-router-dom';
import DashboardActions from './DashboardActions';
import { Experience } from './Experience';
import { Education } from './Education';


export const Dashboard = ({ getCurrentProfile, deleteAccount, deleteEducation, deleteExperience, auth:{user}, profile: {profile, loading} }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

   function capitalize(name){
      const words = name.split(" ");
      const first= words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      return first.join(" ");
      
   }

  return loading && profile === null ? <Spinner /> : <Fragment>
   
   <h1 className="large text-primary">Dashboard</h1>
   <p className="lead">
     <i className="fas fa-user"></i> Welcome <span style={{fontWeight:'bold'}}>{user && capitalize(user.name)}</span>
   </p>
   {
     profile !== null ? <Fragment>
       <DashboardActions />
       <Experience experience={profile.experience} deleteExperience={deleteExperience} />
       <Education education={profile.education} deleteEducation={deleteEducation} />
       <div className="my-2">
         <button onClick={() => deleteAccount()} className="btn btn-danger">
           <i className="fas fa-user-minus"></i> {' '}
           Delete My Account
         </button>
       </div>
     </Fragment> : <Fragment>
       <p>You have not yet setup profile, please add some info</p>
       <Link to="/create-profile" className="btn btn-primary my-1">
         Create Profile
       </Link>
     </Fragment>
   }

  </Fragment>
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  Education: PropTypes.func.isRequired,
  Experience: PropTypes.func.isRequired, 
  deleteExperience: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired, 
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { Education ,Experience, getCurrentProfile, deleteEducation, deleteAccount, deleteExperience })(Dashboard);
