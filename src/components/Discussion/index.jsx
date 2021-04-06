import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "@material-ui/core";

Discussion.propTypes = {};

function Discussion(props) {
  return (
    <div>
      <Card className="discussion__container">
        <CardContent className="discussion__inner">
          <h2>Discussion (12)</h2>
          
        </CardContent>
      </Card>
    </div>
  );
}

export default Discussion;
