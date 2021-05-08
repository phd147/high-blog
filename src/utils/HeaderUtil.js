
const pathNotIncludeHeader = ['login','register','404'];


export const checkPathIsIncludeHeader = location => {
 console.log(pathNotIncludeHeader.includes(location.pathname.substring(1)))
 return pathNotIncludeHeader.includes(location.pathname.substring(1)) ;
}


