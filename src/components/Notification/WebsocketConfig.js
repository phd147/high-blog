import React, {useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
import {checkToken} from "../../services/user.service";

WebsocketConfig.propTypes = {
    socketUrl: PropTypes.string,
    subcribeUrl: PropTypes.string,
    onMessage: PropTypes.func,
}

function WebsocketConfig({socketUrl, subcribeUrl, onMessage}) {
    const socket = new SockJS(socketUrl);
    const stompClient = webstomp.over(socket);

    stompClient.connect({"Authorization": "Bearer " + checkToken()}, function (frame) {
        stompClient.subscribe(subcribeUrl, onMessage);
    })
    return null;
}

export default React.memo(WebsocketConfig);