import React, {Fragment} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Alert = ({alert}) => {
    return (<Fragment>
        {alert && (<div className='row'>
            <div className="col-lg-8 mx-auto ">
                <div className={`alert px-5 alert-${alert.alertType}`} role="alert">
                    {alert.msg}
                </div>
            </div>
        </div>)}
    </Fragment>)
}

Alert.propTypes = {
    alert: PropTypes.object
};

const mapStateToProps = state => ({
    alert: state.alert
})

export default connect(mapStateToProps)(Alert);
