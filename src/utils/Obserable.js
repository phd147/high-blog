
export default class Observable {


    observers = [] ;

    setObservers(observer){
        this.observers = observer.push(observer);
    }

    static observable ;

    static getObservable(){
        if(!this.observable){
            this.observable = new Observable();
            return this.observable;
        }
        return this.observable;
    }

    notify(data){
        console.log('notitititiititititifyfyfyyfyff');
        this.observers.forEach(el => el.update(data));
    }
}