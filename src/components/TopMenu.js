import { CardActions } from '@material-ui/core';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class TopMenu extends Component {
    render() {
        return (
            <header className="main-navbar main-navbar__group py-1">
                <div className="main-navbar__container container px-md-0">
                    <div className="main-navbar__left">
                    <a href="#" className="main-navbar__logo d-block mr-lg-5">
                        <img src="./img/highblog.png" alt="ko hien thi" />
                    </a>
                    <ul className="main-menu list-unstyled hidden-md-down">
                        <li className="main-menu__item">
                        <NavLink to="/post" className="link">
                            News Feed
                        </NavLink>
                        </li>
                        <li className="main-menu__item">
                        <NavLink to="/Questions" className="link">
                            <div className="el-badge badge-has-new">
                            Questions
                            <sup className="el-badge__content el-badge__content--undefined is-fixed" style={{display: 'none'}}>
                            </sup>
                            </div>
                        </NavLink>
                        </li>
                        <li className="main-menu__item">
                        <NavLink to="/Discussions" className="link">
                            Discussions
                        </NavLink>
                        </li>
                    </ul>
                    </div>
                    <div className="main-navbar__right">
                    <div className="sb hidden-sm-down flex-fill mr-1">
                        <input placeholder="Search in HighBlog" className="sb__input" />
                        <button className="btn btn-primary">
                        <i className="fa fa-search" />
                        </button>
                    </div>
                    <div className="main-navbar__group ml-5 my-1">
                        <ul className="main-menu list-unstyled hidden-md-down">
                        <li className="main-menu__log mr-3">
                            <a href="/questions" className="link">
                            Log In
                            </a>
                        </li>
                        <li className="main-menu__log m-3">
                            <a href="/discussion" className="btn btn-block btn-success">
                            Create Account
                            </a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default TopMenu;