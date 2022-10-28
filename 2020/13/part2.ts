import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let lines = input.split('\r\n');
let busIds = lines[1].split(',');
let buses = [];
let currentNumber = 0;

for (let i = 0; i < busIds.length; i++) {
    if (busIds[i] == 'x') {
        buses.push(busIds[i]);
    } else {
        buses.push(parseInt(busIds[i]));
    }
}

let step = 1;
let proofArray = [];
currentNumber = 0;

while (true) {
    let test = 0;
    for (let i = 0; i < buses.length; i++) {
        if (buses[i] != 'x') {
            if ((currentNumber + i) % buses[i] == 0) {
                test++;
                if (!proofArray.includes(buses[i])) {
                    step *= buses[i];
                    proofArray.push(buses[i]);
                }
            } else {
                break;
            }
        } else {
            test++;
        }
    }
    if (test == buses.length) {
        console.log(currentNumber);
        break;
    }
    currentNumber += step;
}

console.timeEnd('Time');