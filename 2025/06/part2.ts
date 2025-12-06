import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

let currentNums: number[] = [];

for (let i = input[0].length - 1; i >= 0; i--) {
    let newElement = '';

    for (let l = 0; l < input.length - 1; l++) {
        newElement += input[l][i];
    }

    if (newElement.split('').filter(x => x != ' ').join('').length == 0) {
        let op = input[input.length - 1][i + 1];
        calculateProblem(op, currentNums);
        currentNums = [];
    } else {
        currentNums.push(parseInt(newElement.split('').filter(x => x != '').join('')));
    }
}

calculateProblem(input[input.length - 1][0], currentNums);

console.log(result);

function calculateProblem(op, currentNum) {
    if (op == '+') {
        let singleProblemResult = 0;

        for (let j = 0; j < currentNum.length; j++) {
            singleProblemResult += currentNum[j];
        }

        result += singleProblemResult;
    } else if (op == '*') {
        let singleProblemResult = 1;

        for (let j = 0; j < currentNum.length; j++) {
            singleProblemResult *= currentNum[j];
        }

        result += singleProblemResult;
    }
}

console.timeEnd('Time');