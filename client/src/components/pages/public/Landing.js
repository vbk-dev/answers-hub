import React from 'react';

import {connection} from '../../../utils/network-utils';

const Landing = () => {

    const getRouteHandler = async event => {
        console.log('Test Begin');
        try {
            const res = await connection.get('/');

            console.log('Response from server: ', res.data.msg);
        } catch (error) {
            console.error(error);
        }
        console.log('Test End');
    }

    return (
        <div>
            <button onClick={getRouteHandler} className='btn btn-lg btn-warning'>Testing GET Route</button>
        </div>
    )
}

export default Landing
