import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split('').map(y => parseInt(y)));

class Position {
    x: number;
    y: number;
    xDir: number;
    yDir: number;
    singleDirection: number;
    heatLoss: number;
    rank: number;
    visited: { x: number, y: number, singleDirection: number }[];
}

let positionsToCheck: Position[] = [{ x: 0, y: 0, xDir: 1, yDir: 0, singleDirection: 0, heatLoss: 0, rank: getRank(0, 0, 0), visited: [] }, { x: 0, y: 0, xDir: 0, yDir: 1, singleDirection: 0, heatLoss: 0, rank: getRank(0, 0, 0), visited: [] }];
let currentTotalMinHeat = Number.MAX_VALUE;

let visitedPositions = new Map<string, string>();
visitedPositions.set(getStringFromPosition(positionsToCheck[0]), '0_0');
visitedPositions.set(getStringFromPosition(positionsToCheck[1]), '0_0');

while (positionsToCheck.length != 0) {
    let currentPosition: Position;

    positionsToCheck.sort(sort);
    currentPosition = positionsToCheck.shift();

    if (currentPosition.y > 0) {
        if ((currentPosition.xDir == 1 || currentPosition.xDir == -1)) {
            let newPosition = { x: currentPosition.x, y: currentPosition.y - 1, xDir: 0, yDir: -1, singleDirection: 1, heatLoss: currentPosition.heatLoss + input[currentPosition.y - 1][currentPosition.x], rank: getRank(currentPosition.x, currentPosition.y - 1, currentPosition.heatLoss + input[currentPosition.y - 1][currentPosition.x]), visited: [...currentPosition.visited, { x: currentPosition.x, y: currentPosition.y, singleDirection: currentPosition.singleDirection }] };
            checkForDestination(newPosition);
            if (!visitedPositions.has(getStringFromPosition(newPosition))) {
                if (newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            } else {
                let dataOfOld = visitedPositions.get(getStringFromPosition(newPosition)).split('_').map(x => parseInt(x));
                if ((newPosition.heatLoss < dataOfOld[1] || newPosition.singleDirection < dataOfOld[0]) && newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            }
        } else if (currentPosition.yDir == -1 && currentPosition.singleDirection < 3) {
            let newPosition = { x: currentPosition.x, y: currentPosition.y - 1, xDir: 0, yDir: -1, singleDirection: currentPosition.singleDirection + 1, heatLoss: currentPosition.heatLoss + input[currentPosition.y - 1][currentPosition.x], rank: getRank(currentPosition.x, currentPosition.y - 1, currentPosition.heatLoss + input[currentPosition.y - 1][currentPosition.x]), visited: [...currentPosition.visited, { x: currentPosition.x, y: currentPosition.y, singleDirection: currentPosition.singleDirection }] };
            checkForDestination(newPosition);
            if (!visitedPositions.has(getStringFromPosition(newPosition))) {
                if (newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            } else {
                let dataOfOld = visitedPositions.get(getStringFromPosition(newPosition)).split('_').map(x => parseInt(x));
                if ((newPosition.heatLoss < dataOfOld[1] || newPosition.singleDirection < dataOfOld[0]) && newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            }
        }
    }

    if (currentPosition.y < input.length - 1) {
        if (currentPosition.xDir == 1 || currentPosition.xDir == -1) {
            let newPosition = { x: currentPosition.x, y: currentPosition.y + 1, xDir: 0, yDir: 1, singleDirection: 1, heatLoss: currentPosition.heatLoss + input[currentPosition.y + 1][currentPosition.x], rank: getRank(currentPosition.x, currentPosition.y + 1, currentPosition.heatLoss + input[currentPosition.y + 1][currentPosition.x]), visited: [...currentPosition.visited, { x: currentPosition.x, y: currentPosition.y, singleDirection: currentPosition.singleDirection }] };
            checkForDestination(newPosition);
            if (!visitedPositions.has(getStringFromPosition(newPosition))) {
                if (newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            } else {
                let dataOfOld = visitedPositions.get(getStringFromPosition(newPosition)).split('_').map(x => parseInt(x));
                if ((newPosition.heatLoss < dataOfOld[1] || newPosition.singleDirection < dataOfOld[0]) && newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            }
        } else if (currentPosition.yDir == 1 && currentPosition.singleDirection < 3) {
            let newPosition = { x: currentPosition.x, y: currentPosition.y + 1, xDir: 0, yDir: 1, singleDirection: currentPosition.singleDirection + 1, heatLoss: currentPosition.heatLoss + input[currentPosition.y + 1][currentPosition.x], rank: getRank(currentPosition.x, currentPosition.y + 1, currentPosition.heatLoss + input[currentPosition.y + 1][currentPosition.x]), visited: [...currentPosition.visited, { x: currentPosition.x, y: currentPosition.y, singleDirection: currentPosition.singleDirection }] };
            checkForDestination(newPosition);
            if (!visitedPositions.has(getStringFromPosition(newPosition))) {
                if (newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            } else {
                let dataOfOld = visitedPositions.get(getStringFromPosition(newPosition)).split('_').map(x => parseInt(x));
                if ((newPosition.heatLoss < dataOfOld[1] || newPosition.singleDirection < dataOfOld[0]) && newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            }
        }
    }

    if (currentPosition.x > 0) {
        if (currentPosition.yDir == 1 || currentPosition.yDir == -1) {
            let newPosition = { x: currentPosition.x - 1, y: currentPosition.y, xDir: -1, yDir: 0, singleDirection: 1, heatLoss: currentPosition.heatLoss + input[currentPosition.y][currentPosition.x - 1], rank: getRank(currentPosition.x - 1, currentPosition.y, currentPosition.heatLoss + input[currentPosition.y][currentPosition.x - 1]), visited: [...currentPosition.visited, { x: currentPosition.x, y: currentPosition.y, singleDirection: currentPosition.singleDirection }] };
            checkForDestination(newPosition);
            if (!visitedPositions.has(getStringFromPosition(newPosition))) {
                if (newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            } else {
                let dataOfOld = visitedPositions.get(getStringFromPosition(newPosition)).split('_').map(x => parseInt(x));
                if ((newPosition.heatLoss < dataOfOld[1] || newPosition.singleDirection < dataOfOld[0]) && newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            }
        } else if (currentPosition.xDir == -1 && currentPosition.singleDirection < 3) {
            let newPosition = { x: currentPosition.x - 1, y: currentPosition.y, xDir: -1, yDir: 0, singleDirection: currentPosition.singleDirection + 1, heatLoss: currentPosition.heatLoss + input[currentPosition.y][currentPosition.x - 1], rank: getRank(currentPosition.x - 1, currentPosition.y, currentPosition.heatLoss + input[currentPosition.y][currentPosition.x - 1]), visited: [...currentPosition.visited, { x: currentPosition.x, y: currentPosition.y, singleDirection: currentPosition.singleDirection }] };
            checkForDestination(newPosition);
            if (!visitedPositions.has(getStringFromPosition(newPosition))) {
                if (newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            } else {
                let dataOfOld = visitedPositions.get(getStringFromPosition(newPosition)).split('_').map(x => parseInt(x));
                if ((newPosition.heatLoss < dataOfOld[1] || newPosition.singleDirection < dataOfOld[0]) && newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            }
        }
    }

    if (currentPosition.x < input[0].length - 1) {
        if (currentPosition.yDir == 1 || currentPosition.yDir == -1) {
            let newPosition = { x: currentPosition.x + 1, y: currentPosition.y, xDir: 1, yDir: 0, singleDirection: 1, heatLoss: currentPosition.heatLoss + input[currentPosition.y][currentPosition.x + 1], rank: getRank(currentPosition.x + 1, currentPosition.y, currentPosition.heatLoss + input[currentPosition.y][currentPosition.x + 1]), visited: [...currentPosition.visited, { x: currentPosition.x, y: currentPosition.y, singleDirection: currentPosition.singleDirection }] };
            checkForDestination(newPosition);
            if (!visitedPositions.has(getStringFromPosition(newPosition))) {
                if (newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            } else {
                let dataOfOld = visitedPositions.get(getStringFromPosition(newPosition)).split('_').map(x => parseInt(x));
                if ((newPosition.heatLoss < dataOfOld[1] || newPosition.singleDirection < dataOfOld[0]) && newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            }
        } else if (currentPosition.xDir == 1 && currentPosition.singleDirection < 3) {
            let newPosition = { x: currentPosition.x + 1, y: currentPosition.y, xDir: 1, yDir: 0, singleDirection: currentPosition.singleDirection + 1, heatLoss: currentPosition.heatLoss + input[currentPosition.y][currentPosition.x + 1], rank: getRank(currentPosition.x + 1, currentPosition.y, currentPosition.heatLoss + input[currentPosition.y][currentPosition.x + 1]), visited: [...currentPosition.visited, { x: currentPosition.x, y: currentPosition.y, singleDirection: currentPosition.singleDirection }] };
            checkForDestination(newPosition);
            if (!visitedPositions.has(getStringFromPosition(newPosition))) {
                if (newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            } else {
                let dataOfOld = visitedPositions.get(getStringFromPosition(newPosition)).split('_').map(x => parseInt(x));
                if ((newPosition.heatLoss < dataOfOld[1] || newPosition.singleDirection < dataOfOld[0]) && newPosition.heatLoss < currentTotalMinHeat) {
                    positionsToCheck.push(newPosition);
                    visitedPositions.set(getStringFromPosition(newPosition), newPosition.singleDirection.toString() + '_' + newPosition.heatLoss.toString());
                }
            }
        }
    }
}

console.log(currentTotalMinHeat);

function getRank(x: number, y: number, heatLoss: number): number {
    return heatLoss + manhattanDistance(x, y);
}

function sort(a: Position, b: Position): number {
    if (a.rank < b.rank) {
        return -1;
    } else if (a.rank > b.rank) {
        return 1;
    }

    return 0;
}

function manhattanDistance(x: number, y: number): number {
    return Math.abs(x - input[0].length - 1) + Math.abs(y - input.length - 1);
}

function checkForDestination(pos: Position) {
    if (pos.x == input[0].length - 1 && pos.y == input.length - 1) {
        if (currentTotalMinHeat > pos.heatLoss) {
            currentTotalMinHeat = pos.heatLoss;
        }
    }
}

function getStringFromPosition(pos: Position): string {
    return pos.x.toString() + '_' + pos.y.toString() + '_' + pos.xDir.toString() + '_' + pos.yDir.toString();
}

console.timeEnd('Time');