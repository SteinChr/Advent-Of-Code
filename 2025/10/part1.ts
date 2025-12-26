import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/\[|\]\s\(|\)\s{|}/).filter(y => y.length != 0));
let result = 0;

class Machine {
    lightIndicator: string;
    buttons: number[][];
    joltage: number[];
}

class Path {
    currentLights: string[];
    presses: number;
}

let machines: Machine[] = [];
for (let i = 0; i < input.length; i++) {
    machines.push({ lightIndicator: input[i][0], buttons: input[i][1].split(') (').map(x => x.split(',').map(y => parseInt(y))), joltage: input[i][2].split(',').map(x => parseInt(x)) });
}

for (let m = 0; m < machines.length; m++) {
    let paths: Path[] = [{ currentLights: new Array(machines[m].lightIndicator.length).fill('.'), presses: 0 }];

    pathLoop: while (paths.length != 0) {
        let currentPath = paths.shift();

        for (let b = 0; b < machines[m].buttons.length; b++) {
            let newLights: string[] = currentPath.currentLights.slice();

            for (let i = 0; i < machines[m].buttons[b].length; i++) {
                if (newLights[machines[m].buttons[b][i]] == '.') {
                    newLights[machines[m].buttons[b][i]] = '#';
                } else {
                    newLights[machines[m].buttons[b][i]] = '.';
                }
            }

            if (newLights.join('') == machines[m].lightIndicator) {
                result += currentPath.presses + 1;
                break pathLoop;
            } else {
                paths.push({ currentLights: newLights, presses: currentPath.presses + 1 });
            }
        }
    }
}

console.log(result);
console.timeEnd('Time');