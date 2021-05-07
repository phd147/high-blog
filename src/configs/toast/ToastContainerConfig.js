
import React from 'react';

import {ToastContainer} from 'react-toastify'


export default function ToastContainerConfig(props) {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    )
}

