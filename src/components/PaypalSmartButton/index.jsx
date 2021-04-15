import React from 'react';
import PropTypes from "prop-types";
import {PayPalButton} from "react-paypal-button-v2";
import ApiHelper from "../../configs/api/api-helper";

PaypalSmartButton.propTypes = {
    amount: PropTypes.number,
}

PaypalSmartButton.defaultProps = {
    amount: 0
}

function PaypalSmartButton(props) {

    const {amount} = props;

    const createOrder = (data, actions) => {

        console.log(actions + "\n\n" + actions)
        ApiHelper
            .post("/api/v1/user/paypal/create-payment", null, JSON.stringify({amount}))
            .then(res => {
                return res.data.paymentId;
            }).catch(err => console.log(err));
    }

    const onApprove = (data, actions) => {
        console.log(data + "\n\n" + actions)
        ApiHelper
            .post("/api/v1/user/paypal/execute-payment")
            .then(res => {
                console.log(res);
                console.log("Successfully");
            }).catch(err => console.log(err));
    }

    return <PayPalButton createOrder={createOrder}
                         onApprove={onApprove}/>

}

export default PaypalSmartButton;