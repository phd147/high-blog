const pathNotIncludeHeader = ['login', 'register', '404', 'verify-register'];


export const checkPathIsIncludeHeader = location => {
    console.log('path', location.pathname.substring(1));
    console.log(pathNotIncludeHeader.includes(location.pathname.substring(1)))
    return pathNotIncludeHeader.includes(location.pathname.substring(1));
}


