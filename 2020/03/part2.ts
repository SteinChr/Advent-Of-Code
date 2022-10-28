import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let grid = input.split('\r\n');
let numberOfTrees = 0;
let row = 0;
let col = 0;
let pattern = [{ right: 1, down: 1 }, { right: 3, down: 1 }, { right: 5, down: 1 }, { right: 7, down: 1 }, { right: 1, down: 2 }];
let result = 1;

for (let l = 0; l < pattern.length; l++) {
    for (let i = 0; i < grid.length; i += pattern[l].down) {
        if (grid[row].charAt(col % grid[row].length) === '#') {
            numberOfTrees++;
        }
        row += pattern[l].down;
        col += pattern[l].right;
    }
    result *= numberOfTrees;
    numberOfTrees = 0;
    row = 0;
    col = 0;
}
console.log(result);
console.timeEnd('Time');