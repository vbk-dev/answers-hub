import React, {useState} from 'react';

const SearchBar = () => {
    const [search, setSearch] = useState('');

    return (
        <div className="container">
            <form action='/' method="get">
                <div className="row">
                    <div className="col-lg-10 col-md-9 col-sm-9 mt-3">
                        <input type="text" className="form-control" name='search' placeholder='Have a question? Search here' value={search}
                            onChange={ event => { setSearch(event.target.value); } } />
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-3 mt-3">
                        <input type="submit" value="Search" className='btn btn-info btn-block' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;