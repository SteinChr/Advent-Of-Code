import {readFileSync} from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let numbers = input.split('\r\n');
let currentMask;
let currentNumber;
let result = 0;
let currentAdress;

let resultArray = {};

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i].charAt(1) == 'a') { //mask
        currentMask = numbers[i].slice(7);
    } else if (numbers[i].charAt(1) == 'e') { //mem
        currentNumber = numbers[i].split('= ')[1];
        currentAdress = parseInt(numbers[i].slice(4).split(']')[0]);
        currentAdress = dec2bin(currentAdress).padStart(36, '0');
        let adresses = [currentAdress];

        for (let l = 0; l < 36; l++) {
            let newAdresses = [];
            if (currentMask.charAt(l) == 'X') {
                for (let adress of adresses) {
                    newAdresses.push(adress.substr(0, l) + '0' + adress.substr(l + 1));
                    newAdresses.push(adress.substr(0, l) + '1' + adress.substr(l + 1));
                }
            } else if (currentMask.charAt(l) == 1) {
                for (let adress of adresses) {
                    newAdresses.push(adress.substr(0, l) + '1' + adress.substr(l + 1));
                }
            } else if (currentMask.charAt(l) == 0) {
                newAdresses = adresses;
            }
            adresses = newAdresses;
        }
        for (let adress of adresses) {
            let decimalAdresse = parseInt(adress, 2);
            resultArray[decimalAdresse] = currentNumber;
        }
    }
}

for (let key in resultArray) {
    result += parseInt(resultArray[key]);
}

console.log(result);

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

console.timeEnd('Time');