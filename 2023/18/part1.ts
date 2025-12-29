import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' '));
let result = 0;

class Position {
    x: number;
    y: number;
}

const gridSize = 300;
let grid: string[][] = new Array(gridSize * 2);

for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(gridSize * 2).fill('.');
}

let currentPosition: Position = { x: gridSize, y: gridSize };
grid[currentPosition.y][currentPosition.x] = '#';

for (let i = 0; i < input.length; i++) {    
    if (input[i][0] == 'R') {
        for (let t = currentPosition.x + 1; t <= currentPosition.x + parseInt(input[i][1]); t++) {
            grid[currentPosition.y][t] = '#';
        }

        currentPosition.x += parseInt(input[i][1]);
    } else if (input[i][0] == 'L') {
        for (let t = currentPosition.x - 1; t >= currentPosition.x - parseInt(input[i][1]); t--) {
            grid[currentPosition.y][t] = '#';
        }

        currentPosition.x -= parseInt(input[i][1]);
    } else if (input[i][0] == 'D') {
        for (let t = currentPosition.y + 1; t <= currentPosition.y + parseInt(input[i][1]); t++) {
            grid[t][currentPosition.x] = '#';
        }

        currentPosition.y += parseInt(input[i][1]);
    } else if (input[i][0] == 'U') {
        for (let t = currentPosition.y - 1; t >= currentPosition.y - parseInt(input[i][1]); t--) {
            grid[t][currentPosition.x] = '#';
        }

        currentPosition.y -= parseInt(input[i][1]);
    }
}

let pointsToCheck: Position[] = [{ x: 0, y: 0 }];
grid[0][0] = 'O';

while (pointsToCheck.length != 0) {
    let currentPointToCheck = pointsToCheck.shift();

    if (currentPointToCheck.x < grid[0].length - 1 && grid[currentPointToCheck.y][currentPointToCheck.x + 1] == '.') {
        pointsToCheck.push({ x: currentPointToCheck.x + 1, y: currentPointToCheck.y });
        grid[currentPointToCheck.y][currentPointToCheck.x + 1] = 'O';
    }

    if (currentPointToCheck.x > 0 && grid[currentPointToCheck.y][currentPointToCheck.x - 1] == '.') {
        pointsToCheck.push({ x: currentPointToCheck.x - 1, y: currentPointToCheck.y });
        grid[currentPointToCheck.y][currentPointToCheck.x - 1] = 'O';
    }

    if (currentPointToCheck.y < grid.length - 1 && grid[currentPointToCheck.y + 1][currentPointToCheck.x] == '.') {
        pointsToCheck.push({ x: currentPointToCheck.x, y: currentPointToCheck.y + 1 });
        grid[currentPointToCheck.y + 1][currentPointToCheck.x] = 'O';
    }
    
    if (currentPointToCheck.y > 0 && grid[currentPointToCheck.y - 1][currentPointToCheck.x] == '.') {
        pointsToCheck.push({ x: currentPointToCheck.x, y: currentPointToCheck.y - 1 });
        grid[currentPointToCheck.y - 1][currentPointToCheck.x] = 'O';
    }
}

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] == '.' || grid[y][x] == '#') result++;
    }
}

console.log(result);
console.timeEnd('Time');