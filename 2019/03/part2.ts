import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8').split('\r\n');
let instructions = [input[0].split(','), input[1].split(',')];
const length = 6300;
let grid = new Array(length * 2);
let right = length;
let down = length;
let matches = [];
let steps = 1;
let result = 0;

for (let i = 0; i < length * 2; i++) {
    grid[i] = new Array(length * 2).fill(0);
}

for (let l = 0; l < instructions[0].length; l++) {
    if (instructions[0][l].charAt(0) == 'R') {
        for (let j = 1; j <= parseInt(instructions[0][l].slice(1, instructions[0][l].length)); j++) {
            grid[down][right + j] = steps;
            steps++;
        }
        right += parseInt(instructions[0][l].slice(1, instructions[0][l].length));
    } else if (instructions[0][l].charAt(0) == 'L') {
        for (let j = 1; j <= parseInt(instructions[0][l].slice(1, instructions[0][l].length)); j++) {
            grid[down][right - j] = steps;
            steps++;
        }
        right -= parseInt(instructions[0][l].slice(1, instructions[0][l].length));
    } else if (instructions[0][l].charAt(0) == 'D') {
        for (let j = 1; j <= parseInt(instructions[0][l].slice(1, instructions[0][l].length)); j++) {
            grid[down + j][right] = steps;
            steps++;
        }
        down += parseInt(instructions[0][l].slice(1, instructions[0][l].length));
    } else if (instructions[0][l].charAt(0) == 'U') {
        for (let j = 1; j <= parseInt(instructions[0][l].slice(1, instructions[0][l].length)); j++) {
            grid[down - j][right] = steps;
            steps++;
        }
        down -= parseInt(instructions[0][l].slice(1, instructions[0][l].length));
    }
}

right = length;
down = length;
steps = 1;

for (let l = 0; l < instructions[1].length; l++) {
    if (instructions[1][l].charAt(0) == 'R') {
        for (let j = 1; j <= parseInt(instructions[1][l].slice(1, instructions[1][l].length)); j++) {
            if (grid[down][right + j] != 0) {
                matches.push(steps + grid[down][right + j]);
            }
            steps++;
        }
        right += parseInt(instructions[1][l].slice(1, instructions[1][l].length));
    } else if (instructions[1][l].charAt(0) == 'L') {
        for (let j = 1; j <= parseInt(instructions[1][l].slice(1, instructions[1][l].length)); j++) {
            if (grid[down][right - j] != 0) {
                matches.push(steps + grid[down][right - j]);
            }
            steps++;
        }
        right -= parseInt(instructions[1][l].slice(1, instructions[1][l].length));
    } else if (instructions[1][l].charAt(0) == 'D') {
        for (let j = 1; j <= parseInt(instructions[1][l].slice(1, instructions[1][l].length)); j++) {
            if (grid[down + j][right] != 0) {
                matches.push(steps + grid[down + j][right]);
            }
            steps++;
        }
        down += parseInt(instructions[1][l].slice(1, instructions[1][l].length));
    } else if (instructions[1][l].charAt(0) == 'U') {
        for (let j = 1; j <= parseInt(instructions[1][l].slice(1, instructions[1][l].length)); j++) {
            if (grid[down - j][right] != 0) {
                matches.push(steps + grid[down - j][right]);
            }
            steps++;
        }
        down -= parseInt(instructions[1][l].slice(1, instructions[1][l].length));
    }
}

for (let i = 0; i < matches.length; i++) {
    if (i == 0) {
        result = matches[i];
    } else {
        if (matches[i] < result) {
            result = matches[i];
        }
    }
}

console.log(result);
console.timeEnd('Time');