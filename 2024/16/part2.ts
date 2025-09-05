import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Pos {
    x: number;
    y: number;
}

class Path {
    pos: Pos;
    visited: string;
    score: number;
    lastDir: Pos;
    numberOfMoves: number;
}

let directions: Pos[] = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];
let scoreOfBestPath = Number.MAX_VALUE;

let start: Pos = { x: -1, y: -1 };
let end: Pos = { x: -1, y: -1 };

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == 'S') {
            start = { x: x, y: y };
            input[y][x] = '.';
        }

        if (input[y][x] == 'E') {
            end = { x: x, y: y };
            input[y][x] = '.';
        }
    }
}

let paths: Path[] = [{ pos: { x: start.x, y: start.y }, visited: getStringFromPos(start), score: 0, lastDir: { x: 1, y: 0 }, numberOfMoves: 0 }];

let lowestCosts: number[][] = new Array(input.length);
for (let i = 0; i < lowestCosts.length; i++) {
    lowestCosts[i] = new Array(input[i].length).fill(Number.MAX_VALUE);
}

for (let i = 0; paths.length != 0; i++) {
    let currentPath = paths.shift();

    if (currentPath.pos.x == end.x && currentPath.pos.y == end.y) {
        if (scoreOfBestPath > currentPath.score) scoreOfBestPath = currentPath.score;
    } else {
        for (let d = 0; d < directions.length; d++) {
            if (input[currentPath.pos.y + directions[d].y][currentPath.pos.x + directions[d].x] == '.' && !currentPath.visited.includes(getStringFromPos({ x: currentPath.pos.x + directions[d].x, y: currentPath.pos.y + directions[d].y }))) {
                let costOfMove = 1;
                if (currentPath.lastDir.x != directions[d].x || currentPath.lastDir.y != directions[d].y) costOfMove += 1000;

                if (currentPath.score + costOfMove < scoreOfBestPath && currentPath.score + costOfMove < lowestCosts[currentPath.pos.y + directions[d].y][currentPath.pos.x + directions[d].x]) {
                    paths.push({ pos: { x: currentPath.pos.x + directions[d].x, y: currentPath.pos.y + directions[d].y }, visited: currentPath.visited + getStringFromPos({ x: currentPath.pos.x + directions[d].x, y: currentPath.pos.y + directions[d].y }), score: currentPath.score + costOfMove, lastDir: { x: directions[d].x, y: directions[d].y }, numberOfMoves: currentPath.numberOfMoves + 1 });
                    lowestCosts[currentPath.pos.y][currentPath.pos.x] = currentPath.score;
                }
            }
        }
    }

    paths.sort((a, b) => b.numberOfMoves - a.numberOfMoves);
}

paths = [{ pos: { x: start.x, y: start.y }, visited: getStringFromPos(start), score: 0, lastDir: { x: 1, y: 0 }, numberOfMoves: 0 }];

let bestVisited = new Set<string>();

for (let i = 0; paths.length != 0; i++) {
    let currentPath = paths.shift();

    if (currentPath.pos.x == end.x && currentPath.pos.y == end.y) {
        if (currentPath.score == scoreOfBestPath) {
            let visitedSplitted = currentPath.visited.split('__');

            for (let v = 0; v < visitedSplitted.length; v++) {
                if (v == 0) {
                    bestVisited.add(visitedSplitted[v].slice(1));
                } else if (v == visitedSplitted.length - 1) {
                    bestVisited.add(visitedSplitted[v].slice(0, visitedSplitted[v].length - 1));
                } else {
                    bestVisited.add(visitedSplitted[v]);
                }
            }
        }
    } else {
        for (let d = 0; d < directions.length; d++) {
            if (input[currentPath.pos.y + directions[d].y][currentPath.pos.x + directions[d].x] == '.' && !currentPath.visited.includes(getStringFromPos({ x: currentPath.pos.x + directions[d].x, y: currentPath.pos.y + directions[d].y }))) {
                let costOfMove = 1;
                if (currentPath.lastDir.x != directions[d].x || currentPath.lastDir.y != directions[d].y) costOfMove += 1000;

                if (currentPath.score + costOfMove <= scoreOfBestPath && currentPath.score + costOfMove <= lowestCosts[currentPath.pos.y + directions[d].y][currentPath.pos.x + directions[d].x] + 1000) {
                    paths.push({ pos: { x: currentPath.pos.x + directions[d].x, y: currentPath.pos.y + directions[d].y }, visited: currentPath.visited + getStringFromPos({ x: currentPath.pos.x + directions[d].x, y: currentPath.pos.y + directions[d].y }), score: currentPath.score + costOfMove, lastDir: { x: directions[d].x, y: directions[d].y }, numberOfMoves: currentPath.numberOfMoves + 1 });
                    lowestCosts[currentPath.pos.y][currentPath.pos.x] = currentPath.score;
                }
            }
        }
    }

    paths.sort((a, b) => b.numberOfMoves - a.numberOfMoves);
}

result = bestVisited.size;
console.log(result);

function getStringFromPos(pos: Pos): string {
    return '_' + pos.x + '.' + pos.y + '_';
}

console.timeEnd('Time');