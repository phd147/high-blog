import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        return (
            <div className="col-sm-2">
                <div className="sidebar">
                    <a className="navbar">
                    <img className="rounded-circle img_avatar" href = "" src = "./img/01.jpg"></img>
                    <span className="ml-2">Tên người dùng</span>
                    </a>
                    <a className="navbar">
                    <img className="rounded-circle img_avatar" href = "" src = "./img/star.png"></img>
                    <span className="ml-2">Favorite</span>
                    </a>
                    <a className="navbar">
                    <img className="rounded-circle img_avatar" href = "" src = "./img/tag.png"></img>
                    <span className="ml-2">Tags</span>
                    </a>
                </div>
            </div>

        );
    }
}

export default Dashboard;