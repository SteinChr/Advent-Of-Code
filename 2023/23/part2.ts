import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(''));
let result = 0;

class Position {
    x: number;
    y: number;
}

class ToCheck {
    pos: Position;
    dir: Position;
    length: number;
}

let toCheck: ToCheck[] = [{ pos: { x: 1, y: 0 }, dir: { x: 0, y: 1 }, length: 0 }];
let nodes = new Map<string, string[]>;
let nodesFound = new Set<string>();

let destination: Position = { x: input[0].length - 2, y: input.length - 1 };

let directions: Position[] = [{ x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }];

let posCodes = new Map<string, string>();
let charsForCodes: string[] = '0123456789abcdefghijklmnopqrstuvwxyz!?§$%&'.split('');
let codeCounter = 0;

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] != '#') input[y][x] = '.';
    }
}

while (toCheck.length != 0) {
    let currentToCheck: ToCheck = toCheck.shift();

    if (!nodesFound.has(nodeToString(currentToCheck.pos, currentToCheck.dir))) {
        let startPos: Position = { x: currentToCheck.pos.x, y: currentToCheck.pos.y };
        let startDir: Position = { x: currentToCheck.dir.x, y: currentToCheck.dir.y };

        while (true) {
            currentToCheck.pos.x += currentToCheck.dir.x;
            currentToCheck.pos.y += currentToCheck.dir.y;
            currentToCheck.length++;

            let freeNeighbours: number = 0;

            if (currentToCheck.pos.x == destination.x && currentToCheck.pos.y == destination.y) {
                freeNeighbours = 10;
            } else {
                if (input[currentToCheck.pos.y - 1][currentToCheck.pos.x] == '.') freeNeighbours++;
                if (input[currentToCheck.pos.y + 1][currentToCheck.pos.x] == '.') freeNeighbours++;
                if (input[currentToCheck.pos.y][currentToCheck.pos.x - 1] == '.') freeNeighbours++;
                if (input[currentToCheck.pos.y][currentToCheck.pos.x + 1] == '.') freeNeighbours++;
            }

            if (freeNeighbours == 2) {
                if (input[currentToCheck.pos.y - 1][currentToCheck.pos.x] == '.' && currentToCheck.dir.y != 1) {
                    currentToCheck.dir.x = 0;
                    currentToCheck.dir.y = -1;
                } else if (input[currentToCheck.pos.y + 1][currentToCheck.pos.x] == '.' && currentToCheck.dir.y != -1) {
                    currentToCheck.dir.x = 0;
                    currentToCheck.dir.y = 1;
                } else if (input[currentToCheck.pos.y][currentToCheck.pos.x - 1] == '.' && currentToCheck.dir.x != 1) {
                    currentToCheck.dir.x = -1;
                    currentToCheck.dir.y = 0;
                } else if (input[currentToCheck.pos.y][currentToCheck.pos.x + 1] == '.' && currentToCheck.dir.x != -1) {
                    currentToCheck.dir.x = 1;
                    currentToCheck.dir.y = 0;
                }
            } else if (freeNeighbours > 2) {
                let startPosString = getStringFromPositions(startPos);
                let destinationPosString = getStringFromPositions(currentToCheck.pos);

                let startCode: string;
                let destinationCode: string;

                if (posCodes.has(startPosString)) {
                    startCode = posCodes.get(startPosString);
                } else {
                    startCode = charsForCodes[codeCounter];
                    posCodes.set(startPosString, startCode);
                    codeCounter++;
                }

                if (posCodes.has(destinationPosString)) {
                    destinationCode = posCodes.get(destinationPosString);
                } else {
                    destinationCode = charsForCodes[codeCounter];
                    posCodes.set(destinationPosString, destinationCode);
                    codeCounter++;
                }

                if (nodes.has(startCode)) {
                    let alreadyFoundPositions = nodes.get(startCode);
                    nodes.set(startCode, [...alreadyFoundPositions, destinationCode + '-' + currentToCheck.length.toString()]);
                } else {
                    nodes.set(startCode, [destinationCode + '-' + currentToCheck.length.toString()]);
                }

                if (nodes.has(destinationCode)) {
                    let alreadyFoundPositions = nodes.get(destinationCode);
                    nodes.set(destinationCode, [...alreadyFoundPositions, startCode + '-' + currentToCheck.length.toString()]);
                } else {
                    nodes.set(destinationCode, [startCode + '-' + currentToCheck.length.toString()]);
                }

                addNodeToSet(startPos, startDir, currentToCheck.pos, currentToCheck.dir);

                if (freeNeighbours != 10) {
                    for (let i = 0; i < directions.length; i++) {
                        if (input[currentToCheck.pos.y + directions[i].y][currentToCheck.pos.x + directions[i].x] == '.' && !nodesFound.has(nodeToString(currentToCheck.pos, directions[i]))) {
                            toCheck.push({ pos: { x: currentToCheck.pos.x, y: currentToCheck.pos.y }, dir: { x: directions[i].x, y: directions[i].y }, length: 0 });
                        }
                    }
                }

                break;
            }
        }
    }
}

let paths = new Map<number, string>();
paths.set(0, '0#0#0');

let setValue = 1;
let destinationCode: string = posCodes.get(getStringFromPositions(destination));

for (let getValue = 0; paths.size != 0; getValue++) {
    let [currentPos, currentLength, currentVisited] = paths.get(getValue).split('#');
    paths.delete(getValue);
    let possibleNewPositions: string[] = nodes.get(currentPos);

    for (let i = 0; i < possibleNewPositions.length; i++) {
        let [possibleNewPos, possibleNewLength] = possibleNewPositions[i].split('-');

        if (currentPos == destinationCode) {
            if (result < parseInt(currentLength)) result = parseInt(currentLength);
        }

        if (!currentVisited.includes(possibleNewPos)) {
            paths.set(setValue, possibleNewPos + '#' + (parseInt(currentLength) + parseInt(possibleNewLength)).toString() + '#' + currentVisited + possibleNewPos);
            setValue++;
        }
    }
}

console.log(result);

function addNodeToSet(startPos, startDir, destinationPos, destinationDir) {
    nodesFound.add(nodeToString(startPos, startDir));
    nodesFound.add(nodeToString(destinationPos, { x: destinationDir.x == 0 ? destinationDir.x : destinationDir.x * -1, y: destinationDir.y == 0 ? destinationDir.y : destinationDir.y * -1 }));
}

function nodeToString(pos: Position, dir: Position): string {
    return pos.x.toString() + '_' + pos.y.toString() + '_' + dir.x.toString() + '_' + dir.y.toString();
}

function getStringFromPositions(pos: Position): string {
    return pos.x.toString() + '_' + pos.y.toString();
}

console.timeEnd('Time');