export function fibo(n) {
    const testString = 'this is test fibo';
    return n > 2 ? fibo(n-1) + fibo(n-2) : testString;
}

export function addOne(n) {
    return `this is test addOne: ${n + 1}`;
}