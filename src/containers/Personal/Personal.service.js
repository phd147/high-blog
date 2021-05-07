import ApiHelper from "../../configs/api/api-helper";
import {toast} from "react-toastify";
import HttpStatus from "../../constants/HttpStatus";

async function uploadImage(name, file) {

    let formData = new FormData();

    formData.append("upload", file, file.name);
    console.log("Send image " + name);
    return await ApiHelper
        .put(`/api/v1/user/${name}`, null, formData, null)
        .then(res => {
            console.log(res);
            // Todo: Update status to NO_CONTENT
            if (res.status === HttpStatus.OK)
                return res.data.url;
            else
                toast.error(res.message);
            return null;
        })
        .catch(error => toast.error("Cannot upload avatar"));
}

async function getUserDataByNickName(nickName) {
    return await ApiHelper
        .get(`/api/v1/users/${nickName}`, null, null, null)
        .then(res => {
            if(res.status === HttpStatus.OK)
                return res.data;
            else
                toast.error(res.message);
            return null;
        })
        .catch(error => null);
}

export {
    uploadImage,
    getUserDataByNickName
}