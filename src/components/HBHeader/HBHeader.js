import React, {useEffect} from 'react' ;

import {useSelector} from 'react-redux'


export default function HBHeader(props){
    const userRoles = useSelector(state => state.user.roles);

    useEffect(() => {
        console.log(userRoles);
    })

    return (
        <div>
            hello header
        </div>
    )
}