import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Position {
    x: number;
    y: number;
}

class Path {
    pos: Position;
    length: number;
    visited: Set<string>;
    lastPos: Position;
}

let start: Position = { x: -1, y: 0 };
let destination: Position = { x: -1, y: input.length - 1 };
let possiblePathLengths: number[] = [];

for (let x = 0; x < input[0].length; x++) {
    if (input[0][x] == '.') start.x = x;
    if (input[input.length - 1][x] == '.') destination.x = x;
}

let paths: Path[] = [{ pos: start, length: 0, visited: new Set<string>(), lastPos: { x: -1, y: -1 } }];

for (let a = 0; paths.length != 0; a++) {
    let posChanges: Position[] = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }];
    let currentPath = paths.shift();
    if (currentPath.lastPos.x != -1) currentPath.visited.add(getStringFromPos(currentPath.lastPos));
    currentPath.visited.add(getStringFromPos(currentPath.pos));

    if (currentPath.pos.y == destination.y && currentPath.pos.x == destination.x) {
        possiblePathLengths.push(currentPath.length);
    } else {
        for (let i = 0; i < posChanges.length; i++) {
            if (currentPath.pos.y + posChanges[i].y >= 0) {
                if (input[currentPath.pos.y + posChanges[i].y][currentPath.pos.x + posChanges[i].x] == '.') {
                    let stringPos = getStringFromPos({ x: currentPath.pos.x + posChanges[i].x, y: currentPath.pos.y + posChanges[i].y });

                    if (!currentPath.visited.has(stringPos)) {
                        paths.push({ pos: { x: currentPath.pos.x + posChanges[i].x, y: currentPath.pos.y + posChanges[i].y }, length: currentPath.length + 1, visited: new Set(JSON.parse(JSON.stringify([...currentPath.visited]))), lastPos: { x: -1, y: -1 } });
                    }
                } else if (input[currentPath.pos.y + posChanges[i].y][currentPath.pos.x + posChanges[i].x] != '#') {
                    let lastPos: Position = { x: currentPath.pos.x + posChanges[i].x, y: currentPath.pos.y + posChanges[i].y };

                    if (input[currentPath.pos.y + posChanges[i].y][currentPath.pos.x + posChanges[i].x] == 'v') posChanges[i].y++;
                    if (input[currentPath.pos.y + posChanges[i].y][currentPath.pos.x + posChanges[i].x] == '<') posChanges[i].x--;
                    if (input[currentPath.pos.y + posChanges[i].y][currentPath.pos.x + posChanges[i].x] == '>') posChanges[i].x++;
                    if (input[currentPath.pos.y + posChanges[i].y][currentPath.pos.x + posChanges[i].x] == '^') posChanges[i].y--;

                    let stringPos = getStringFromPos({ x: currentPath.pos.x + posChanges[i].x, y: currentPath.pos.y + posChanges[i].y });
                    
                    if (!currentPath.visited.has(stringPos)) {
                        paths.push({ pos: { x: currentPath.pos.x + posChanges[i].x, y: currentPath.pos.y + posChanges[i].y }, length: currentPath.length + 2, visited: new Set(JSON.parse(JSON.stringify([...currentPath.visited]))), lastPos: lastPos });
                    }
                }
            }
        }
    }
}

result = Math.max(...possiblePathLengths);
console.log(result);

function getStringFromPos(pos: Position): string {
    return pos.x.toString() + '_' + pos.y.toString();
}

console.timeEnd('Time');