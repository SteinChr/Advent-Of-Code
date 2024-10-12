import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n'));
let result = 0;

class Workflow {
    conditions: Condition[];
    destinationWithoutCondition: string;
}

class Condition {
    part: number;
    operationSymbol: string;
    numberToCompare: number;
    destinationWorkflow: string;
}

class Combination {
    ranges: number[][];
    workflow: string;
}

let workflows = new Map<string, Workflow>();
let combinations: Combination[] = [{ ranges: [[1, 4000], [1, 4000], [1, 4000], [1, 4000]], workflow: 'in' }];

for (let i = 0; i < input[0].length; i++) {
    let currentWorkflow = input[0][i].split(/{|:|,|}/).filter(x => x != '');
    let currentName = currentWorkflow.shift();
    let currentDestinationWithoutCondition = currentWorkflow.pop();
    let currentConditions: Condition[] = [];

    for (let l = 0; l < currentWorkflow.length; l += 2) {
        let currentPart = 0;
        if (currentWorkflow[l].slice(0, 1) == 'm') currentPart = 1;
        if (currentWorkflow[l].slice(0, 1) == 'a') currentPart = 2;
        if (currentWorkflow[l].slice(0, 1) == 's') currentPart = 3;

        currentConditions.push({ part: currentPart, operationSymbol: currentWorkflow[l].slice(1, 2), numberToCompare: parseInt(currentWorkflow[l].slice(2)), destinationWorkflow: currentWorkflow[l + 1] });
    }

    workflows.set(currentName, { conditions: currentConditions, destinationWithoutCondition: currentDestinationWithoutCondition });
}

while (combinations.length != 0) {
    let currentCombination = combinations.shift();

    if (currentCombination.workflow == 'A') {
        let possibleCombinations: number = 1;

        for (let i = 0; i < currentCombination.ranges.length; i++) {
            possibleCombinations *= currentCombination.ranges[i][1] - currentCombination.ranges[i][0] + 1;
        }

        result += possibleCombinations;
    } else if (currentCombination.workflow != 'R') {
        let currentWorkflow = workflows.get(currentCombination.workflow);
        let newCombination: Combination = { ranges: [[...currentCombination.ranges[0]], [...currentCombination.ranges[1]], [...currentCombination.ranges[2]], [...currentCombination.ranges[3]]], workflow: '' };

        for (let c = 0; c < currentWorkflow.conditions.length; c++) {
            let currentPart: number[] = newCombination.ranges[currentWorkflow.conditions[c].part].slice();

            if (currentWorkflow.conditions[c].operationSymbol == '>') {
                if (newCombination.ranges[currentWorkflow.conditions[c].part][0] < currentWorkflow.conditions[c].numberToCompare + 1) {
                    newCombination.ranges[currentWorkflow.conditions[c].part][0] = currentWorkflow.conditions[c].numberToCompare + 1;
                }
            } else {
                if (newCombination.ranges[currentWorkflow.conditions[c].part][1] > currentWorkflow.conditions[c].numberToCompare - 1) {
                    newCombination.ranges[currentWorkflow.conditions[c].part][1] = currentWorkflow.conditions[c].numberToCompare - 1;
                }
            }

            newCombination.workflow = currentWorkflow.conditions[c].destinationWorkflow;
            if (newCombination.ranges[currentWorkflow.conditions[c].part][0] <= newCombination.ranges[currentWorkflow.conditions[c].part][1]) combinations.push({ ranges: [[...newCombination.ranges[0]], [...newCombination.ranges[1]], [...newCombination.ranges[2]], [...newCombination.ranges[3]]], workflow: newCombination.workflow });

            newCombination.ranges[currentWorkflow.conditions[c].part] = currentPart.slice();

            if (currentWorkflow.conditions[c].operationSymbol == '>') {
                if (newCombination.ranges[currentWorkflow.conditions[c].part][1] > currentWorkflow.conditions[c].numberToCompare) {
                    newCombination.ranges[currentWorkflow.conditions[c].part][1] = currentWorkflow.conditions[c].numberToCompare;
                }
            } else {
                if (newCombination.ranges[currentWorkflow.conditions[c].part][0] < currentWorkflow.conditions[c].numberToCompare) {
                    newCombination.ranges[currentWorkflow.conditions[c].part][0] = currentWorkflow.conditions[c].numberToCompare;
                }
            }

            if (c == currentWorkflow.conditions.length - 1 && newCombination.ranges[currentWorkflow.conditions[c].part][0] <= newCombination.ranges[currentWorkflow.conditions[c].part][1]) {
                combinations.push({ ranges: [[...newCombination.ranges[0]], [...newCombination.ranges[1]], [...newCombination.ranges[2]], [...newCombination.ranges[3]]], workflow: currentWorkflow.destinationWithoutCondition });
            }
        }
    }
}

console.log(result);
console.timeEnd('Time');