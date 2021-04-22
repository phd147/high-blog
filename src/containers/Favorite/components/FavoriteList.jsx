import { Avatar, Box, Button, Card, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import PropTypes from "prop-types";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import $ from "jquery";
import { useSelector } from "react-redux";

FavoriteList.propTypes = {
  items: PropTypes.array,
  hasMore: PropTypes.bool,
  onLoadFunc: PropTypes.func,
  onDelete: PropTypes.func,
};
FavoriteList.defaultProps = {
  items: [],
  onLoadFunc: null,
  onDelete: null,
  hasMore: true,
};

function FavoriteList(props) {
  const { items, onLoadFunc, onDelete, hasMore } = props;
  const favoriteDelete = useSelector((state) => state.favoriteDelete);
  const { payload, isLoading, error } = favoriteDelete;

  const loadFunc = (page) => {
    if (onLoadFunc) onLoadFunc(page);
  };

  const deleteItem = (id) => {
    console.log("DELETE ITEM: ", id);
    if (onDelete) onDelete(id);
    if (payload === 204) {
      $("#item1").css("background-color", "yellow");
    }
  };

  const listItem = items.map((e, index) => (
    <Card
      id={`item${index}`}
      key={index}
      style={{
        height: "200px",
        color: "black",
        margin: "10px",
      }}
    >
      <h2 style={{ color: "black" }}>
        {index} {e.title}
      </h2>
      <Button variant="contained" onClick={() => deleteItem(e.id)}>
        Archive
      </Button>
    </Card>
  ));
  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        threshold={100}
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={
          <>
            <Box display="flex" alignItems="center">
              <Box margin={1}>
                <Skeleton variant="circle">
                  <Avatar />
                </Skeleton>
              </Box>
              <Box width="100%">
                <Skeleton width="100%">
                  <Typography>.</Typography>
                </Skeleton>
              </Box>
            </Box>

            <Skeleton variant="rect" width="100%" height="200px">
              <div style={{ paddingTop: "40%" }} />
            </Skeleton>
          </>
        }
      >
        {listItem}
      </InfiniteScroll>
    </div>
  );
}

export default FavoriteList;
