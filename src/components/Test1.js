import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { newsFeedAction } from '../store/action/newsFeedActions';
import NewsFeedView from './NewsFeedView';

export default function Test1() {
    console.log('chay 1 ')
    const newsFeed = useSelector((state) => state.newsFeed);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(newsFeedAction());
    },[dispatch]);
    const getData = () =>{
        if(newsFeed.payload.items)
            return newsFeed.payload.items.map((value,key)=>{
                console.log("ket qua " + value.title)
                return (
                    <NewsFeedView 
                        key = {key}
                        name = {value.user.nickName}
                        date = {value.createdDate}
                        title = {value.title}
                        numberOfVote = {value.numberOfVotes}
                    />
                )
            })
            
    }
    return (
        <div>
            {
            getData()
            }
            <h1>Vao nhe</h1>
            {/* <NewsFeedView
        name = {newsFeed.paylooad.user.nickName}
        date = {newsFeed.paylooad.createdDate}
        title = {newsFeed.paylooad.title}
        numberOfVote = {newsFeed.paylooad.numberOfVote}
        /> */}
        </div>
        
    )
}
