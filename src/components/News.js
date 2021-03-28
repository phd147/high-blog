import React, { Component } from 'react';

class Feed extends Component {
    render() {
        return (
            <div className="col-10">
            <div className="container mt-5 mb-5">
                <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="d-flex flex-row m-1">
                    <img className="img-content" src="img/panel.jpg" />
                    </div>
                    <div className="row news-card p-3 mx-1 bg-white">
                    <div className="col-12">
                        <div className="news-feed-text">
                        <h2>Green plants are going to extinct about 500 times</h2>
                        </div>
                    </div>
                    <div className="col-12">
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
                    <div className="d-flex flex-row justify-content-between align-items-center mb-2 pl-3">
                        <div className="d-flex creator-profile"><img className="rounded-circle" src="img/hightblog.png" width={50} height={50} />
                        <div className="d-flex flex-column ml-2">
                            <h6 className="username">Alexendor patriot</h6>
                            <span className="date">Jan 20,2020</span>
                        </div>
                        </div>
                    </div>
                    <div className="content bg-white">
                        <p className="p-3 text">
                        By adding support for JWT authentication, developers can perform actions on behalf of their users and create a lot of new
                        use-cases.With the new JWT support combined with Cloud Functions and the Appwrite Server API, the ability to customize
                        your backend workflows and create new scenarios in reaction to the user or Appwrite events is endless.
                        </p>
                        <hr />
                    </div>
                    {/* comment start */}
                    <div className="row col-12">
                        <div className="col-12">
                        <h1 className='text'>
                            Comment(1)
                        </h1>
                        </div>
                        <div className="col-12 bg-light p-2">
                        <div className="d-flex flex-row align-items-start"><img className="rounded-circle" src="img/01.jpg" width={40} /><textarea className="form-control ml-1 shadow-none textarea" defaultValue={""} /></div>
                        <div className="mt-2 text-right"><button className="btn btn-primary btn-sm shadow-none" type="button">Post comment</button><button className="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button">Cancel</button></div>
                        </div>
                        <hr />
                    </div>
                    {/* comment start */}
                    {/* read next start */}
                    <div className="row col-lg-12 d-flex">
                        <div className="col-12">
                        <h1 className="text">
                            Read more
                        </h1>
                        </div>
                        <div className="col-lg-2">
                        <div className="p-2">
                            <img className="img-fluid rounded-circle" src="img/01.jpg" alt="" />
                        </div>
                        </div>
                        <div className="col-lg-10">
                        <div className="p-2 text">
                            <h2 className="display-9">For those about to rock...</h2>
                            <p>tac gia - ngay viet</p>
                        </div>
                        </div>
                    </div>
                    {/* read next end */}
                    </div>
                </div>
                </div>
            </div>
            </div>

        );
    }
}

export default Feed;