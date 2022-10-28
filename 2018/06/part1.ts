import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(', ').map(y => parseInt(y)));
let counter1 = new Array(input.length).fill(0);
let counter2 = new Array(input.length).fill(0);
let gridSize = 500;
let possibleResults = [];
let result = 0;
for (let t = 0; t < 2; t++) {
    let grid = new Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
        grid[i] = new Array(gridSize);
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = -1;
        }
    }
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] != -2) {
                let currentSmallestDistance = Number.MAX_VALUE;
                for (let i = 0; i < input.length; i++) {
                    let currentDistance = calculateManhattanDistance(x, y, input[i][0], input[i][1]);
                    if (currentDistance < currentSmallestDistance) {
                        grid[y][x] = i;
                        currentSmallestDistance = currentDistance;
                    } else if (currentDistance == currentSmallestDistance) {
                        grid[y][x] = -2;
                    }
                }
            }
        }
    }
    for (let i = 0; i < input.length; i++) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (t == 0) {
                    if (grid[y][x] == i) counter1[i]++;
                } else {
                    if (grid[y][x] == i) counter2[i]++;
                }
            }
        }
    }
    gridSize += 10;
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            input[y][x] += 5;
        }
    }
}

for (let i = 0; i < counter1.length; i++) {
    if (counter1[i] == counter2[i]) possibleResults.push(counter1[i]);
}
result = Math.max(...possibleResults);
console.log(result);

function calculateManhattanDistance(x1, y1, x2, y2): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

console.timeEnd('Time');