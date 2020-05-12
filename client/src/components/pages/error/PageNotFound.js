import React from 'react'

const PageNotFound = () => {
    return (
        <div className="container">
            <div className="row mt-5 text-center">
                <div className="col-lg-12">
                    <strong className="display-4 error-title">
                        404 Error Page Not Found 
                    </strong>
                </div>
                <div className="col-lg-12 mt-3">
                    <i className="far fa-frown error-icon text-info"></i>
                </div>
                <div className="col-lg-12 my-3">
                    <h3>Sorry, but the page you are looking for is not found.</h3>
                    <h5>Please make sure you typed the correct url</h5>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
