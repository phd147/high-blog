import React from 'react' ;

import Lottie from 'react-lottie';

import NotFoundJsonData from './42479-page-not-found-404.json';

import classnames from './NotFound.module.css';



const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFoundJsonData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }

};


export default function NotFoundC(props){

    return (
       <div>
           <Lottie className={classnames.lottie} options={defaultOptions} height={400} width={600} />
       </div>

    )
}