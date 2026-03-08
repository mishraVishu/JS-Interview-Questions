const addFive = (num) => {
    return num + 5;
}
const subtractTwo = (num) => {
    return num - 2;
}
const multiplyFour = (num) => {
    return num * 4;
}

function compose(...fns){
    return function(init){
        return fns.reduceRight((acc,curr) => {
            return curr(acc);
        },init)
    }
}

const evaluate = compose(addFive, subtractTwo, multiplyFour); // evaluate from right to left
console.log(evaluate(5));  // 23

function pipe(...fns){
    return function(init){
        return fns.reduce((acc,curr) => {
            return curr(acc);
        },init)
    }
}

const evaluatePipe = pipe(addFive, subtractTwo, multiplyFour); // evaluate from right to left
console.log(evaluatePipe(5));  //       32