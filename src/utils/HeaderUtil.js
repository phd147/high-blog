
const pathNotIncludeHeader = ['login'];


export const checkPathIsIncludeHeader = location => {
 console.log(pathNotIncludeHeader.includes(location.pathname.substring(1)))
 return pathNotIncludeHeader.includes(location.pathname.substring(1)) ;
}

