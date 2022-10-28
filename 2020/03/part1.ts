import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let grid = input.split('\r\n');
let numberOfTrees = 0;
let row = 0;
let col = 0;
let pattern = { right: 3, down: 1 };
let result = 0;

for (let i = 0; i < grid.length; i += pattern.down) {
    if (grid[row].charAt(col % grid[row].length) === '#') {
        numberOfTrees++;
    }
    row += pattern.down;
    col += pattern.right;
}

result = numberOfTrees;
console.log(result);
console.timeEnd('Time');