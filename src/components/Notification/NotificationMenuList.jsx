import {Avatar, Container, Grid, MenuItem, MenuList, Typography} from "@material-ui/core";
import DefaultUserAvatar from "../../../public/default/default_user_avatar.png";
import "./NotificationMenuList.module.css"
import WebsocketConfig from "./WebsocketConfig";
import {NOTIFICATION_WEBSOCKET_CONNECT_URL} from "../../constant";

function NotificationMenuList() {
    const onNewNotification = (notification) => {
        console.log("Notification");
        console.log(notification);
    }
    return (
        <Container className="container">
            <WebsocketConfig socketUrl={NOTIFICATION_WEBSOCKET_CONNECT_URL}
                             subcribeUrl={`/user/exchange/amq.direct/notification`}
                             onMessage={onNewNotification}/>
            <MenuList>
                <MenuItem>
                    <Grid container
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                          wrap="nowrap"
                          spacing={2}
                    >
                        <Grid item>
                            <Avatar alt={"User"} src={DefaultUserAvatar}/>
                        </Grid>
                        <Grid item>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, praesentium.
                        </Grid>
                    </Grid>
                </MenuItem>
            </MenuList>
        </Container>
    )
}

export default NotificationMenuList;