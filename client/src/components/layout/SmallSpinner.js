import React, { Fragment } from 'react'

import spinner from '../../assets/small-loading.gif';

const SmallSpinner = () => {
    return (
        <Fragment>
            <img src={spinner} alt="Loading..." />
        </Fragment>
    )
}

export default SmallSpinner;
