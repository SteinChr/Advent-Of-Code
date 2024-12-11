import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split('').map(y => parseInt(y)));
let result = 0;

class Path {
    x: number;
    y: number;
    currentHeight: number;
}

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == 0) {
            result += followPath(x, y);
        }
    }
}

function followPath(startX: number, startY: number): number {
    let paths: Path[] = [{ x: startX, y: startY, currentHeight: 0 }];
    let destinations = new Set<string>();

    while (paths.length != 0) {
        let currentPath = paths.shift();

        if (currentPath.currentHeight == 9) {
            destinations.add(currentPath.x + '_' + currentPath.y);
        }

        if (currentPath.y + 1 < input.length && input[currentPath.y + 1][currentPath.x] == currentPath.currentHeight + 1) {
            paths.push({ x: currentPath.x, y: currentPath.y + 1, currentHeight: currentPath.currentHeight + 1 });
        }
        if (currentPath.y - 1 >= 0 && input[currentPath.y - 1][currentPath.x] == currentPath.currentHeight + 1) {
            paths.push({ x: currentPath.x, y: currentPath.y - 1, currentHeight: currentPath.currentHeight + 1 });
        }
        if (currentPath.x + 1 < input[0].length && input[currentPath.y][currentPath.x + 1] == currentPath.currentHeight + 1) {
            paths.push({ x: currentPath.x + 1, y: currentPath.y, currentHeight: currentPath.currentHeight + 1 });
        }
        if (currentPath.x - 1 >= 0 && input[currentPath.y][currentPath.x - 1] == currentPath.currentHeight + 1) {
            paths.push({ x: currentPath.x - 1, y: currentPath.y, currentHeight: currentPath.currentHeight + 1 });
        }
    }

    return destinations.size;
}

console.log(result);
console.timeEnd('Time');