import React from 'react';
import PropTypes from "prop-types";
import {PayPalButton} from "react-paypal-button-v2";
import {createOrder, onApprove, onCancel} from "./PaypalSmartButton.service";

PaypalSmartButton.propTypes = {
    amount: PropTypes.number,
}

function PaypalSmartButton(props) {

    const {amount} = props;
    return <PayPalButton createOrder={(data, action) => createOrder(data, action, amount)}
                         onApprove={onApprove}
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