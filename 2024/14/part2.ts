import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/=|,|\s/));
let result = 0;

class Robot {
    posX: number;
    posY: number;
    velX: number;
    velY: number
}

let xLength = 101;
let yLength = 103;

let robots: Robot[] = [];

for (let i = 0; i < input.length; i++) {
    robots.push({ posX: parseInt(input[i][1]), posY: parseInt(input[i][2]), velX: parseInt(input[i][4]), velY: parseInt(input[i][5]) });
}

for (let s = 1; true; s++) {
    for (let r = 0; r < robots.length; r++) {
        robots[r].posX += robots[r].velX;
        robots[r].posY += robots[r].velY;

        if (robots[r].posX < 0) robots[r].posX += xLength;
        if (robots[r].posY < 0) robots[r].posY += yLength;
        if (robots[r].posX >= xLength) robots[r].posX -= xLength;
        if (robots[r].posY >= yLength) robots[r].posY -= yLength;
    }

    let neighbours = 0;
    let grid: string[][] = [];

    for (let i = 0; i < yLength; i++) {
        grid[i] = new Array(xLength).fill('.');
    }

    for (let r = 0; r < robots.length; r++) {
        grid[robots[r].posY][robots[r].posX] = '#';
    }

    for (let r = 0; r < robots.length; r++) {
        if (robots[r].posY > 0 && grid[robots[r].posY - 1][robots[r].posX] == '#') neighbours++;
        if (robots[r].posY < yLength - 1 && grid[robots[r].posY + 1][robots[r].posX] == '#') neighbours++;
        if (robots[r].posX > 0 && grid[robots[r].posY][robots[r].posX - 1] == '#') neighbours++;
        if (robots[r].posX < xLength - 1 && grid[robots[r].posY][robots[r].posX + 1] == '#') neighbours++;
    }

    if (neighbours > 700) {
        result = s;
        break;
    }
}

console.log(result);
console.timeEnd('Time');