import ApiHelper from "../../configs/api/api-helper";
import {toast} from "react-toastify";
import HttpStatus from "../../constants/HttpStatus";

const createOrder = async (data, actions, amount) => {

    console.log("Data:");
    console.log(data);
    return await ApiHelper
        .post("/api/v1/user/deposit/paypal/create", null, {amount})
        .then(res => {
            return res.data.paymentId;
        }).catch(err => toast.error("Can't create payment"));
}

const onApprove = async (data, actions,onApproveCallback) => {
    console.log("Data : " + data + "\n\n" + actions)
    await ApiHelper
        .post("/api/v1/user/deposit/paypal/execute", null, {paymentId: data.orderID})
        .then(res => {
            if(res.status === HttpStatus.NO_CONTENT)
                toast.success("Deposited successfully!");
            // goi api get wallet
            // dispatch .... set balance
            onApproveCallback();
        }).catch(err => console.log(err));
}

const onCancel = async (data) => {
    await ApiHelper
        .post("/api/v1/user/deposit/paypal/cancel", null, {paymentId: data.orderID})
        .then(res => {
            if(res.status === HttpStatus.NO_CONTENT)
                toast.success("Canceled depositing successfully!");
        }).catch(err => {
            toast.error("Canceled depositing unsuccessfully!");
        });
}

export {createOrder, onApprove, onCancel}