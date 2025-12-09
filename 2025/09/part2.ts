import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(',').map(y => parseInt(y)));
let result = 0;

class Point {
    oldX: number;
    oldY: number;
    newX: number;
    newY: number;
}

class ToCheck {
    x: number;
    y: number;
}

let allX: number[] = [];
let allY: number[] = [];

for (let i = 0; i < input.length; i++) {
    if (!allX.includes(input[i][0])) allX.push(input[i][0]);
    if (!allY.includes(input[i][1])) allY.push(input[i][1]);
}

allX.sort((a, b) => a - b);
allY.sort((a, b) => a - b);

let points: Point[] = [];

for (let i = 0; i < input.length; i++) {
    points.push({ oldX: input[i][0], oldY: input[i][1], newX: 2 * allX.indexOf(input[i][0]) + 1, newY: 2 * allY.indexOf(input[i][1]) + 1 });
}

points.push(points[0]);

let grid: string[][] = [];

for (let i = 0; i < allY.length * 2; i++) {
    grid[i] = new Array(allX.length * 2).fill('.');

    grid[i].push('.');
    grid[i].unshift('.');
}

grid.push(new Array(allX.length * 2 + 2).fill('.'));
grid.unshift(new Array(allX.length * 2 + 2).fill('.'));

for (let i = 0; i < points.length - 1; i++) {
    grid[points[i].newY][points[i].newX] = '#';

    if (points[i].newX == points[i + 1].newX) {
        for (let y = Math.min(points[i].newY, points[i + 1].newY); y < Math.max(points[i].newY, points[i + 1].newY); y++) {
            grid[y][points[i].newX] = '#';
        }
    } else {
        for (let x = Math.min(points[i].newX, points[i + 1].newX); x < Math.max(points[i].newX, points[i + 1].newX); x++) {
            grid[points[i].newY][x] = '#';
        }
    }
}

grid[0][0] = 'o';

let toCheck: ToCheck[] = [{ x: 0, y: 0 }];

while (toCheck.length != 0) {
    let currentToCheck = toCheck.shift();

    if (currentToCheck.x > 0 && grid[currentToCheck.y][currentToCheck.x - 1] == '.') {
        grid[currentToCheck.y][currentToCheck.x - 1] = 'o';
        toCheck.push({ x: currentToCheck.x - 1, y: currentToCheck.y });
    }

    if (currentToCheck.x < grid[0].length - 1 && grid[currentToCheck.y][currentToCheck.x + 1] == '.') {
        grid[currentToCheck.y][currentToCheck.x + 1] = 'o';
        toCheck.push({ x: currentToCheck.x + 1, y: currentToCheck.y });
    }

    if (currentToCheck.y > 0 && grid[currentToCheck.y - 1][currentToCheck.x] == '.') {
        grid[currentToCheck.y - 1][currentToCheck.x] = 'o';
        toCheck.push({ x: currentToCheck.x, y: currentToCheck.y - 1 });
    }

    if (currentToCheck.y < grid.length - 1 && grid[currentToCheck.y + 1][currentToCheck.x] == '.') {
        grid[currentToCheck.y + 1][currentToCheck.x] = 'o';
        toCheck.push({ x: currentToCheck.x, y: currentToCheck.y + 1 });
    }
}

let validRectangles: number[][] = [];

for (let p1 = 0; p1 < points.length; p1++) {
    for (let p2 = p1 + 1; p2 < points.length; p2++) {
        let validRectangle: boolean = true;

        for (let y = Math.min(points[p1].newY, points[p2].newY); y <= Math.max(points[p1].newY, points[p2].newY) && validRectangle; y++) {
            for (let x = Math.min(points[p1].newX, points[p2].newX); x <= Math.max(points[p1].newX, points[p2].newX) && validRectangle; x++) {
                if (grid[y][x] == 'o') validRectangle = false;
            }
        }

        if (validRectangle) validRectangles.push([p1, p2]);
    }
}

for (let i = 0; i < validRectangles.length; i++) {    
    let area = (Math.abs(points[validRectangles[i][0]].oldX - points[validRectangles[i][1]].oldX) + 1) * (Math.abs(points[validRectangles[i][0]].oldY - points[validRectangles[i][1]].oldY) + 1);
    if (area > result) result = area;
}

console.log(result);
console.timeEnd('Time');