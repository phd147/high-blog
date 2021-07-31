import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";

import {useDispatch} from 'react-redux'

import moment from "moment";
import {useSelector} from "react-redux";
import {useEffect, useReducer, useRef, useState} from "react";

import userProfileAPI from "../user-profile.service";
import cs from "classnames";

import classnames from "./UserProfile.module.css";

import ToastContainerConfig from "../../../configs/toast/ToastContainerConfig";
import {toast} from "react-toastify";
import MetaTag from "../../../components/MetaTag";

import {updateUserNickName} from '../../../store/action/userAction';
import UserProfileApi from "../user-profile.service";

const initialUserDetailInfor = {
    firstName: "",
    lastName: "",
    genderType: "Male",
    websiteUrl: "",
    location: "",
    bio: "",
};

const userDetailReducer = (state, action) => {
    switch (action.type) {
        case "INIT_USER_DETAIL_INFOR":
            return {
                firstName: action.data.firstName,
                lastName: action.data.lastName,
                genderType: action.data.genderType,
                websiteUrl: action.data.websiteUrl,
                location: action.data.location,
                bio: action.data.bio,
            };

        default:
            return initialUserDetailInfor;
    }
};

const UserProfile = (props) => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const genderTypeRef = useRef();
    const websiteUrlRef = useRef();
    const locationRef = useRef();
    const bioRef = useRef();
    const nickNameRef = useRef();

    const newPasswordRef = useRef();
    const oldPasswordRef = useRef();

    const changePasswordHandler = async () => {
        console.log({newPasswordValue: newPasswordRef.current.value, oldPasswordValue: oldPasswordRef.current.value});
        try {
            const res = await UserProfileApi.changePassword({
                newPassword: newPasswordRef.current.value,
                oldPassword: oldPasswordRef.current.value
            });
            toast.success("Change password successfully")
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const nickName = useSelector((state) => state.user.nickName);

    const reduxDispatch = useDispatch();

    const [userDetailState, dispatch] = useReducer(
        userDetailReducer,
        initialUserDetailInfor
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const res = await userProfileAPI.getUserDetail(nickName);
                reduxDispatch({
                    type: ''
                });
                dispatch({type: "INIT_USER_DETAIL_INFOR", data: res.data});
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserDetail();
    }, []);

    const submitHandler = async () => {
        const data = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            genderType: genderTypeRef.current.value,
            websiteUrl: websiteUrlRef.current.value,
            location: locationRef.current.value,
            bio: bioRef.current.value,
            nickName: nickNameRef.current.value,
        };
        try {
            const res = await userProfileAPI.putUserDetail(data);
            reduxDispatch(updateUserNickName(data.nickName));
            toast.success("Updated");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <ToastContainerConfig/>

            {loading ? (
                <CircularProgress/>
            ) : (
                <div className={cs(classnames.hb_user_profile)}>
                    <Box
                        sx={{
                            backgroundColor: "background.default",
                            minHeight: "100%",
                            py: 3,
                        }}
                    >
                        <Container maxWidth="lg">
                            <Grid container spacing={3}>
                                <Grid item lg={12} md={12} xs={12}>
                                    <form autoComplete="off" noValidate>
                                        <Card>
                                            <CardHeader
                                                subheader="The information can be edited"
                                                title="Profile"
                                            />
                                            <Divider/>
                                            <CardContent>
                                                <Grid container spacing={3}>
                                                    <Grid item md={6} xs={12}>
                                                        {" "}
                                                        <TextField
                                                            fullWidth
                                                            helperText="Please specify the first name"
                                                            label="First name"
                                                            name="firstName"
                                                            defaultValue={userDetailState.firstName}
                                                            required
                                                            inputRef={firstNameRef}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Last name"
                                                            name="lastName"
                                                            inputRef={lastNameRef}
                                                            required
                                                            defaultValue={userDetailState.lastName}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Nick name"
                                                            name="nickname"
                                                            defaultValue={nickName}
                                                            variant="outlined"
                                                            inputRef={nickNameRef}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Website URL"
                                                            name="websiteUrl"
                                                            defaultValue={userDetailState.websiteUrl}
                                                            variant="outlined"
                                                            inputRef={websiteUrlRef}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Location"
                                                            name="location"
                                                            defaultValue={userDetailState.location}
                                                            required
                                                            inputRef={locationRef}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Bio"
                                                            name="bio"
                                                            defaultValue={userDetailState.bio}
                                                            required
                                                            inputRef={bioRef}
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <FormControl>
                                                            <InputLabel id="demo-simple-select-label">
                                                                Gender
                                                            </InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                defaultValue={userDetailState.genderType}
                                                                onChange={() => {
                                                                }}
                                                                inputRef={genderTypeRef}
                                                            >
                                                                <MenuItem value={"MALE"}>Male</MenuItem>
                                                                <MenuItem value={"FEMALE"}>Female</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                            <CardActions style={{justifyContent: "flex-end"}}>
                                                <Button
                                                    color="primary"
                                                    variant="outlined"
                                                    onClick={submitHandler}
                                                >
                                                    Save
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </form>
                                    <Card>
                                        <CardHeader
                                            subheader="The information can be edited"
                                            title="Change password"
                                        />
                                        <Grid container>
                                            <Grid item md={4}>
                                                <TextField
                                                    fullWidth
                                                    label="New password"
                                                    name="password"
                                                    required
                                                    variant="outlined"
                                                    type="text"
                                                    style={{"marginBottom": "10px"}}
                                                    inputRef={newPasswordRef}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Old password"
                                                    name="old-password"
                                                    required
                                                    variant="outlined"
                                                    type="password"
                                                    style={{"marginBottom": "10px"}}
                                                    inputRef={oldPasswordRef}
                                                />
                                                <Button onClick={changePasswordHandler} variant="contained"
                                                        color="primary">Change
                                                    password</Button>
                                            </Grid>
                                        </Grid>

                                    </Card>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                    <MetaTag>My Account</MetaTag>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
