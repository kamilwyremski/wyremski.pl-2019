import React, { Component } from 'react';
import './Preloader.scss';

class Preloader extends Component {
    render() {
        return (
            <div className="preloader d-flex">
                <div className="cssload-container">
                <div className="cssload-loading"><i></i><i></i><i></i><i></i></div>
                </div>
            </div>
        )
    }
}

export default Preloader;