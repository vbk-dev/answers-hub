import React from 'react';
import PropTypes from 'prop-types';

const TagItem = ({tag}) => {
    return (
        <span className='bg-info text-light py-1 px-2 tag mx-1'>{tag}</span>
    )
}

TagItem.propTypes = {
    tag: PropTypes.string.isRequired
}

export default TagItem;