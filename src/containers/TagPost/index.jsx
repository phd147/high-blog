import {
  AppBar,
  Box,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Posts from "../Posts/Posts";
import MetaTag from "../../components/MetaTag";
import * as PostType from "../Posts/TypeOfPost";

TagPost.propTypes = {};

function TagPost(props) {
  let { tagId } = useParams();
  let [value, setValue] = useState(0);
  const handleTabs = (e, val) => {
    setValue(val);
  };
  return (
    <Container>
      <Grid container spacing={3} direction="row">
        <Grid item xs={false} md={2}>
          <Menu tags />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="h4" style={{ marginBottom: 5 }}>
            # {props.match.params.tagName}
          </Typography>
          <AppBar
            position="static"
            color="black"
            style={{ background: "#ffffff", boxShadow: "none" }}
          >
            <Tabs
              value={value}
              onChange={handleTabs}
              TabIndicatorProps={{ style: { background: "blue" } }}
            >
              <Tab label="Post" />
              <Tab label="Question" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Posts
              type={PostType.TAG_TYPE}
              initialParams={{ tagId: tagId, page: 1, pageSize: 10 }}
            />
          </TabPanel>
          {/* <TabPanel value = {value} index = {2}>Item 3</TabPanel> */}
          <TabPanel value={value} index={1}>
            <Posts
              type={PostType.TAG_QUESTION_TYPE}
              initialParams={{ tagId: tagId, page: 1, pageSize: 10 }}
            />
          </TabPanel>
        </Grid>
      </Grid>
      <MetaTag>{`#${props.match.params.tagName}`}</MetaTag>
    </Container>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <>
      {value === index && (
        <Typography>
          <Box py={1} />
          {children}
        </Typography>
      )}
    </>
  );
}
export default TagPost;
