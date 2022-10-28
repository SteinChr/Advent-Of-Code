import {readFileSync} from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let numbers = input.split('\r\n');
let currentMask;
let currentNumber;
let newcurrentNumberArray = [];
let biggestMem = 0;
let result = 0;

for (let i = 0; i < numbers.length; i++) {
    if ((numbers[i].charAt(1) == 'e') && (parseInt(numbers[i].slice(4).split(']')[0]) > biggestMem)) biggestMem = parseInt(numbers[i].slice(4).split(']')[0]);
}

let resultArray = new Array(biggestMem).fill(0);

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i].charAt(1) == 'a') { //mask
        currentMask = numbers[i].slice(7);
    } else if (numbers[i].charAt(1) == 'e') { //mem
        currentNumber = numbers[i].split('= ')[1];
        currentNumber = dec2bin(currentNumber).padStart(36, '0');
        
        newcurrentNumberArray = [];
        for (let l = 0; l < 36; l++) {
            if (currentMask.charAt(l) == 'X') {
                if (currentNumber.charAt(l) == 1) {
                    newcurrentNumberArray.push('1');
                }
                if (currentNumber.charAt(l) == 0) {
                    newcurrentNumberArray.push('0');
                }
            } else if (currentMask.charAt(l) == 1) {
                newcurrentNumberArray.push('1');
            } else if (currentMask.charAt(l) == 0) {
                newcurrentNumberArray.push('0');
            }
        }
        currentNumber = parseInt(newcurrentNumberArray.join(''), 2);
        resultArray[parseInt(numbers[i].slice(4).split(']')[0])] = currentNumber;
    }
}

for (let i = 0; i < resultArray.length; i++) {
    result += resultArray[i];
}

console.log(result);

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

console.timeEnd('Time');