import React from 'react';
import SpinnerGif from '../../img/spinner.gif'
const Spinner = () => {
    return (
        <div style={{textAlign:'center'}}>
            <img style={{width: 'fit-content'}} src={SpinnerGif} alt="Loading..."/>
        </div>
    );
};

export default Spinner;