import React from "react";

import classnames from "./Post.module.css";

import cs from "classnames";
import { Avatar, Card, Chip, Button } from "@material-ui/core";
import moment from "moment";

import { useHistory } from "react-router-dom";

export default function Post(props) {
  const history = useHistory();

  const data = props.data;

  const variant = props.variant;
  const postMoment = moment("1970-01-01").set("millisecond", 1618239547478);

  return (
    <Card style={{ marginBottom: "10px", padding: "10px" }}>
      <div className={cs(classnames.post_item)}>
        <div className={cs(classnames.post_item_author_infor)}>
          <Avatar
            style={{ marginRight: "10px" }}
            alt="Remy Sharp"
            src={data.user.imagePath || null}
          />
          <div>
            <h5 className={cs(classnames.authorName)}>
              {data.user.nickName} {data.user.lastName}
            </h5>
            <p className={cs(classnames.postTime)}>
              {" "}
              {postMoment.format("LL")} {`(${postMoment.fromNow()})`}
            </p>
          </div>
        </div>
        <div className={cs(classnames.post_item_title)}>
          <h4>{data.title}</h4>
        </div>
        <div className={cs(classnames.post_item_summary)}>
          <p>{data.summary}</p>
        </div>
        {variant === "post" && (
          <div className={cs(classnames.post_item_tag)}>
            {data.tags
              ? data.tags.map((el) => (
                  <Chip
                    onClick={() => history.push(`/tag/${el.id}`)}
                    style={{ marginRight: "5px", cursor: "pointer" }}
                    key={el.id}
                    label={el.name}
                  />
                ))
              : "No tags"}
          </div>
        )}

        <div className={cs(classnames.post_item_util)}>
          {variant === "post" ? (
            <div className={cs(classnames.post_item_reactions)}>
              <Button style={{ textTransform: "initial" }}>
                {` ${data.numberOfFavorites} reactions`}
              </Button>
              <Button style={{ textTransform: "initial" }}>
                {data.numberOfComments
                  ? `${data.numberOfComments} comments`
                  : "Add comment"}
              </Button>
            </div>
          ) : (
            <div></div>
          )}
          <div className={cs(classnames.post_item_save)}>
            <Button color="default" variant="contained">
              {variant === "post" ? "Save" : "Archive"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
