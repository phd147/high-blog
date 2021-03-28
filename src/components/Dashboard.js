import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        return (
            <div className="col-sm-2">
                <div className="sidebar">
                    <a className="navbar">
                    <i className="far fa-newspaper" />
                    <span className="ml-2">News Feed</span>
                    </a>
                </div>
            </div>

        );
    }
}

export default Dashboard;