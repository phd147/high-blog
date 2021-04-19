import React, {useCallback, useEffect, useState} from 'react';



import classnames from './LoadmoreDemo.module.css';

import InfiniteScroll from 'react-infinite-scroller';


const addItem = () =>{
    let initialItems = [];
    for(let i = 0 ; i< 10;i++){
        initialItems.push('hello ')
    }
    return initialItems;
}

export default function LoadmoreDemo(props){

    const initialItems = addItem();

    const [items,setItems] = useState([]);
    const [hasMoreState,setHasMore] = useState(true)



    useEffect(() => {
            setTimeout(() => {
                setItems(addItem());
            },3000);
    },[])

    // khong nen dung use call back cho nay tai vi no cache lai gia tri cua bien lun @@
    const loadFunc = useCallback((page) => {
        let count = 0 ;

        console.log({count})
        console.log('load function    ',page);
        if(count <5){
            count ++ ;
            setTimeout(() => {

                setItems(oldState => [...oldState,...addItem()]);
            },1500);


        }
        else {
            console.log('count da qua 5');
            setHasMore(false);
        }


    },[])


    const itemsComponent = items.map((el,index) => {
        return <li className={classnames.item} key={index}>{el}</li>
    })
    console.log('items length ',items.length);

    return(
        <div>
            loadmore demo
            <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={hasMoreState}
            loader={<div>... Loading</div>}
            >
                {itemsComponent}
            </InfiniteScroll>
        </div>
    )
}
