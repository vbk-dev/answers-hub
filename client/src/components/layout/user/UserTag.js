import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'

const UserTag = ({firstName, lastName, score}) => {
    return (
        <div className="card user-card bg-info py-2 px-3 my-2 text-light ml-auto">
            <strong>Asked by {firstName} {lastName}</strong>
            Score: {score}
            <Link to="/" className="btn btn-outline-light btn-sm">Profile</Link>
        </div>
    )
}

UserTag.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    score: PropTypes.number.isRequired
}

export default UserTag;
