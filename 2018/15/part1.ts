import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));

class Unit {
    group: string;
    x: number;
    y: number;
    attackPower: number;
    hitPoints: number;
}
class Coords {
    x: number;
    y: number;
    manhattanDistance: number;
}
class Node {
    x: number;
    y: number;
    distanceTravelled: number;
    rankingDistance: number;
    previousNodes: { x: number, y: number }[];
}
class Path {
    distance: number;
    startingDirection: string;
    rankingDistance: number;
    target: { x: number, y: number };
}

let units: Unit[] = [];
for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] == 'G' || input[y][x] == 'E') units.push({ group: input[y][x], x: x, y: y, attackPower: 3, hitPoints: 200 });
    }
}

let winningPaths: Path[] = [];
let nodesToCheck: Node[] = [];
let handledNodes: Node[] = [];
let removeDeadUnitNecessary: boolean = false;
let gameOverNumberOfRounds: number = -1;
let result = 0;

units.sort(compare);

for (let i = 0; gameOverNumberOfRounds == -1; i++) {
    for (let u = 0; u < units.length; u++) {
        if (checkIfCombatIsOver()) {
            gameOverNumberOfRounds = i;
            break;
        }
        if (units[u].x >= 0) {
            if (checkIfTargetInRange(u) == false) {
                move(u);
            }
            if (checkIfTargetInRange(u) == true) {
                attack(u);
            }
        }
    }
    if (gameOverNumberOfRounds != -1) break;
    if (removeDeadUnitNecessary) {
        removeDeadUnitNecessary = false;
        removeDeadUnits();
    }

    units.sort(compare);
}
removeDeadUnits();

result = calculateResult();
console.log(result);

function calculateResult(): number {
    let result = 0;
    for (let i = 0; i < units.length; i++) {
        result += units[i].hitPoints;
    }
    result *= gameOverNumberOfRounds;
    return result;
}

function checkIfCombatIsOver(): boolean {
    let gFound: boolean = false;
    let eFound: boolean = false;
    for (let i = 0; i < units.length; i++) {
        if (units[i].group == 'E') eFound = true;
        if (units[i].group == 'G') gFound = true;
        if (eFound && gFound) return false;
    }
    return true;
}

function removeDeadUnits() {
    for (let i = units.length - 1; i >= 0; i--) {
        if (units[i].hitPoints <= 0) {
            units.splice(i, 1);
        }
    }
}

function attack(attacker: number) {
    let target: number = getTargetForAttack(attacker);
    units[target].hitPoints -= units[attacker].attackPower;

    // mark dead units
    if (units[target].hitPoints <= 0) {
        input[units[target].y][units[target].x] = '.';
        units[target].x = -1;
        units[target].y = -1;
        units[target].group = '';
        removeDeadUnitNecessary = true;
    }
}

function getTargetForAttack(index: number): number {
    let target: string = 'G';
    if (units[index].group == 'G') target = 'E';
    let hitPoints: number = Number.MAX_VALUE;
    let indexOfTarget: number = 0;
    if (input[units[index].y + 1][units[index].x] == target) {
        let indexOfPossibleTarget = getIndexOfUnitWithCoords(units[index].x, units[index].y + 1);
        if (units[indexOfPossibleTarget].hitPoints <= hitPoints) {
            hitPoints = units[indexOfPossibleTarget].hitPoints;
            indexOfTarget = indexOfPossibleTarget;
        }
    }
    if (input[units[index].y][units[index].x + 1] == target) {
        let indexOfPossibleTarget = getIndexOfUnitWithCoords(units[index].x + 1, units[index].y);
        if (units[indexOfPossibleTarget].hitPoints <= hitPoints) {
            hitPoints = units[indexOfPossibleTarget].hitPoints;
            indexOfTarget = indexOfPossibleTarget;
        }
    }
    if (input[units[index].y][units[index].x - 1] == target) {
        let indexOfPossibleTarget = getIndexOfUnitWithCoords(units[index].x - 1, units[index].y);
        if (units[indexOfPossibleTarget].hitPoints <= hitPoints) {
            hitPoints = units[indexOfPossibleTarget].hitPoints;
            indexOfTarget = indexOfPossibleTarget;
        }
    }
    if (input[units[index].y - 1][units[index].x] == target) {
        let indexOfPossibleTarget = getIndexOfUnitWithCoords(units[index].x, units[index].y - 1);
        if (units[indexOfPossibleTarget].hitPoints <= hitPoints) {
            hitPoints = units[indexOfPossibleTarget].hitPoints;
            indexOfTarget = indexOfPossibleTarget;
        }
    }
    return indexOfTarget;
}

function getIndexOfUnitWithCoords(x: number, y: number): number {
    for (let i = 0; i < units.length; i++) {
        if (units[i].x == x && units[i].y == y) return i;
    }
    return -1;
}

function move(index: number) {
    let nextStep: string = getNextStep(index);

    if (nextStep == 'up' || nextStep == 'left' || nextStep == 'right' || nextStep == 'down') input[units[index].y][units[index].x] = '.';
    if (nextStep == 'up') {
        input[units[index].y - 1][units[index].x] = units[index].group;
        units[index].y--;
    } else if (nextStep == 'left') {
        input[units[index].y][units[index].x - 1] = units[index].group;
        units[index].x--;
    } else if (nextStep == 'right') {
        input[units[index].y][units[index].x + 1] = units[index].group;
        units[index].x++;
    } else if (nextStep == 'down') {
        input[units[index].y + 1][units[index].x] = units[index].group;
        units[index].y++;
    }
}

function checkIfTargetInRange(index: number): boolean {
    let target: string = 'G';
    if (units[index].group == 'G') target = 'E';
    if (input[units[index].y][units[index].x + 1] != target &&
        input[units[index].y][units[index].x - 1] != target &&
        input[units[index].y + 1][units[index].x] != target &&
        input[units[index].y - 1][units[index].x] != target) return false;
    return true;
}

function getNextStep(start: number): string {
    let possibleTargets = getPossibleTargets(start);
    let possibleDirections: Path[] = [];
    let bestDistance: number = Number.MAX_VALUE;

    possibleTargets.sort((a, b) => a.manhattanDistance > b.manhattanDistance ? 1 : -1);

    for (let i = 0; i < possibleTargets.length; i++) {
        if (possibleTargets[i].manhattanDistance <= bestDistance) {
            let currentPath = astar(units[start].x, units[start].y, possibleTargets[i].x, possibleTargets[i].y);
            if (!possibleDirections.some(x => x.distance == currentPath.distance && x.rankingDistance == currentPath.rankingDistance && x.startingDirection == currentPath.startingDirection)) {
                if (possibleDirections.every(x => x.distance > currentPath.distance)) {
                    possibleDirections = [];
                }
                if (possibleDirections.every(x => x.distance == currentPath.distance) && currentPath.distance <= bestDistance) {
                    possibleDirections.push(currentPath);
                    bestDistance = currentPath.distance;
                }
            }
        }
    }

    possibleDirections.sort((a, b) => a.target.y > b. target.y ? 1 : (a.target.y < b.target.y ? -1 : (a.target.x > b.target.x ? 1 : (a.target.x < b.target.x ? -1 : 0))));
    possibleDirections = possibleDirections.filter(pd => pd.target.x == possibleDirections[0].target.x && pd.target.y == possibleDirections[0].target.y);

    if (possibleDirections.some(x => x.startingDirection == 'up')) return 'up';
    if (possibleDirections.some(x => x.startingDirection == 'left')) return 'left';
    if (possibleDirections.some(x => x.startingDirection == 'right')) return 'right';
    if (possibleDirections.some(x => x.startingDirection == 'down')) return 'down';
    return '';
}

function getBestDistance(distances: Path[]): number {
    if (distances.length > 0) {
        distances.sort((a, b) => a.distance - b.distance);
        if (distances.length == 1) return 0;
        if (distances[0].distance != distances[1].distance) return 0;
        let possibleDistances: { distance: number, startingDirection: string }[] = [];
        for (let i = 0; i < distances.length; i++) {
            if (distances[i].distance == distances[0].distance) possibleDistances.push(distances[i]);
        }
        for (let l = 0; l < possibleDistances.length; l++) {
            if (possibleDistances[l].startingDirection == 'up') return l;
        }
        for (let l = 0; l < possibleDistances.length; l++) {
            if (possibleDistances[l].startingDirection == 'left') return l;
        }
        for (let l = 0; l < possibleDistances.length; l++) {
            if (possibleDistances[l].startingDirection == 'right') return l;
        }
        for (let l = 0; l < possibleDistances.length; l++) {
            if (possibleDistances[l].startingDirection == 'down') return l;
        }
    }
    return -1;
}

function getPossibleTargets(start: number): Coords[] {
    let possibleTargets: Coords[] = [];

    for (let i = 0; i < units.length; i++) {
        if (units[i].group != units[start].group && units[i].x >= 0) {
            if (input[units[i].y][units[i].x + 1] == '.') {
                possibleTargets.push({ x: units[i].x + 1, y: units[i].y, manhattanDistance: getManhattenDistance(units[start].x, units[start].y, units[i].x + 1, units[i].y) });
            }
            if (input[units[i].y][units[i].x - 1] == '.') {
                possibleTargets.push({ x: units[i].x - 1, y: units[i].y, manhattanDistance: getManhattenDistance(units[start].x, units[start].y, units[i].x - 1, units[i].y) });
            }
            if (input[units[i].y + 1][units[i].x] == '.') {
                possibleTargets.push({ x: units[i].x, y: units[i].y + 1, manhattanDistance: getManhattenDistance(units[start].x, units[start].y, units[i].x, units[i].y + 1) });
            }
            if (input[units[i].y - 1][units[i].x] == '.') {
                possibleTargets.push({ x: units[i].x, y: units[i].y - 1, manhattanDistance: getManhattenDistance(units[start].x, units[start].y, units[i].x, units[i].y - 1) });
            }
        }
    }
    return possibleTargets;
}

function astar(startX: number, startY: number, destinationX: number, destinationY: number): Path {
    handledNodes = [];
    nodesToCheck = [{ x: startX, y: startY, distanceTravelled: 0, rankingDistance: getManhattenDistance(startX, startY, destinationX, destinationY), previousNodes: [] }];
    let possibleStartingDirections: string[] = [];
    let bestDistance: number = Number.MAX_VALUE;
    winningPaths = [];
    for (let i = 0; nodesToCheck.length > 0; i++) {
        let currentNode: Node | undefined = nodesToCheck.shift();
        if (currentNode) {
            if (currentNode.distanceTravelled <= bestDistance) {
                if (currentNode.previousNodes.length < 2 || !possibleStartingDirections.includes(getDirection(startX, startY, currentNode.previousNodes[1].x, currentNode.previousNodes[1].y))) {
                    if (currentNode.x == destinationX && currentNode.y == destinationY) {
                        let currentDirection: string;
                        if (currentNode.previousNodes.length < 2) {
                            currentDirection = getDirection(startX, startY, currentNode.x, currentNode.y);
                        } else {
                            currentDirection = getDirection(startX, startY, currentNode.previousNodes[1].x, currentNode.previousNodes[1].y);
                        }
                        possibleStartingDirections.push(currentDirection);
                        if (winningPaths.length > 0) {
                            if (currentNode.distanceTravelled < winningPaths[0].distance) {
                                winningPaths = [{ distance: currentNode.distanceTravelled, startingDirection: currentDirection, rankingDistance: currentNode.rankingDistance, target: { x: destinationX, y: destinationY } }];
                                bestDistance = currentNode.distanceTravelled;
                            }
                            if (currentNode.distanceTravelled == winningPaths[0].distance) {
                                winningPaths.push({ distance: currentNode.distanceTravelled, startingDirection: currentDirection, rankingDistance: currentNode.rankingDistance, target: { x: destinationX, y: destinationY } });
                                bestDistance = currentNode.distanceTravelled;
                            }
                        } else {
                            winningPaths.push({ distance: currentNode.distanceTravelled, startingDirection: currentDirection, rankingDistance: currentNode.rankingDistance, target: { x: destinationX, y: destinationY } });
                            bestDistance = currentNode.distanceTravelled;
                        }
                    } else if (winningPaths.length == 0 || currentNode.rankingDistance <= winningPaths[0].rankingDistance) {
                        if (input[currentNode.y][currentNode.x + 1] == '.') {
                            let newNode = { x: currentNode.x + 1, y: currentNode.y, distanceTravelled: currentNode.distanceTravelled + 1, rankingDistance: currentNode.distanceTravelled + 1 + getManhattenDistance(currentNode.x + 1, currentNode.y, destinationX, destinationY), previousNodes: [...currentNode.previousNodes, { x: currentNode.x, y: currentNode.y }] };
                            if (!checkIfNodeAlreadyExists(newNode, destinationX, destinationY)) {
                                nodesToCheck.push(newNode);
                            }
                        }
                        if (input[currentNode.y][currentNode.x - 1] == '.') {
                            let newNode = { x: currentNode.x - 1, y: currentNode.y, distanceTravelled: currentNode.distanceTravelled + 1, rankingDistance: currentNode.distanceTravelled + 1 + getManhattenDistance(currentNode.x - 1, currentNode.y, destinationX, destinationY), previousNodes: [...currentNode.previousNodes, { x: currentNode.x, y: currentNode.y }] };
                            if (!checkIfNodeAlreadyExists(newNode, destinationX, destinationY)) {
                                nodesToCheck.push(newNode);
                            }
                        }
                        if (input[currentNode.y + 1][currentNode.x] == '.') {
                            let newNode = { x: currentNode.x, y: currentNode.y + 1, distanceTravelled: currentNode.distanceTravelled + 1, rankingDistance: currentNode.distanceTravelled + 1 + getManhattenDistance(currentNode.x, currentNode.y + 1, destinationX, destinationY), previousNodes: [...currentNode.previousNodes, { x: currentNode.x, y: currentNode.y }] };
                            if (!checkIfNodeAlreadyExists(newNode, destinationX, destinationY)) {
                                nodesToCheck.push(newNode);
                            }
                        }
                        if (input[currentNode.y - 1][currentNode.x] == '.') {
                            let newNode = { x: currentNode.x, y: currentNode.y - 1, distanceTravelled: currentNode.distanceTravelled + 1, rankingDistance: currentNode.distanceTravelled + 1 + getManhattenDistance(currentNode.x, currentNode.y - 1, destinationX, destinationY), previousNodes: [...currentNode.previousNodes, { x: currentNode.x, y: currentNode.y }] };
                            if (!checkIfNodeAlreadyExists(newNode, destinationX, destinationY)) {
                                nodesToCheck.push(newNode);
                            }
                        }
                    }
                }
            }
        }
    }
    let finalPathIndex = getBestDistance(winningPaths);
    if (finalPathIndex == -1) return { distance: Number.MAX_VALUE, startingDirection: '', rankingDistance: Number.MAX_VALUE, target: { x: destinationX, y: destinationY } };
    return winningPaths[finalPathIndex];
}

function getDirection(startX: number, startY: number, firstStepX: number, firstStepY: number): string {
    if (startX + 1 == firstStepX && startY == firstStepY) return 'right';
    if (startX - 1 == firstStepX && startY == firstStepY) return 'left';
    if (startX == firstStepX && startY + 1 == firstStepY) return 'down';
    if (startX == firstStepX && startY - 1 == firstStepY) return 'up';
    return 'error';
}

function checkIfNodeAlreadyExists(node: Node, destinationX: number, destinationY: number): boolean {
    if (handledNodes.some(x => x.x == node.x && x.y == node.y && x.distanceTravelled < node.distanceTravelled)) return true;
    if (node.x == destinationX && node.y == destinationY) return false;
    if (node.previousNodes.some(x => x.x == node.x && x.y == node.y)) return true;
    for (let i = 0; i < nodesToCheck.length; i++) {
        if (nodesToCheck[i].x == node.x && nodesToCheck[i].y == node.y) {
            if (nodesToCheck[i].rankingDistance < node.rankingDistance) return true;
            if (nodesToCheck[i].rankingDistance > node.rankingDistance) {
                handledNodes.push(...nodesToCheck.splice(i, 1));
                return false;
            }
            let oldFirstDirection: string = getDirection(nodesToCheck[i].previousNodes[0].x, nodesToCheck[i].previousNodes[0].y, nodesToCheck[i].previousNodes[1].x, nodesToCheck[i].previousNodes[0].y);
            let newFirstDirection: string = getDirection(node.previousNodes[0].x, node.previousNodes[0].y, node.previousNodes[1].x, node.previousNodes[1].y);
            if (rankDirections(oldFirstDirection, newFirstDirection)) return true;
            handledNodes.push(...nodesToCheck.splice(i, 1));
            return false;
        }
    }
    return false;
}

function rankDirections(dir1: string, dir2: string): boolean { //dir 1 == true; dir 2 == false
    if (dir1 == dir2) return true;
    if (dir1 == 'up') return true;
    if (dir2 == 'up') return false;
    if (dir1 == 'left') return true;
    if (dir2 == 'left') return false;
    if (dir1 == 'right') return true;
    if (dir2 == 'right') return false;
    if (dir1 == 'down') return true;
    if (dir2 == 'down') return false;
    return true;
}

function getManhattenDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function compare(a, b): number {
    if (a.y != b.y) {
        if (a.y < b.y) {
            return -1;
        } else if (a.y > b.y) {
            return 1;
        }
    } else {
        if (a.x < b.x) {
            return -1;
        } else if (a.x > b.x) {
            return 1;
        }
    }
    return 0;
}

console.timeEnd('Time');