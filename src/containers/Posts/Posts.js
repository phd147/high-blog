import React, { useCallback, useEffect, useState } from "react";

import PostService from "./Post.service";

import * as PostsType from "./TypeOfPost";

import Post from "./Post/Post";

import InfiniteScroll from "react-infinite-scroller";

import cs from "classnames";

import classnames from "./Posts.module.css";
import PostLoading from "../../components/PostLoading/PostLoading";

export default function Posts(props) {
  const type = props.type;

  const initialParams = props.initialParams;

  const [totalPage, setTotalPage] = useState(1);

  let fetchListPost = null;

  let variant = null;

  // post type
  switch (type) {
    case PostsType.HOME_TYPE:
      fetchListPost = PostService.getListPost;
      variant = "post";
      break;
    case PostsType.FAVORITE_TYPE:
      fetchListPost = PostService.getFavoriteListPost;
      variant = "favorite";
      break;

    default:
      console.log("default ");
  }

  const [posts, setPosts] = useState([]);
  const [hasMoreItem, setHasMoreItem] = useState(true);

  const loadmoreFunction = useCallback(
    async (page) => {
      console.log({ page });

      const loadMoreParams = {
        page: page,
        pageSize: 10,
      };
      if (page <= totalPage) {
        try {
          const res = await fetchListPost.call(PostService, loadMoreParams);
          const data = res.data;

          setPosts((oldItems) => [...oldItems, ...data.items]);
          if (page === 1) setTotalPage(data.totalPage);
        } catch (err) {
          setHasMoreItem(false);
        }
      } else {
        setHasMoreItem(false);
      }
    },
    [totalPage]
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetchListPost.call(PostService, initialParams);
  //     console.log(res);
  //   };
  //   fetchData();
  // }, []);

  const items = posts.map((el, index) => {
    return <Post data={el} key={index} variant={variant} />;
  });

  return (
    <div className={cs(classnames.hb_posts)}>
      <InfiniteScroll
        pageStart={0}
        threshold={100}
        loadMore={loadmoreFunction}
        hasMore={hasMoreItem}
        loader={<PostLoading />}
      >
        {items}
      </InfiniteScroll>
      {posts.length ? null : [1,2,3].map((el,index) => <PostLoading key={index}/>)}
    </div>
  );
}
