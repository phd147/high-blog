import React, { Component } from 'react';

class Content extends Component {
    render() {
        return (
            <div className>
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center">
                    <div className="col-md-12">
                        <div className="d-flex flex-row" />
                        <div className="row news-card p-3 bg-white">
                        <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                            <div className="d-flex creator-profile"><img className="rounded-circle" src="./img/hightblog.png" width={50} height={50} />
                            <div className="d-flex flex-column ml-2">
                                <h6 className="username">Alexendor patriot</h6>
                                <span className="date">Jan 20,2020</span>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="news-feed-text">
                            <h2>Green plants are going to extinct about 500 times</h2>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <nav className="navbar-expand-sm">
                            <ul className="navbar-nav">
                                <li className="nav-item mr-3">
                                <a className="nav-link" href="#">#Link 1</a>
                                </li>
                                <li className="nav-item mx-3">
                                <a className="nav-link" href="#">#Link 2</a>
                                </li>
                                <li className="nav-item mx-3">
                                <a className="nav-link" href="#">#Link 3</a>
                                </li>
                            </ul>
                            </nav>
                        </div>
                        <div className="d-flex col-sm-12">
                            <div style={{display: 'inline-flex'}}>
                            <div className="btn btn-group" style={{paddingLeft: 0}}>
                                <div className="btn btn-light">
                                <i className="far fa-heart " />
                                <span className = "mx-1">10</span>
                                Reactions
                                </div>
                            </div>
                            <div className="btn btn-group">
                                <div className="btn btn-light">
                                <i className="far fa-comments" />
                                <span className = "mx-1">50</span>
                                Comments
                                </div>
                            </div>
                            <div className="btn btn-group" style={{paddingLeft: '100px', float: 'right'}}>
                                <span className="mt-2">10 min read</span>
                                <div className="btn btn-light ml-3">
                                Save
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;