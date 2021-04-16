import React from 'react'
import ApiHelper from '../../configs/api/api-helper';

export const newsFeedAction = ()=> async (dispath) => {
    const apiHelper = new ApiHelper();
    try {
        console.log('Vao roi nhe')
        const {data} = await apiHelper.get(
            'http://35.240.173.198/api/v1/posts?page=1&pageSize=1000'
        );
        dispath({
            type:"FETCH_LIST_POST",
            payload: data
        })
    } catch (error) {
        console.log("Loi roi nha")
    }
}
