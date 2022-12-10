import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let cycle = 0;
let register = 1;
let secondCycle: boolean = false;
let grid: string[][] = new Array(6);
for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(40);
}

for (let i = 0; i < input.length; i++) {
    do {
        cycle++;

        if (Math.abs((cycle - 1) % 40 - register) <= 1) {
            grid[Math.floor((cycle - 1) / 40)][(cycle - 1) % 40] = '#';
        } else {
            grid[Math.floor((cycle - 1) / 40)][(cycle - 1) % 40] = '.';
        }

        let instruction = input[i].split(' ')[0];
        if (instruction == 'addx') {
            let currentRegister = parseInt(input[i].split(' ')[1]);
            if (secondCycle) {
                register += currentRegister;
                secondCycle = false;
            } else {
                secondCycle = true;
            }
        }
    } while (secondCycle);
}

for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(''));
}

console.timeEnd('Time');