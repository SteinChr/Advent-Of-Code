import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
const alphabet: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let result = Number.MAX_VALUE;

class Position {
    x: number;
    y: number;
}

class Path {
    x: number;
    y: number;
    letterIndex: number;
    visited: string[];
    counter: number;
}

let start: Position;
for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == 'S') {
            input[y][x] = 'a';
        }
        if (input[y][x] == 'E') {
            start = { x: x, y: y };
            input[y][x] = 'z';
        }
    }
}

let pathsToCheck: Path[] = [{ x: start.x, y: start.y, letterIndex: 0, visited: [], counter: 0 }];
let bestScores: number[][] = new Array(input.length);
for (let y = 0; y < bestScores.length; y++) {
    bestScores[y] = new Array(input[y].length);
    for (let x = 0; x < bestScores[y].length; x++) {
        bestScores[y][x] = Number.MAX_VALUE;
    }
}

for (let i = 0; pathsToCheck.length != 0; i++) {
    let currentPath = pathsToCheck.shift();
    if (currentPath.counter < result) {
        if (input[currentPath.y][currentPath.x] == 'a') {
            result = currentPath.counter;
            break;
        } else {
            if (currentPath.x < input[0].length - 1 && !currentPath.visited.includes((currentPath.x + 1) + ',' + currentPath.y) && alphabet.indexOf(input[currentPath.y][currentPath.x]) - 1 <= alphabet.indexOf(input[currentPath.y][currentPath.x + 1])) { // right
                if (currentPath.counter + 1 < bestScores[currentPath.y][currentPath.x + 1]) {
                    pathsToCheck.push({ x: currentPath.x + 1, y: currentPath.y, letterIndex: alphabet.indexOf(input[currentPath.y][currentPath.x + 1]), visited: [...currentPath.visited, (currentPath.x + 1) + ',' + currentPath.y], counter: currentPath.counter + 1 });
                    bestScores[currentPath.y][currentPath.x + 1] = currentPath.counter;
                }
            }
            if (currentPath.x > 0 && !currentPath.visited.includes((currentPath.x - 1) + ',' + currentPath.y) && alphabet.indexOf(input[currentPath.y][currentPath.x]) - 1 <= alphabet.indexOf(input[currentPath.y][currentPath.x - 1])) { // left
                if (currentPath.counter + 1 < bestScores[currentPath.y][currentPath.x - 1]) {
                    pathsToCheck.push({ x: currentPath.x - 1, y: currentPath.y, letterIndex: alphabet.indexOf(input[currentPath.y][currentPath.x - 1]), visited: [...currentPath.visited, (currentPath.x - 1) + ',' + currentPath.y], counter: currentPath.counter + 1 });
                    bestScores[currentPath.y][currentPath.x - 1] = currentPath.counter;
                }
            }
            if (currentPath.y < input.length - 1 && !currentPath.visited.includes(currentPath.x + ',' + (currentPath.y + 1)) && alphabet.indexOf(input[currentPath.y][currentPath.x]) - 1 <= alphabet.indexOf(input[currentPath.y + 1][currentPath.x])) { // down
                if (currentPath.counter + 1 < bestScores[currentPath.y + 1][currentPath.x]) {
                    pathsToCheck.push({ x: currentPath.x, y: currentPath.y + 1, letterIndex: alphabet.indexOf(input[currentPath.y + 1][currentPath.x]), visited: [...currentPath.visited, currentPath.x + ',' + (currentPath.y + 1)], counter: currentPath.counter + 1 });
                    bestScores[currentPath.y + 1][currentPath.x] = currentPath.counter;
                }
            }
            if (currentPath.y > 0 && !currentPath.visited.includes(currentPath.x + ',' + (currentPath.y - 1)) && alphabet.indexOf(input[currentPath.y][currentPath.x]) - 1 <= alphabet.indexOf(input[currentPath.y - 1][currentPath.x])) { // up
                if (currentPath.counter + 1 < bestScores[currentPath.y - 1][currentPath.x]) {
                    pathsToCheck.push({ x: currentPath.x, y: currentPath.y - 1, letterIndex: alphabet.indexOf(input[currentPath.y - 1][currentPath.x]), visited: [...currentPath.visited, currentPath.x + ',' + (currentPath.y - 1)], counter: currentPath.counter + 1 });
                    bestScores[currentPath.y - 1][currentPath.x] = currentPath.counter;
                }
            }
        }
    }
}

console.log(result);
console.timeEnd('Time');