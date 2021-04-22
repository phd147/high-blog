import React, {useCallback, useEffect, useState} from 'react';

import PostService from "./Post.service";


import * as PostsType from './TypeOfPost';

import Post from './Post/Post';

import InfiniteScroll from 'react-infinite-scroller';

import cs from 'classnames';

import classnames from './Posts.module.css';
import PostLoading from "../../components/PostLoading/PostLoading";

export default function Posts(props){

    const type = props.type ;

    const initialParams = props.initialParams ;

    let fetchListPost = null ;


    // post type
    switch (type){

        case (PostsType.HOME_TYPE)  :
            fetchListPost = PostService.getListPost;
            break ;




        default :
            console.log('default ');
    }





    const [posts,setPosts] = useState([]);
    const [hasMoreItem,setHasMoreItem] = useState(true);


    const loadmoreFunction = useCallback(async (page) => {
        console.log({page});

        const loadMoreParams = {
            page : page ,
            pageSize : 10
        }


        try {
            const res = await PostService.getListPost(loadMoreParams);
            const data = res.data ;
            setPosts(oldItems => [...oldItems,...data.items]);
        }
        catch(err){

            setHasMoreItem(false);
        }



    },[])



    useEffect( () => {
        const fetchData = async () => {

            const res = await fetchListPost.call(PostService,initialParams);
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