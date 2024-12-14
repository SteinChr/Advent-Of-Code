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

for (let s = 0; s < 100; s++) {
    for (let r = 0; r < robots.length; r++) {
        robots[r].posX += robots[r].velX;
        robots[r].posY += robots[r].velY;

        if (robots[r].posX < 0) robots[r].posX += xLength;
        if (robots[r].posY < 0) robots[r].posY += yLength;
        if (robots[r].posX >= xLength) robots[r].posX -= xLength;
        if (robots[r].posY >= yLength) robots[r].posY -= yLength;
    }
}

let xBorder = Math.floor(xLength / 2);
let yBorder = Math.floor(yLength / 2);

let quadrants: number[] = [0, 0, 0, 0];

for (let r = 0; r < robots.length; r++) {
    if (robots[r].posX < xBorder && robots[r].posY < yBorder) quadrants[0]++;
    if (robots[r].posX > xBorder && robots[r].posY < yBorder) quadrants[1]++;
    if (robots[r].posX < xBorder && robots[r].posY > yBorder) quadrants[2]++;
    if (robots[r].posX > xBorder && robots[r].posY > yBorder) quadrants[3]++;
}

result = quadrants[0] * quadrants[1] * quadrants[2] * quadrants[3];

console.log(result);
console.timeEnd('Time');