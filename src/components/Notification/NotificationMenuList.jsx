import {Avatar, Container, Grid, MenuItem, MenuList, Typography} from "@material-ui/core";
import DefaultUserAvatar from "../../../public/default/default_user_avatar.png";
import "./NotificationMenuList.module.css"
import {BASE_URL} from "../../constant";
import {useEffect, useState} from "react";
import {fetchListNotifications} from "./NotificationService";
import {useHistory} from "react-router-dom";

function NotificationMenuList(props) {
    let history = useHistory();
    let [notifications, setNotification] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let notificationsRes = await fetchListNotifications(1, 7);
            console.log(notificationsRes);
            setNotification(notificationsRes.items);
        }

        fetchData();
    }, []);

    let notificationMenuList = notifications.map(notification => {
        let headerText = null;
        let redirectUrl = null;


        switch (notification.type) {
            case "POST":
                headerText = "posted";
                redirectUrl = `/p/${notification.sourceId}/${notification.content}`;
                break;
            case "COMMENT":
                headerText = "commented";
                // redirectUrl = `/p/${notification.sourceId}/${notification.content}#`;
                break;
        }

        let onItemClick = () => {
            props.onItemClick();
            history.push(redirectUrl);
        }

        let imagePath = notification.sender.imagePath;

        return (
            <MenuItem key={notification.id} style={{padding: 0, marginBottom: '10px'}} onClick={onItemClick}>
                <Grid container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      wrap="nowrap"
                      spacing={2}
                >
                    <Grid item>
                        <Avatar alt={"User"} src={imagePath ? BASE_URL + "/" + imagePath : DefaultUserAvatar}/>
                    </Grid>
                    <Grid item>
                        <Grid container
                              direction="column">
                            <Typography variant="caption">
                                {notification.sender.nickName} {headerText}
                            </Typography>
                            <Typography variant="body2">
                                {notification.content}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </MenuItem>
        )
    });

    return (
        <Container className="container">
            <MenuList>
                {notificationMenuList}
            </MenuList>
        </Container>
    )
}

export default NotificationMenuList;
