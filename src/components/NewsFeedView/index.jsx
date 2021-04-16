import React from 'react'
import PropTypes from 'prop-types'

const getData = (tags) =>{
        
    if(tags){
        return tags.map((value, key)=>{
            //key = {key}
            return (
                <li className="nav-item mx-3">
                    <a className="nav-link" href="#"># {value.name}</a>
                </li> 
            )
        })
    }
}
function NewsFeedView(props) {
    return (
        <div className>
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
            <div className="col-md-12">
                <div className="d-flex flex-row" />
                <div className="row news-card p-3 bg-white">
                <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                    <div className="d-flex creator-profile"><img className="rounded-circle" src="./img/highblog.png" width={50} height={50} />
                    <div className="d-flex flex-column ml-2">
                        <h6 className="username">{props.name}</h6>
                        <span className="date">{props.date}</span>
                    </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="news-feed-text">
                    <h2>{props.title}</h2>
                    </div>
                    <h7>{props.summary}</h7>
                </div>
                <div className="col-sm-12">
                    <nav className="navbar-expand-sm">
                    <ul className="navbar-nav">
                        {getData(props.tags)}
                    </ul>
                    </nav>
                </div>
                <div className="d-flex col-sm-12">
                    <div style={{display: 'inline-flex'}}>
                    <div className="btn btn-group" style={{paddingLeft: 0}}>
                        <div className="btn btn-light">
                        <i className="far fa-heart " />
                        <span className = "mx-1">{props.numberOfVote}</span>
                        Vote
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
    )
}

export default NewsFeedView

