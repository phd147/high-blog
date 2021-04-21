import React, {useCallback, useEffect, useState} from 'react';

import PostService from "./Post.service";


import Post from './Post/Post';

import InfiniteScroll from 'react-infinite-scroller';

import cs from 'classnames';

import classnames from './Posts.module.css';
import PostLoading from "../../components/PostLoading/PostLoading";

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

            <InfiniteScroll
                pageStart={0}
                loadMore={loadmoreFunction}
                hasMore={hasMoreItem}
                loader={<PostLoading/>}
            >
                {items}
            </InfiniteScroll>
        </div>
    )
}