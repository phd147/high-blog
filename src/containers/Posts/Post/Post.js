import React from 'react';

import classnames from './Post.module.css';

import cs from 'classnames';
import {Card, Paper} from "@material-ui/core";


export default function Post(props){

    const data = props.data;

    return (
        <Card style={{marginBottom:'10px'}} >


        <div className={cs(classnames.post_item)}>
            <div className={cs(classnames.post_item_author_infor)}>
                <h1>{data.user.nickName}</h1>
                <h1>{data.user.lastName}</h1>

            </div>
            <div className={cs(classnames.post_item_title)}>

            </div>
            <div className={cs(classnames.post_item_summary)}>

            </div>
            <div className={cs(classnames.post_item_tag)}>

            </div>
            <div className={cs(classnames.post_item_reactions)}>

            </div>
            <div className={cs(classnames.post_item_util)}>

            </div>
        </div>
        </Card>
    )
}