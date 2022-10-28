import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let instructions = input.split('\r\n');
let letters = [];
let numbers = [];
let currentWayPointNorth = 1;
let currentWayPointEast = 10;
let currentNorth = 0;
let currentEast = 0;
let zwischenVar = 0;

for (let i = 0; i < instructions.length; i++) {
    letters.push(instructions[i].charAt(0));
    numbers.push(parseInt(instructions[i].slice(1)));
}

for (let i = 0; i < instructions.length; i++) {
    if (letters[i] == 'N') {
        currentWayPointNorth += numbers[i];
    } else if (letters[i] == 'E') {
        currentWayPointEast += numbers[i];
    } else if (letters[i] == 'S') {
        currentWayPointNorth -= numbers[i];
    } else if (letters[i] == 'W') {
        currentWayPointEast -= numbers[i];
    } else if (letters[i] == 'R') {
        if (numbers[i] == 90) {
            zwischenVar = currentWayPointNorth;
            currentWayPointNorth = currentWayPointEast * -1;
            currentWayPointEast = zwischenVar;
        } else if (numbers[i] == 180) {
            currentWayPointNorth = currentWayPointNorth * -1;
            currentWayPointEast = currentWayPointEast * -1;
        } else if (numbers[i] == 270) {
            zwischenVar = currentWayPointNorth * -1;
            currentWayPointNorth = currentWayPointEast;
            currentWayPointEast = zwischenVar;
        }
    } else if (letters[i] == 'L') {
        if (numbers[i] == 90) {
            zwischenVar = currentWayPointNorth * -1;
            currentWayPointNorth = currentWayPointEast;
            currentWayPointEast = zwischenVar;
        } else if (numbers[i] == 180) {
            currentWayPointNorth = currentWayPointNorth * -1;
            currentWayPointEast = currentWayPointEast * -1;
        } else if (numbers[i] == 270) {
            zwischenVar = currentWayPointNorth;
            currentWayPointNorth = currentWayPointEast * -1;
            currentWayPointEast = zwischenVar;
        }
    } else if (letters[i] == 'F') {
        currentNorth += currentWayPointNorth * numbers[i];
        currentEast += currentWayPointEast * numbers[i];
    }
}

let result = Math.abs(currentNorth) + Math.abs(currentEast);
console.log(result);
console.timeEnd('Time');