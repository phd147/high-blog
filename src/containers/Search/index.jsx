import { Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import MetaTag from "../../components/MetaTag";
import Posts from "../Posts/Posts";
import * as PostType from "../Posts/TypeOfPost";
import styles from "./Search.module.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
SearchScreen.propTypes = {};

function SearchScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  let query = useQuery();
  useEffect(() => {
    console.log("useEffect");
    setIsLoading(true);
    setKeyword(query.get("q"));
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [query.get("q")]);
  console.log("KEYWORD: ", keyword);
  return (
    <Container>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Grid
          container
          spacing={3}
          className={styles.container}
          direction="row"
        >
          <Grid item xs={false} md={2}>
            <Menu />
          </Grid>
          <Grid item xs={12} md={7}>
            <Posts
              type={PostType.SEARCH_TYPE}
              initialParams={{ keyword: keyword, page: 1, pageSize: 10 }}
            />
          </Grid>
        </Grid>
      )}
      <MetaTag>Search Results</MetaTag>
    </Container>
  );
}

export default SearchScreen;
