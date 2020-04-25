import React from 'react'
import PropTypes from 'prop-types';

const Voter = ({ votes, upVoteHandler, downVoteHandler }) => {
    return (
        <div className="vote">
            <div className="vote-container">
                <i className="fas fa-thumbs-up voting-icon text-success" onClick={upVoteHandler}></i>
                <h4><strong>Votes</strong></h4 >
                <h1 className="display-4" ><strong>{votes}</strong></h1>
                <i className="fas fa-thumbs-down voting-icon text-danger" onClick={downVoteHandler} ></i>
            </div>
        </div>
    )
}

Voter.propTypes = {
    vote: PropTypes.number.isRequired,
    upVoteHandler: PropTypes.func.isRequired,
    downVoteHandler: PropTypes.func.isRequired
}

export default Voter;
