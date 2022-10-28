import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
input = input.substring(1, input.length - 1);

const gridSize = 300; // An die Input-Größe anpassen! Für die Test-Inputs reicht 7.

class ToDo {
    x: number;
    y: number;
    patterns: string[];
}

class Coordinate {
    x: number;
    y: number;
}

class Path {
    currentX: number;
    currentY: number;
    doors: number;
    lastMove: string;
}

let coordinateDirections = solveRegex();
let grid: string[][] = drawGrid(coordinateDirections);
let result = getMaxDoor(grid);

console.log(result);

function solveRegex() {
    let grid = new Map<string, string[]>();
    let todos = new Map<string, ToDo>();
    todos.set('0,0', { x: 0, y: 0, patterns: [input] });
    let currentX = 0;
    let currentY = 0;

    const addTodo = (x: number, y: number, pattern: string) => {
        const posKey = x + ',' + y;
        if (!todos.has(posKey)) {
            todos.set(posKey, { x: x, y: y, patterns: [pattern] });
        } else {
            const todo = todos.get(posKey);
            if (todo) {
                if (!todo.patterns.includes(pattern)) {
                    todo.patterns.push(pattern);
                }
            }
        }
    }

    for (let i = 0; todos.size > 0; i++) {
        let currentTodo = todos.entries().next().value;
        currentX = currentTodo[1].x;
        currentY = currentTodo[1].y;
        let currentPos = currentX.toString() + ',' + currentY.toString();
        let currentChar = todos.get(currentPos).patterns[0].charAt(0);

        if (currentChar == '(') {
            let endOfBracket = getEndOfBracket(todos.get(currentPos).patterns[0].split(''));
            for (const part of replacePipesOnSameLevel(todos.get(currentPos).patterns[0].split('')).substring(1, endOfBracket).split('!').map(x => x + todos.get(currentPos).patterns[0].substring(endOfBracket + 1))) {
                addTodo(currentX, currentY, part);
            }
            todos.get(currentPos).patterns.shift();
        } else if (currentChar == 'N' || currentChar == 'E' || currentChar == 'S' || currentChar == 'W') {
            if (grid.has(currentPos)) {
                if (!grid.get(currentPos).includes(currentChar)) grid.set(currentPos, [...grid.get(currentPos), currentChar])
            } else {
                grid.set(currentPos, [currentChar]);
            }

            let oldPos = currentPos;

            if (currentChar == 'N') currentY--;
            if (currentChar == 'E') currentX++;
            if (currentChar == 'W') currentX--;
            if (currentChar == 'S') currentY++;
            currentPos = currentX.toString() + ',' + currentY.toString();

            if (todos.get(oldPos).patterns[0].length > 1) addTodo(currentX, currentY, todos.get(oldPos).patterns[0].substring(1));
            todos.get(oldPos).patterns.shift();
            if (todos.get(oldPos).patterns.length == 0 || (todos.get(oldPos).patterns.length == 1 && todos.get(oldPos).patterns[0] == '')) todos.delete(oldPos);
        }
    }
    return grid;
}

function getEndOfBracket(input: string[]): number {
    let pos = 1;
    let level = 0;
    while (true) {
        if (input[pos] == ')' && level == 0) return pos;
        if (input[pos] == '(') level++;
        if (input[pos] == ')') level--;
        pos++;
    }
}

function replacePipesOnSameLevel(input: string[]): string {
    let pos = 1;
    let level = 0;
    while (level >= 0) {
        if (input[pos] == '(') level++;
        if (input[pos] == ')') level--;
        if (input[pos] == '|' && level == 0) input[pos] = '!';
        pos++;
    }
    return input.join('');
}

function drawGrid(coordinateDirections): string[][] {
    let grid: string[][] = new Array(gridSize * 2 + 1);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(gridSize * 2 + 1).fill('#');
    }
    grid[gridSize][gridSize] = 'X';

    while (coordinateDirections.size > 0) {
        let currentCoordinateEntry = coordinateDirections.entries().next().value;
        coordinateDirections.delete(currentCoordinateEntry[0]);

        let currentX = parseInt(currentCoordinateEntry[0].split(',')[0]) * 2 + gridSize;
        let currentY = parseInt(currentCoordinateEntry[0].split(',')[1]) * 2 + gridSize;
        let directionsToTravel: string[] = currentCoordinateEntry[1].slice();

        for (let l = 0; l < directionsToTravel.length; l++) {
            if (directionsToTravel[l] == 'N') {
                grid[currentY - 1][currentX] = '-';
                grid[currentY - 2][currentX] = '.';
            } else if (directionsToTravel[l] == 'E') {
                grid[currentY][currentX + 1] = '|';
                grid[currentY][currentX + 2] = '.';
            } else if (directionsToTravel[l] == 'S') {
                grid[currentY + 1][currentX] = '-';
                grid[currentY + 2][currentX] = '.';
            } else if (directionsToTravel[l] == 'W') {
                grid[currentY][currentX - 1] = '|';
                grid[currentY][currentX - 2] = '.';
            }
        }
    }
    return grid;
}

function getMaxDoor(grid: string[][]): number {
    let rooms: Coordinate[] = [];
    let doors: number[] = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == '.') rooms.push({ x: x, y: y });
        }
    }

    for (let i = 0; i < rooms.length; i++) {
        doors.push(countDoors(rooms[i].x, rooms[i].y, grid));
    }

    return doors.filter(x => x >= 1000).length;
}

function countDoors(destinationX: number, destinationY: number, grid: string[][]): number {
    let paths: Path[] = [{ currentX: destinationX, currentY: destinationY, doors: 0, lastMove: '' }];
    while (paths.every(x => x.currentX != gridSize || x.currentY != gridSize)) {
        let newPaths: Path[] = [];
        for (let i = 0; i < paths.length; i++) {
            let possibleOptions = [0, 0, 0, 0];
            if (grid[paths[i].currentY - 1][paths[i].currentX] == '-') possibleOptions[0] = 1; // up
            if (grid[paths[i].currentY][paths[i].currentX + 1] == '|') possibleOptions[1] = 1; // right
            if (grid[paths[i].currentY + 1][paths[i].currentX] == '-') possibleOptions[2] = 1; // down
            if (grid[paths[i].currentY][paths[i].currentX - 1] == '|') possibleOptions[3] = 1; // left

            if (paths[i].lastMove == 'up') possibleOptions[2] = 0;
            if (paths[i].lastMove == 'down') possibleOptions[0] = 0;
            if (paths[i].lastMove == 'right') possibleOptions[3] = 0;
            if (paths[i].lastMove == 'left') possibleOptions[1] = 0;

            if (possibleOptions[0] == 1) newPaths.push({ currentX: paths[i].currentX, currentY: paths[i].currentY - 2, doors: paths[i].doors + 1, lastMove: 'up' });
            if (possibleOptions[1] == 1) newPaths.push({ currentX: paths[i].currentX + 2, currentY: paths[i].currentY, doors: paths[i].doors + 1, lastMove: 'right' });
            if (possibleOptions[2] == 1) newPaths.push({ currentX: paths[i].currentX, currentY: paths[i].currentY + 2, doors: paths[i].doors + 1, lastMove: 'down' });
            if (possibleOptions[3] == 1) newPaths.push({ currentX: paths[i].currentX - 2, currentY: paths[i].currentY, doors: paths[i].doors + 1, lastMove: 'left' });
        }
        paths = newPaths.slice();
    }
    return paths.find(x => x.currentX == gridSize && x.currentY == gridSize).doors;
}

console.timeEnd('Time');