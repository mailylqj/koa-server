import { test1 } from '../test';

var Math = function Math() {
  console.log('class test');
};

export var fibo = function fibo() {
  console.log(test1());
  new Math();
  return 'this is test fibo';
};
export var addOne = function addOne() {
  return 'this is test addone';
};