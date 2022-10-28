import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let cups = input.split('').map(c => parseInt(c));
let currentCup = 0;
let result = '';

for (let i = 0; i < 100; i++) {
    let movingCups = [];
    if (currentCup + 3 < cups.length) {
        movingCups = [cups[currentCup + 1], cups[currentCup + 2], cups[currentCup + 3]];
    } else if (currentCup + 2 < cups.length) {
        movingCups = [cups[currentCup + 1], cups[currentCup + 2], cups[0]];
    } else if (currentCup + 1 < cups.length) {
        movingCups = [cups[currentCup + 1], cups[0], cups[1]];
    } else {
        movingCups = [cups[0], cups[1], cups[2]];
    }

    let newCurrentCup = cups[(currentCup + 4) % cups.length];
    let possibleCup = cups[currentCup] - 1;

    if (currentCup < cups.length - 3) {
        cups.splice(currentCup + 1, 3);
    } else if (currentCup < cups.length - 2) {
        cups.splice(currentCup + 1, 2);
        cups.shift();
    } else if (currentCup < cups.length - 1) {
        cups.splice(currentCup + 1, 1);
        cups.shift();
        cups.shift();
    } else {
        cups.shift();
        cups.shift();
        cups.shift();
    }

    let destinationCup = -1;

    while (destinationCup == -1) {
        if (cups.includes(possibleCup)) {
            destinationCup = possibleCup;
        } else if (possibleCup < 0) {
            possibleCup = Math.max(...cups);
        } else {
            possibleCup--;
        }
    }

    cups.splice(cups.indexOf(destinationCup) + 1, 0, ...movingCups);
    currentCup = cups.indexOf(newCurrentCup);
}

for (let i = cups.indexOf(1) + 1; i <= 8 + cups.indexOf(1); i++) {
    result += cups[i % cups.length];
}

console.log(result);
console.timeEnd('Time');