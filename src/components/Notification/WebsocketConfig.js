import React, {useCallback, useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
import {checkToken} from "../../services/user.service";
import {toast} from "react-toastify";
import {Typography} from "@material-ui/core";

WebsocketConfig.propTypes = {
    socketUrl: PropTypes.string,
    subcribeUrl: PropTypes.string,
    onMessage: PropTypes.func,
}

function WebsocketConfig({socketUrl, subcribeUrl, onMessage}) {
    console.log("RENDER WEBSOCKET CONFIG");

    const buildNotification = useCallback((notification) => {
        console.log(notification);
        switch (notification.type){
            case "POST":{
                return (
                    <Typography>
                        New post: {notification.content}
                    </Typography>
                )
            }
        }
    });

    useEffect(()=>{

        const socket = new SockJS(socketUrl);
        const stompClient = webstomp.over(socket);
        stompClient.debug = ()=>{}

        stompClient.connect({"Authorization": "Bearer " + checkToken()}, function (frame) {
            stompClient.subscribe(subcribeUrl, (message) => {

                if (message.command === "MESSAGE") {
                    let jsonBody = JSON.parse(message.body);
                    toast(buildNotification(jsonBody));
                }
            });
        });
    },[])
    return null;
}

export default React.memo(WebsocketConfig);