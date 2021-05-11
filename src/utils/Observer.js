import * as actionTypes from "../store/action/actionTypes";


export default class Observer {

    static observer ;

    store ;

    static getObserver(){
        if(!this.observer){
            this.observer = new Observer();
            return this.observer;
        }
        return this.observer;
    }



    update(data){
        console.log('UPDATEEEEEEEE');
        console.log(this.store);
        this.store.dispatch(
            {
                type: actionTypes.INIT_USER_INFOR,
                firstName: data.firstName,
                lastName: data.lastName,
                roles: data.roleTypes,
                userId: data.id,
                nickName : data.nickName,
                imagePath: data.imagePath
            }
        )
    }
}