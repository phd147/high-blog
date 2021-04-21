import React, {useCallback, useEffect, useState} from 'react';

import PostService from "./Post.service";
import moment from "moment";

import Post from './Post/Post';

import InfiniteScroll from 'react-infinite-scroller';

import cs from 'classnames';

import classnames from './Posts.module.css';

export default function Posts(props){

    const [posts,setPosts] = useState([]);
    const [hasMoreItem,setHasMoreItem] = useState(true);


    const loadmoreFunction = useCallback(async (page) => {
        console.log({page});
        const params = {
            page : page ,
            pageSize : 10
        }
        try {
            const res = await PostService.getListPost(params);
            const data = res.data ;
            setPosts(oldItems => [...oldItems,...data.items]);
        }
        catch(err){

            setHasMoreItem(false);
        }



    },[])



    useEffect( () => {
        const fetchData = async () => {
            const params = {
                page : 0 ,
                pageSize : 10
            }
            const res = await PostService.getListPost(params);
            console.log(res);
        }
        fetchData();

    },[]);

    const items = posts.map((el, index) => {
        return <Post data={el} key={index}/> ;
    })


    return (
        <div className={cs(classnames.hb_posts)}>
            {moment('1970-01-01').set('millisecond',1618239547478).format()}
            {moment.locale()}
            <InfiniteScroll
                pageStart={0}
                loadMore={loadmoreFunction}
                hasMore={hasMoreItem}
                loader={<div>... Loading</div>}
            >
                {items}
            </InfiniteScroll>
        </div>
    )
}