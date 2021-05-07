import React, {useCallback, useEffect, useRef, useState} from "react";
import {Button, Card, CardContent, CardHeader, Grid} from "@material-ui/core";
import "./Personal.css"
import {getUserDataByNickName, uploadImage} from "./Personal.service"
import EditIcon from "@material-ui/icons/Edit";
import {useDispatch, useSelector} from "react-redux";
import {BASE_URL} from "../../constant";
import {updateUserAvatar} from "../../store/action/userAction";
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {CakeOutlined, LanguageOutlined, LocationOnOutlined} from "@material-ui/icons";
import {Container} from "react-bootstrap";
import Posts from "../Posts/Posts";
import * as PostType from "../Posts/TypeOfPost";
import {LinkedinIcon} from "react-share";
import TypographyIcon from "../../components/TypographyIcon/TypographyIcon";

Personal.propTypes = {}

function Personal(props) {
    let DefaultAvatar = "/default/default_user_avatar.png";
    let nickName = props.match.params.nickName;
    let dispatch = useDispatch();
    let [userData, setUserData] = useState({});
    let history = useHistory();

    useEffect(() => {
        console.log("Get user data");

        async function fetchData() {
            let userData = await getUserDataByNickName(nickName);

            if (userData == null) {
                history.push("/404");
            }

            setUserData(userData);
        }

        fetchData();
    }, []);

    let submitFile = useCallback(async (event) => {
        let file = event.target.files[0];
        let targetName = event.target.name;
        let newPath = await uploadImage(targetName, file);
        if (targetName === 'avatar') {

            userData.imagePath = `${newPath}`;
            setUserData({...userData});

            dispatch(updateUserAvatar());

        } else if (targetName === 'background') {
            userData.backgroundPath = `${newPath}`;
            setUserData({...userData});
        }
    }, []);

    let currentUserProfile = useSelector(state => state.user);
    let isCurrentLoginedUser = currentUserProfile.nickName === nickName;

    console.log(isCurrentLoginedUser);

    let avatarInputRef = useRef(null);
    let backgroundInputRef = useRef(null);
    let btnEditAvatar = null;
    let btnEditBackground = null;

    if (isCurrentLoginedUser) {
        btnEditAvatar = (
            <div>
                <EditIcon onClick={() => {
                    avatarInputRef.current.click()
                }}
                          className="personal__header__avatar__btn-edit"
                          style={{fontSize: 40}}/>
                <input type="file"
                       hidden={true}
                       name="avatar"
                       ref={avatarInputRef}
                       onChange={submitFile}/>
            </div>
        )

        btnEditBackground = (
            <div className="personal__header__btn-edit-background">
                <Button
                    variant="outlined"
                    onClick={() => {
                        backgroundInputRef.current.click()
                    }}>
                    Change
                    <EditIcon style={{paddingLeft: 5}}/>
                </Button>
                <input type="file"
                       hidden={true}
                       name="background"
                       ref={backgroundInputRef}
                       onChange={submitFile}/>
            </div>
        )
    }

    return (
        <div>
            <div className="personal__header"
                 style={{
                     backgroundImage: `url("${userData.backgroundPath ? BASE_URL + "/" + userData.backgroundPath : DefaultAvatar}")`,
                     backgroundSize: "cover",
                 }}>

                <div className="personal__header__avatar"
                     style={{
                         backgroundImage: `url("${userData.imagePath ? BASE_URL + "/" + userData.imagePath : DefaultAvatar}")`,
                         backgroundSize: "contain"
                     }}>
                    {btnEditAvatar}
                </div>
                {btnEditBackground}
            </div>
            <div className="personal__header__info">
                <Typography variant="h6" align="center">
                    @{userData.nickName}
                </Typography>
                <Typography variant="h4" align="center">
                    {userData.firstName + " " + userData.lastName}
                </Typography>
                <TypographyIcon iconComponent={<CakeOutlined/>} justify="center">
                    Joined on 2021/05/05
                </TypographyIcon>
            </div>
            <Container>
                <Grid container
                      direction="row"
                      justify="space-between"
                      spacing={2}>
                    <Grid item
                          xs={12}
                          sm={4}
                    >
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h5"
                                style={{
                                    borderBottom: "1px solid #ccc"
                                }}>
                                    Introduce
                                </Typography>
                                {
                                    userData.bio &&
                                    <Typography style={{paddingTop: 7, paddingBottom: 7}}>
                                        {userData.bio}
                                    </Typography>
                                }
                                {
                                    userData.websiteUrl &&
                                    <TypographyIcon iconComponent={<LanguageOutlined/>}>
                                        <a href={userData.websiteUrl}>{userData.websiteUrl}</a>
                                    </TypographyIcon>
                                }
                                {
                                    userData.location &&
                                    <TypographyIcon iconComponent={<LocationOnOutlined/>}>
                                        {userData.location}
                                    </TypographyIcon>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item
                          xs={12}
                          sm={8}
                    >
                        <Posts type={PostType.PERSONAL_TYPE}
                               initialParams={{page: 1, pageSize: 10, nickName}}/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Personal;