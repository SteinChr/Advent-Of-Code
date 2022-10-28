import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let instructions: string[][] = new Array(input.length);
for (let i = 0; i < input.length; i++) {
    instructions[i] = [input[i].split(' ')[1], input[i].split(' ')[7]];
}
const numberOfLetters = 26;
const extraSeconds = 60;
const workers = 5;
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].slice(0, numberOfLetters);
let workersTask: string[] = new Array(workers).fill('.');
let workersCount: number[] = new Array(workers).fill(0);
let repeat = true;
let tasksCompleted: string = '';

for (let x = 0; repeat; x++) {
    for (let i = 0; i < workersCount.length; i++) {
        if (workersCount[i] != -1) workersCount[i]--;
    }
    while (workersCount.includes(0)) {
        let workerIndex = workersCount.indexOf(0);
        tasksCompleted += workersTask[workerIndex];
        instructions = getNewInstructions(instructions, workersTask[workerIndex]);
        workersCount[workerIndex] = -1;
        workersTask[workerIndex] = '.';
    }

    let nextLetter = getNextInstrucction();
    let workerIndex = workersTask.indexOf('.');
    while (nextLetter != null && workerIndex != -1) {
        if (workerIndex != -1) {
            workersTask[workerIndex] = nextLetter;
            workersCount[workerIndex] = getDuration(nextLetter);
        }
        nextLetter = getNextInstrucction();
        workerIndex = workersTask.indexOf('.');
    }
    if (instructions.length == 0) {
        repeat = false;
        for (let i = 0; i < workersCount.length; i++) {
            if (workersCount[i] != -1) {
                repeat = true;
                break;
            }
        }
    }
    if (!repeat) console.log(x);
}

function getNextInstrucction(): string | null {
    for (let l = 0; l < letters.length; l++) {
        let possible = false;
        if (!tasksCompleted.split('').includes(letters[l])) {
            possible = true;
            for (let i = 0; i < instructions.length; i++) {
                if (instructions[i][1] == letters[l]) {
                    possible = false;
                    break;
                }
            }
        }
        if (possible && !workersTask.includes(letters[l])) return letters[l];
    }
    return null;
}

function getDuration(letter: string): number {
    return letters.indexOf(letter) + 1 + extraSeconds;
}

function getNewInstructions(instructions: string[][], letter: string): string[][] {
    let newInstructions = instructions.slice();
    for (let i = instructions.length - 1; i >= 0; i--) {
        if (instructions[i][0] == letter) {
            newInstructions.splice(i, 1);
        }
    }
    return newInstructions.slice();
}

console.timeEnd('Time');