import { action, makeObservable, observable } from "mobx";


class CustomStore {
    data = [];
    constructor() {
        makeObservable(this, {
            data: observable,
            push: action
        })
    }
    replace(array) {
        this.data = array;
    }
    
    push(notification) {
        this.data = [notification, ...this.data];
    }
}

export default new CustomStore();