import React from 'react';
import PropTypes from "prop-types";
import {PayPalButton} from "react-paypal-button-v2";
import {createOrder, onApprove, onCancel} from "./PaypalSmartButton.service";
import {useDispatch} from "react-redux";
import {getUserTransaction, getWallet} from "../../store/action/walletAction";

PaypalSmartButton.propTypes = {
    amount: PropTypes.number,
}

function PaypalSmartButton(props) {

    const dispatch = useDispatch();

    const onApproveCb = () => {
        dispatch(getWallet());
        dispatch(getUserTransaction());
    }

    const {amount} = props;
    return <PayPalButton createOrder={(data, action) => createOrder(data, action, amount)}
                         onApprove={(data,action) => onApprove(data,action,onApproveCb)}
                         onCancel={onCancel}
                         style={{
                             layout: "horizontal",
                             color: "blue",
                             shape: "pill",
                             label: "paypal"
                         }}
                         options={{
                             clientId: "ASxmyLo7w_THZRCs21HDBeyWdqOM0syn7Lz8AHVGxInDEkN2RfZniKS6jQmFvJ_-V7mmZbwJIbtm7ds4",
                             currency: "USD"
                         }}/>

}

export default PaypalSmartButton;