import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { newsFeedAction } from '../../store/action/newsFeedActions';
import NewsFeedView from '../../components/NewsFeedView';
import Dashboard from '../../components/Dashboard';


function NewsFeed() {
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
            <Dashboard/>
            <div className="container row col-sm-8 mb-5">
                {getData()}
            </div>
        </div>
        
    );
}

export default NewsFeed

