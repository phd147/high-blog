import React, {useEffect} from 'react';

import {useLocation, useParams} from 'react-router-dom';

import VerifyRegisterService from './VerifyRegister.service';

import ToastContainerConfig from "../../configs/toast/ToastContainerConfig";

import {toast} from 'react-toastify';


import {useHistory} from 'react-router-dom'


function useQuery() {
    return new URLSearchParams(useLocation().search);
};

export default function VerifyRegister(props) {


    const history = useHistory();

    let query = useQuery();
    let {id} = useParams();

    const codeQuery = query.get('code');


    console.log({id});
    console.log({codeQuery});

    useEffect(async () => {
        try {
            const res = await VerifyRegisterService.verify(id, codeQuery);
            console.log(res);
            toast.success("Verify email success");
            setTimeout(() => {
                history.replace('/login');
            }, 3000)
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
            setTimeout(() => {
                history.replace('/login');
            }, 2000)

        }
    }, [])

    return (
        <div>
            ... Loading
            <ToastContainerConfig/>
        </div>
    )
}
