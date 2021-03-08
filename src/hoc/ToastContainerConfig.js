
import React from 'react';

import {ToastContainer} from 'react-toastify';


export default  function ToastContainerConfig(props){
        return (
            <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
        )
}

