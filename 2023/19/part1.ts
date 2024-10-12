import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n'));
let result = 0;

class Workflow {
    conditions: Condition[];
    destinationWithoutCondition: string;
    state: string;
}

class Condition {
    part: number;
    operationSymbol: string;
    numberToCompare: number;
    destinationWorkflow: string;
}

let workflows = new Map<string, Workflow>();

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
    
    workflows.set(currentName, { conditions: currentConditions, destinationWithoutCondition: currentDestinationWithoutCondition, state: 'processing' });
}

let partRankings: number[][] = [];
for (let i = 0; i < input[1].length; i++) {
    let currentPart = input[1][i].split(/{x=|,m=|,a=|,s=|}/).filter(x => x != '').map(x => parseInt(x));
    partRankings.push(currentPart);
}

for (let i = 0; i < partRankings.length; i++) {
    let currentWorkflow = workflows.get('in');
    while (currentWorkflow.state != 'R' && currentWorkflow.state != 'A') {
        let newWorkflowFound = false;

        for (let c = 0; c < currentWorkflow.conditions.length; c++) {
            if (eval(`partRankings[i][currentWorkflow.conditions[c].part] ${currentWorkflow.conditions[c].operationSymbol} currentWorkflow.conditions[c].numberToCompare`)) {
                let newWorkflow = currentWorkflow.conditions[c].destinationWorkflow;
                if (newWorkflow == 'R' || newWorkflow == 'A') {
                    currentWorkflow.state = newWorkflow;
                    newWorkflowFound = true;
                } else {
                    currentWorkflow = workflows.get(newWorkflow);
                    currentWorkflow.state = 'processing';
                    newWorkflowFound = true;
                }
                break;
            }
        }

        if (!newWorkflowFound) {
            let newWorkflow = currentWorkflow.destinationWithoutCondition;
            if (newWorkflow == 'R' || newWorkflow == 'A') {
                currentWorkflow.state = newWorkflow;
            } else {
                currentWorkflow = workflows.get(currentWorkflow.destinationWithoutCondition);
                currentWorkflow.state = 'processing';
            }
        }
    }

    if (currentWorkflow.state == 'A') {
        for (let l = 0; l < 4; l++) {
            result += partRankings[i][l];
        }
    }
}

console.log(result);
console.timeEnd('Time');