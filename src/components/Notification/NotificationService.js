import ApiHelper from "../../configs/api/api-helper";
import {toast} from "react-toastify";

export const fetchListNotifications = (page, pageSize) => {
    return ApiHelper.get(`/api/v1/user/notifications?page=${page}&pageSize=${pageSize}`)
        .then(res => res.data)
        .catch(error => {
            toast.error("Cannot load notification");
        });

}