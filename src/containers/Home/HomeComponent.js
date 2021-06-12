import { Container, Grid } from "@material-ui/core";
import cs from "classnames";
import React from "react";
import Menu from "../../components/Menu/Menu";
import Posts from "../Posts/Posts";
import * as PostType from "../Posts/TypeOfPost";
import classnames from "./Home.module.css";
import MetaTag from "../../components/MetaTag";

export default function Home(props) {
  return (
    <Container className={cs(classnames.hb_home)}>
      <Grid
        className={cs(classnames.hb_home_grid)}
        container
        spacing={3}
        direction="row"
      >
        <Grid
          className={cs(classnames.hb_menu_grid_item)}
          item
          xs={false}
          md={2}
        >
          <Menu home />
        </Grid>
        <Grid item xs={12} md={7}>
          <Posts
            type={PostType.HOME_TYPE}
            initialParams={{ page: 1, pageSize: 10 }}
          />
        </Grid>
      </Grid>
      <MetaTag>Home</MetaTag>
    </Container>
  );
}
