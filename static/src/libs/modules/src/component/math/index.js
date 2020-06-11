import { test1 } from '../test';

class Math{
    constructor(){
        console.log('class test');
    }
}

export const fibo = () => {
    console.log(test1());
    new Math();
    return 'this is test fibo';
}

export const addOne = () => {
    return 'this is test addone';
}