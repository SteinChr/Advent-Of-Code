import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let inputCups = input.split('').map(c => parseInt(c));
let cups = new Array(1000000);
let lastNumber = inputCups[inputCups.length - 1];
if (cups.length > inputCups.length) lastNumber = cups.length;
let result = 0;

for (let i = 0; i < cups.length; i++) {
    if (i < input.length) {
        cups[lastNumber - 1] = inputCups[i];
        lastNumber = inputCups[i];
    } else {
        cups[lastNumber - 1] = i + 1;
        lastNumber = i + 1;
    }
}

let currentCup = inputCups[0];

for (let i = 0; i < 10000000; i++) {
    let movingCup1 = cups[currentCup - 1];
    let movingCup2 = cups[movingCup1 - 1];
    let movingCup3 = cups[movingCup2 - 1];
    let movingCups = [movingCup1, movingCup2, movingCup3];
    
    let destinationCup = currentCup - 1;
    while(movingCups.includes(destinationCup)) {
        destinationCup--;
        if (destinationCup < 1) destinationCup = cups.length;
    }
    if (destinationCup < 1) destinationCup = cups.length;

    cups[currentCup - 1] = cups[movingCup3 - 1];
    cups[movingCup3 - 1] = cups[destinationCup - 1];
    cups[destinationCup - 1] = movingCup1;

    currentCup = cups[currentCup - 1];
}

result = cups[0] * cups[cups[0] - 1];
console.log(result);
console.timeEnd('Time');