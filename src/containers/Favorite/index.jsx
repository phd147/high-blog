import { Container, Grid } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/Menu/Menu";
import { deleteFavorite } from "../../store/action/favoriteActions.";
import FavoriteList from "./components/FavoriteList";
import styles from "./Favorite.module.css";
import FavoriteService from "./Favorite.service";

import * as PostType from "../Posts/TypeOfPost";

import Posts from "../Posts/Posts";

Favorite.propTypes = {};

function Favorite(props) {
  //KEEP SOMETHING HERE FOR ERROR RESOLVING
  // const [itemList, setItemList] = useState([]);

  // const [totalPage, setTotalPage] = useState(1);
  // const [hasMoreState, setHasMoreState] = useState(true);

  // const dispatch = useDispatch();

  // const fetchFavoriteList = useCallback(
  //   async (page) => {
  //     console.log("PAGE: ", page);
  //     console.log("TOTAL PAGE: ", totalPage);
  //     if (page <= totalPage) {
  //       try {
  //         const params = {
  //           page: page,
  //           pageSize: 10,
  //         };
  //         const res = await FavoriteService.getList(params);
  //         setTimeout(() => {
  //           setItemList((oldItems) => [...oldItems, ...res.data.items]);
  //           if (page === 1) setTotalPage(res.data.totalPage);
  //         }, 2000);
  //       } catch (error) {
  //         setHasMoreState(false);
  //       }
  //     } else {
  //       setHasMoreState(false);
  //     }
  //   },
  //   [totalPage]
  // );

  // const deleteFavoriteItem = async (id) => {
  //   await dispatch(deleteFavorite(id));
  //   console.log("DELETE FAVORITE: ", id);
  // };

  return (
    <Container>
      <Grid container spacing={3} className={styles.container} direction="row">
        <Grid item xs={false} md={2}>
          <h2>Để tạm xíu</h2>
          <Menu />
        </Grid>
        <Grid item xs={12} md={7}>
          {/* <FavoriteList
            items={itemList}
            onLoadFunc={fetchFavoriteList}
            hasMore={hasMoreState}
            onDelete={deleteFavoriteItem}
          /> */}
          <Posts
            type={PostType.FAVORITE_TYPE}
            initialParams={{ page: 1, pageSize: 10 }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Favorite;
