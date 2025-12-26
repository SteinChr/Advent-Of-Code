import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/\[|\]\s\(|\)\s{|}/).filter(y => y.length != 0));
let result = 0;

class Machine {
    lightIndicator: string;
    buttons: number[][];
    joltage: number[];
}

let machines: Machine[] = [];
for (let i = 0; i < input.length; i++) {
    machines.push({ lightIndicator: input[i][0], buttons: input[i][1].split(') (').map(x => x.split(',').map(y => parseInt(y))), joltage: input[i][2].split(',').map(x => parseInt(x)) });
}

let cache = new Map<string, number>();

for (let m = 0; m < machines.length; m++) {
    result += calculate(m, machines[m].joltage);
}

function calculate(m: number, joltage: number[]): number {
    if (cache.has(m + '_' + joltage.join('-'))) return cache.get(m + '_' + joltage.join('-'));

    if (joltage.filter(x => x != 0).length == 0) {
        cache.set(m + '_' + joltage.join('-'), 0);
        return 0;
    }

    let wantedOutcome: string[] = [];

    for (let i = 0; i < joltage.length; i++) {
        if (joltage[i] % 2 == 0) {
            wantedOutcome.push('.');
        } else {
            wantedOutcome.push('#');
        }
    }

    let possibleCombinations: number[][] = [];

    for (let i = 0; i < Math.pow(2, machines[m].buttons.length); i++) {
        let currentTry = (i).toString(2).padStart(machines[m].buttons.length, '0').split('').map(x => parseInt(x));
        let currentState = new Array(joltage.length).fill('.');

        for (let l = 0; l < currentTry.length; l++) {
            if (currentTry[l] == 1) {
                for (let j = 0; j < machines[m].buttons[l].length; j++) {
                    if (currentState[machines[m].buttons[l][j]] == '#') {
                        currentState[machines[m].buttons[l][j]] = '.';
                    } else {
                        currentState[machines[m].buttons[l][j]] = '#';
                    }
                }
            }
        }

        if (currentState.join('') == wantedOutcome.join('')) {
            possibleCombinations.push(currentTry);
        }
    }

    let fewestPushes = Number.MAX_VALUE;

    for (let c = 0; c < possibleCombinations.length; c++) {
        let newJoltage: number[] = joltage.slice();

        for (let i = 0; i < possibleCombinations[c].length; i++) {
            if (possibleCombinations[c][i] == 1) {
                for (let b = 0; b < machines[m].buttons[i].length; b++) {
                    newJoltage[machines[m].buttons[i][b]]--;
                }
            }
        }

        if (newJoltage.filter(x => x % 2 != 0).length > 0 || newJoltage.filter(x => x < 0).length > 0) continue;

        for (let i = 0; i < newJoltage.length; i++) {
            newJoltage[i] /= 2;
        }

        let pushes = calculate(m, newJoltage);
        if (fewestPushes > 2 * pushes + possibleCombinations[c].filter(x => x == 1).length) fewestPushes = 2 * pushes + possibleCombinations[c].filter(x => x == 1).length;
    }

    cache.set(m + '_' + joltage.join('-'), fewestPushes);
    return fewestPushes;
}

console.log(result);
console.timeEnd('Time');