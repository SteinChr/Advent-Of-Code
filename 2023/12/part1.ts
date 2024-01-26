import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(' '));
let result = 0;

class Possibility {
    grid: string[];
    groupNumbers: number[];
    gridIndex: number;
    groupIndex: number;
    counter: number;
}

for (let i = 0; i < input.length; i++) {
    let possibilities: Possibility[] = [{ grid: input[i][0].split(''), groupNumbers: input[i][1].split(',').map(x => parseInt(x)), gridIndex: 0, groupIndex: 0, counter: 1 }];

    for (let p = 0; possibilities.length != 0; p++) {
        let currentPossibility = possibilities.shift();

        if (checkIfDone(currentPossibility)) {
            result += currentPossibility.counter;
        }

        for (let s = currentPossibility.gridIndex; s < currentPossibility.grid.length; s++) {
            if (currentPossibility.grid[s] != '.' && (s == 0 || currentPossibility.grid[s - 1] == '.' || currentPossibility.grid[s - 1] == '?')) {
                let success: boolean = true;

                for (let g = s + 1; g < s + currentPossibility.groupNumbers[currentPossibility.groupIndex]; g++) {
                    if (currentPossibility.grid[g] == '.') {
                        success = false;
                        break;
                    }
                }

                if (success && (s + currentPossibility.groupNumbers[currentPossibility.groupIndex] == currentPossibility.grid.length || '.?'.includes(currentPossibility.grid[s + currentPossibility.groupNumbers[currentPossibility.groupIndex]])) && checkIfEnoughSpace(currentPossibility)) {
                    let newGrid = currentPossibility.grid.slice();

                    for (let g = s; g < s + currentPossibility.groupNumbers[currentPossibility.groupIndex]; g++) {
                        newGrid[g] = '#';
                    }

                    if (s - 1 >= 0) {
                        newGrid[s - 1] = '.';
                    }
                    if (s + currentPossibility.groupNumbers[currentPossibility.groupIndex] < currentPossibility.grid.length) {
                        newGrid[s + currentPossibility.groupNumbers[currentPossibility.groupIndex]] = '.';
                    }

                    let existingPossibilty = possibilities.find(x => x.gridIndex == s + currentPossibility.groupNumbers[currentPossibility.groupIndex] + 1 && x.groupIndex == currentPossibility.groupIndex + 1);

                    if (existingPossibilty) {
                        existingPossibilty.counter += currentPossibility.counter;
                    } else {
                        possibilities.push({ grid: newGrid, groupNumbers: currentPossibility.groupNumbers.slice(), gridIndex: s + currentPossibility.groupNumbers[currentPossibility.groupIndex] + 1, groupIndex: currentPossibility.groupIndex + 1, counter: currentPossibility.counter });
                    }
                }

                if (currentPossibility.grid[s] == '#') break;
            }
        }
    }
}

function checkIfDone(possibility: Possibility): boolean {
    if (possibility.groupIndex < possibility.groupNumbers.length) return false;

    for (let i = possibility.gridIndex; i < possibility.grid.length; i++) {
        if (possibility.grid[i] == '#') return false;

    }
    
    return true;
}

function checkIfEnoughSpace(possibility: Possibility): boolean {
    let spaceLeft: number = possibility.grid.length - possibility.gridIndex;
    let spaceNeeded: number = -1;

    for (let i = possibility.groupIndex; i < possibility.groupNumbers.length; i++) {
        spaceNeeded += possibility.groupNumbers[i];
        spaceNeeded++;
    }

    if (spaceNeeded <= spaceLeft) return true;
    return false;
}

console.log(result);
console.timeEnd('Time');