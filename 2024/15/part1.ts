import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n');
let result = 0;

class Pos {
    x: number;
    y: number;
}

let grid: string[][] = input[0].split('\r\n').map(x => x.split(''));
let instructions: string[] = input[1].split(/\r\n|/);

let robotPos: Pos = { x: -1, y: -1 };
let directions = new Map<string, Pos>();

directions.set('^', { x: 0, y: -1 });
directions.set('>', { x: 1, y: 0 });
directions.set('v', { x: 0, y: 1 });
directions.set('<', { x: -1, y: 0 });

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] == '@') robotPos = { x: x, y: y };
    }
}

for (let i = 0; i < instructions.length; i++) {
    let currentDirection = directions.get(instructions[i]);

    if (grid[robotPos.y + currentDirection.y][robotPos.x + currentDirection.x] == '.') {
        grid[robotPos.y][robotPos.x] = '.';
        robotPos.y += currentDirection.y;
        robotPos.x += currentDirection.x;
        grid[robotPos.y][robotPos.x] = '@';
    } else if (grid[robotPos.y + currentDirection.y][robotPos.x + currentDirection.x] == 'O') {
        for (let p = 2; true; p++) {
            if (grid[robotPos.y + currentDirection.y * p][robotPos.x + currentDirection.x * p] == '.') {
                grid[robotPos.y + currentDirection.y * p][robotPos.x + currentDirection.x * p] = 'O';

                grid[robotPos.y][robotPos.x] = '.';
                robotPos.y += currentDirection.y;
                robotPos.x += currentDirection.x;
                grid[robotPos.y][robotPos.x] = '@';

                break;
            } else if (grid[robotPos.y + currentDirection.y * p][robotPos.x + currentDirection.x * p] == '#') {
                break;
            }
        }
    }
}

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] == 'O') result += 100 * y + x;
    }
}

console.log(result);
console.timeEnd('Time');