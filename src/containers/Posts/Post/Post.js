import React, {useState} from "react";

import PostService from "./post.service";

import classnames from "./Post.module.css";

import cs from "classnames";
import {Avatar, Card, Chip, Button} from "@material-ui/core";
import moment from "moment";

import {useHistory, Link} from "react-router-dom";
import {BASE_URL} from "../../../constant";
import DefaultAvatar from "../../../../public/default/default_user_avatar.png";

import {toast} from "react-toastify";


export default function Post(props) {

    const [isLove, setIsLove] = useState(false);

    const saveHandler = async (id) => {
        const data = {
            postId: id
        };
        try {
            const res = await PostService.save(data);
            setIsLove(true);
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }

    const unSaveHandler = async params => {
        try {
            const res = await PostService.unsave(params);
            toast.success('unsave ok');
            setIsLove(false);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const history = useHistory();


    const data = props.data;

    const variant = props.variant;
    const postMoment = moment("1970-01-01").set("millisecond", 1618239547478);

    const titleUrl = data.title.toLowerCase().replaceAll(" ", "-");

    return (
        <Card variant="outlined" style={{marginBottom: "10px", padding: "10px"}}>
            <div className={cs(classnames.post_item)}>
                <div className={cs(classnames.post_item_author_infor)}>
                    <Link to={`/user/personal/${data.user.nickName}`}>
                        <Avatar
                            style={{marginRight: "10px"}}
                            alt="Remy Sharp"
                            src={data.user.imagePath ? BASE_URL + "/" + data.user.imagePath : DefaultAvatar}
                        />
                    </Link>

                    <div>
                        <Link to={`/user/personal/${data.user.nickName}`}>
                            <h5 className={cs(classnames.authorName)}>
                                {data.user.firstName} {data.user.lastName}
                            </h5>
                        </Link>
                        <p className={cs(classnames.postTime)}>
                            {" "}
                            {postMoment.format("LL")} {`(${postMoment.fromNow()})`}
                        </p>
                    </div>
                </div>
                <div className={cs(classnames.post_item_title)}>
                    <Link to={`/p/${data.id}/${titleUrl}`}>
                        <h4>{data.title}</h4>
                    </Link>
                </div>
                <div className={cs(classnames.post_item_summary)}>
                    <p>{data.summary}</p>
                </div>
                {variant === "post" && (
                    <div className={cs(classnames.post_item_tag)}>
                        {data.tags
                            ? data.tags.map((el) => (
                                <Chip
                                    onClick={() => history.push(`/t/${el.id}/${el.name}`)}
                                    style={{marginRight: "5px", cursor: "pointer"}}
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
                            <Button style={{textTransform: "initial"}}>
                                {` ${data.numberOfFavorites} reactions`}
                            </Button>
                            <Button style={{textTransform: "initial"}}>
                                {data.numberOfComments
                                    ? `${data.numberOfComments} comments`
                                    : "Add comment"}
                            </Button>
                        </div>
                    ) : (
                        <div></div>
                    )}


                    <div className={cs(classnames.post_item_save)}>
                        {
                            !isLove ?
                                <Button onClick={() => saveHandler(data.id)} color="secondary" variant="contained">
                                    {variant === "post" ? "Save" : ""}
                                    {variant === "favorite" ? "Archive" : ""}
                                    {variant === "search" ? "Save" : ""}
                                    {variant === "following" ? "Save" : ""}
                                </Button> :
                                <Button variant={"contained"} color={"primary"} onClick={() => unSaveHandler(data.id)}>
                                    Unsave
                                </Button>
                        }

                    </div>
                </div>
            </div>
        </Card>
    );

}
