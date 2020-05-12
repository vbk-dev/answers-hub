import React from 'react';
import {connect} from 'react-redux';
import Moment from 'moment';

const Profile = ({user}) => {

    const {score, firstName, lastName, email, joinedOn} = user;

    return (
        <div className="container my-3 bg-light py-3">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h3>User Profile</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 text-center my-3">
                    <i className="fas fa-user profile-icon text-info"></i>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h3>{firstName} {lastName}</h3>
                    <p className="lead">{email}</p>
                    <p>Joined on {Moment(joinedOn).format('Do MMM YYYY, h:mm A')}</p>
                    <h3>Score: {score}</h3>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Profile);