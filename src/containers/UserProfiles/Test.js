import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { newsFeedAction } from '../../store/action/newsFeedActions';
import NewsFeedView from '../../components/NewsFeedView';
import Dashboard from '../../components/Dashboard';


function Test() {
    const newsFeed = useSelector((state) => state.newsFeed);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(newsFeedAction());
    },[dispatch]);
    const getData = () =>{
        console.log("ket qua la xin chao")

        if(newsFeed.payload.items){
            return newsFeed.payload.items.map((value, key)=>{
                let a = Number(value.createdDate)
                let date = new Date(a)
                // let dateTime = moment(value.createdDate*1000).format('MM-YYYY');
                // console.log(dateTime)
                return (
                    <NewsFeedView 
                        key = {key}
                        id = {value.id}
                        name = {value.user.nickName}
                        date = {date.toDateString()}
                        title = {value.title}
                        numberOfVote = {value.numberOfVotes}
                        tags = {value.tags}
                        summary = {value.summary}
                    />
                )
            })
        }else{
            return <h1>Chưa có dữ liệu à</h1>
        }
    }
    return (
        <div className="container d-flex">
            <div className="container row col mb-5">
            <div className>
        <div className="container">
            <div className="row d-flex justify-content-center">
            <div className="col-md-12">
                <div className="d-flex flex-row" />
                <div className="row news-card p-3 bg-white">
                <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                    <div className="d-flex creator-profile"><img className="rounded-circle" src="./../../../img/highblog.png" width={50} height={50} />
                    <div className="d-flex flex-column ml-2">
                        <h6 className="username">Tuấn Thành</h6>
                        <span className="date">Jun, 25, 2020</span>
                    </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="news-feed-text">
                    <h2>no title</h2>
                    </div>
                    <h7>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h7>
                </div>
                <div className="col-sm-12">
                    <nav className="navbar-expand-sm">
                    <ul className="navbar-nav">
                        <li className="nav-item mx-3">
                        <a className="nav-link" href="#"># Hello</a>
                    </li> 
                    </ul>
                    </nav>
                </div>
                <div className="d-flex col-sm-12">
                    <div style={{display: 'inline-flex'}}>
                    <div className="btn btn-group" style={{paddingLeft: 0}}>
                        <div className="btn btn-light">
                        <i className="far fa-heart " />
                        <span className = "mx-1">15</span>
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
            </div>
        </div>
        
    );
}

export default Test

