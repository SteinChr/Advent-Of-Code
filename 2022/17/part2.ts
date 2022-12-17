import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('');
let result = 0;

class Position {
    x: number;
    y: number;
}

const shapes: Position[][] = [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],
[{ x: 1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 2, y: -1 }, { x: 1, y: -2 }],
[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: -1 }, { x: 2, y: -2 }],
[{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -3 }],
[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }]];

let grid: string[][] = new Array(4);
for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(7).fill('.');
}

let currentShapeIndex = 0;
let currentMovementIndex = 0;
let currentHighestPoint = 4;
let previousHeight = 0;
let highestPoints: number[] = [];
let startingPosition: Position = { x: 2, y: currentHighestPoint - 4 };
let stopCycle = Number.MAX_VALUE;
let numberOfRepeatingElements = -1;
let deltaForEachRepetition = -1;

for (let shapesAdded = 0; shapesAdded < stopCycle; shapesAdded++) {
    startingPosition = { x: 2, y: currentHighestPoint - 4 };
    while (startingPosition.y < 3) {
        grid.unshift(new Array(7).fill('.'));
        currentHighestPoint = updateCurrentHighestPoint();
        startingPosition = { x: 2, y: currentHighestPoint - 4 };
    }
    let currentShapePositions: Position[] = [];
    for (let s = 0; s < shapes[currentShapeIndex % shapes.length].length; s++) {
        currentShapePositions.push({ x: startingPosition.x + shapes[currentShapeIndex % shapes.length][s].x, y: startingPosition.y + shapes[currentShapeIndex % shapes.length][s].y });
    }
    currentShapeIndex++;

    let movementPossible: boolean = true;
    while (movementPossible) {
        let movementDirection = input[currentMovementIndex % input.length] == '>' ? 1 : -1;
        currentMovementIndex++;
        for (let i = 0; i < currentShapePositions.length; i++) {
            if (currentShapePositions[i].x + movementDirection < 0 || currentShapePositions[i].x + movementDirection >= grid[0].length || grid[currentShapePositions[i].y][currentShapePositions[i].x + movementDirection] == '#') {
                movementPossible = false;
                break;
            }
        }
        if (movementPossible) {
            for (let i = 0; i < currentShapePositions.length; i++) {
                currentShapePositions[i].x += movementDirection;
            }
        }

        movementPossible = true;
        for (let i = 0; i < currentShapePositions.length; i++) {
            if (currentShapePositions[i].y + 1 >= grid.length || grid[currentShapePositions[i].y + 1][currentShapePositions[i].x] == '#') {
                movementPossible = false;
                break;
            }
        }
        if (movementPossible) {
            for (let i = 0; i < currentShapePositions.length; i++) {
                currentShapePositions[i].y++;
            }
        }
    }
    for (let i = 0; i < currentShapePositions.length; i++) {
        grid[currentShapePositions[i].y][currentShapePositions[i].x] = '#';
    }
    currentHighestPoint = updateCurrentHighestPoint();
    highestPoints.push(grid.length - currentHighestPoint - previousHeight);
    previousHeight = grid.length - currentHighestPoint;

    if (shapesAdded == 10000) {
        for (let r = 100; numberOfRepeatingElements == -1; r++) {
            if (highestPoints.slice(-r).join(',') == highestPoints.slice(-r * 2, -r).join(',')) numberOfRepeatingElements = r;
        }
        deltaForEachRepetition = highestPoints.slice(-numberOfRepeatingElements).reduce((previous, current) => previous + current, 0);
        stopCycle = ((1000000000000 - 10000) % numberOfRepeatingElements) + shapesAdded;
    }
}

result = (1000000000000 - stopCycle) / numberOfRepeatingElements * deltaForEachRepetition + (grid.length - currentHighestPoint);
console.log(result);

function updateCurrentHighestPoint() {
    for (let y = 0; y < grid.length; y++) {
        if (grid[y].includes('#')) return y;
    }
    return grid.length;
}

console.timeEnd('Time');