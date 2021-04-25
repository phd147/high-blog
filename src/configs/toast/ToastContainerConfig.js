
import React from 'react';

import {ToastContainer} from 'react-toastify'


export default  function ToastContainerConfig(props){
        return (
            <ToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
        )
}

