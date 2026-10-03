import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/\)\s->\s|\s\(|\)/));
let result = 0;

class Program {
    originalWeight: number;
    totalWeight: number;
    discsAbove: string[];
    level: number;
}

let programs = new Map<string, Program>();

for (let i = 0; i < input.length; i++) {
    let programsAbove = input[i][2].split(/,\s/);
    programs.set(input[i][0], { originalWeight: parseInt(input[i][1]), totalWeight: parseInt(input[i][1]), discsAbove: programsAbove[0] == '' ? [] : programsAbove.slice(), level: 0 });
}

let names1 = [];
let names2 = [];
let bottomProgram = '';

for (let i = 0; i < input.length; i++) {
    names1.push(input[i][0]);

    let programsAbove = input[i][2].split(/,\s/);

    for (let l = 0; l < programsAbove.length && programsAbove[0] != ''; l++) {
        names2.push(programsAbove[l]);
    }
}

for (let i = 0; i < names1.length; i++) {
    if (!names2.includes(names1[i])) {
        bottomProgram = names1[i];
        break;
    }
}

let level = 1;
let nextLevel: string[] = [...programs.get(bottomProgram).discsAbove, '-'];

while (true) {
    let currentElement = nextLevel.shift();

    if (currentElement == '-') {
        if (nextLevel.length == 0) break;

        level++;
        nextLevel.push('-');
    } else {
        let oldProgram = programs.get(currentElement);
        nextLevel.push(...oldProgram.discsAbove);
        programs.set(currentElement, { originalWeight: oldProgram.originalWeight, totalWeight: oldProgram.totalWeight, discsAbove: oldProgram.discsAbove, level: level });
    }
}

for (let d = level; d >= 0; d--) {
    programs.forEach((value, key) => {
        if (value.level == d) {
            for (let i = 0; i < value.discsAbove.length; i++) {
                value.totalWeight += programs.get(value.discsAbove[i]).totalWeight;
            }
        }
    });
}

for (let d = level; d >= 0 && result == 0; d--) {
    programs.forEach((value, key) => {
        if (value.level == d) {
            for (let i = 0; i < value.discsAbove.length; i++) {
                let currentWeight = programs.get(value.discsAbove[i]).totalWeight;
                
                if (value.discsAbove.filter(x => programs.get(x).totalWeight == currentWeight).length == 1) {
                    let expectedTotalWeight = i == 0 ? programs.get(value.discsAbove[1]).totalWeight : programs.get(value.discsAbove[0]).totalWeight;
                    result = programs.get(value.discsAbove[i]).originalWeight - programs.get(value.discsAbove[i]).totalWeight + expectedTotalWeight;
                    break;
                }
            }
        }
    });
}

console.log(result);
console.timeEnd('Time');