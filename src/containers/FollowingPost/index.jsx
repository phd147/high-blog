import {
  Container,
  createMuiTheme,
  Grid,
  ThemeProvider,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Menu from "../../components/Menu/Menu";
import Posts from "../Posts/Posts";
import * as PostType from "../Posts/TypeOfPost";
import styles from "./FollowingPost.module.css";
import FollowingPostService from "./FollowingPost.service";

let theme = createMuiTheme({});

theme = {
  ...theme,
  overrides: {
    MuiToggleButtonGroup: {
      root: {
        [theme.breakpoints.down("xs")]: {
          width: "100%",
          justifyContent: "center",
        },
      },
    },
    MuiToggleButton: {
      root: {
        [theme.breakpoints.down("xs")]: {
          width: "100%",
          border: "none",
          "&$selected": {
            color: "black",
            fontWeight: "600",
          },
        },
      },
    },
  },
};

FollowingPost.propTypes = {};

function FollowingPost(props) {
  const [listCategory, setListCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await FollowingPostService.getCategories();
        setListCategory(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCategories();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {!isLoading && (
          <Grid
            container
            spacing={3}
            className={styles.container}
            direction="row"
          >
            <Grid item xs={false} md={2}>
              <Menu />
            </Grid>
            <Grid item xs={12} sm={9} md={7}>
              <Posts
                type={PostType.FOLLOWING_TYPE}
                initialParams={{
                  categoryId,
                  page: 1,
                  pageSize: 10,
                }}
              />
            </Grid>
            <div className={styles.category}>
              <ToggleButtonGroup
                className={styles.category_btn}
                value={categoryId}
                exclusive
                onChange={(event, value) => {
                  setCategoryId(value);
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 500);
                }}
              >
                {listCategory.map((item) => (
                  <ToggleButton size="small" key={item.id} value={item.id}>
                    {item.title}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </div>
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default FollowingPost;
