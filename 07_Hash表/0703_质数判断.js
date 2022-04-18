function isPrime(num) {
    if (num <= 1) { return false }
    let temp = parseInt(Math.sqrt(num))
    // let temp = num
    for (let i = 2; i < temp; i++) {
        if (num % i === 0) { return false }
    }
    return true
}
console.time('x');
console.log(isPrime(2));
console.log(isPrime(2223));
console.log(isPrime(2565447));
console.timeEnd('x');
