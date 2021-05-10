import { Container, Grid } from "@material-ui/core";
import React from "react";
import Menu from "../../components/Menu/Menu";
import Posts from "../Posts/Posts";
import * as PostType from "../Posts/TypeOfPost";
import styles from "./Favorite.module.css";

Favorite.propTypes = {};

function Favorite(props) {
  return (
    <Container>
      <Grid container spacing={3} className={styles.container} direction="row">
        <Grid item xs={false} md={2}>
          <Menu favorites />
        </Grid>
        <Grid item xs={12} md={7}>
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
