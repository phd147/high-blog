import { Container, Grid } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Posts from "../Posts/Posts";
import * as PostType from "../Posts/TypeOfPost";
import styles from "./Search.module.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
SearchScreen.propTypes = {};

function SearchScreen(props) {
  let query = useQuery();
  return (
    <Container>
      <Grid container spacing={3} className={styles.container} direction="row">
        <Grid item xs={false} md={2}>
          <h2>Để tạm xíu</h2>
          <Menu />
        </Grid>
        <Grid item xs={12} md={7}>
          <Posts
            type={PostType.SEARCH_TYPE}
            initialParams={{ keyword: query.get("q"), page: 1, pageSize: 10 }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SearchScreen;
