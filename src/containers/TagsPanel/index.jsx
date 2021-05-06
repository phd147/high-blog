import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./TagsPanel.module.css";
import { Button, Card, CardContent, Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import TagsService from "./TagsPanel.service";
import Menu from "../../components/Menu/Menu";

TagsPanel.propTypes = {};

function TagsPanel(props) {
  const [tags, setTags] = useState([]);
  async function fetchTags() {
    try {
      const response = await TagsService.getTags();
      console.log(response);
      setTags(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchTags();
  }, []);
  return (
    <Container>
      <Grid container spacing={3} className={styles.container} direction="row">
        <Grid item xs={false} md={2}>
          <Menu />
        </Grid>
        <Grid item xs={12} md={10}>
          <div className={styles.inner}>
            {tags.map((tag) => (
              <Card key={tag.id} className={styles.card}>
                <CardContent>
                  <Link to={`/t/${tag.id}/${tag.name}`}>
                    <h3>#{tag.name}</h3>
                  </Link>
                  <div className={styles.desc}>
                    Once relegated to the browser as one of the 3 core
                    technologies of the web, JavaScript can now be found almost
                    anywhere you find code. JavaScript developers move fast and
                    push software development forward; they can be as
                    opinionated as the frameworks they use, so let's keep it
                    clean here and make it a place to learn from each other!
                  </div>
                  <div style={{ color: "gray", margin: "0.5rem 0" }}>
                    999 posts published
                  </div>
                  <Button variant="contained">Follow</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TagsPanel;
