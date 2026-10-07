import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',');

class Dance {
    type: string;
    parameter1n?: number;
    parameter1s?: string;
    parameter2n?: number
    parameter2s?: string;
}

let dances: Dance[] = [];

for (let i = 0; i < input.length; i++) {
    if (input[i].startsWith('s')) {
        dances.push({ type: 's', parameter1n: parseInt(input[i].slice(1)) });
    } else if (input[i].startsWith('x')) {
        dances.push({ type: 'x', parameter1n: input[i].charAt(2) == '/' ? parseInt(input[i].charAt(1)) : parseInt(input[i].slice(1, 3)), parameter2n: input[i].charAt(2) == '/' ? parseInt(input[i].slice(3)) : parseInt(input[i].slice(4)) });
    } else if (input[i].startsWith('p')) {
        dances.push({ type: 'p', parameter1s: input[i].charAt(1), parameter2s: input[i].charAt(3) });
    }
}

let programs = 'abcdefghijklmnop'.split('');

let seen = new Set<string>();
let repFound: boolean = false;

for (let i = 0; i < 1000000000; i++) {
    for (let d = 0; d < dances.length; d++) {
        if (dances[d].type == 's') {
            for (let s = 0; s < dances[d].parameter1n; s++) {
                programs.unshift(programs.pop());
            }
        } else if (dances[d].type == 'x') {
            let temp = programs[dances[d].parameter1n];
            programs[dances[d].parameter1n] = programs[dances[d].parameter2n];
            programs[dances[d].parameter2n] = temp;
        } else if (dances[d].type == 'p') {
            let temp = programs.indexOf(dances[d].parameter1s);
            programs[programs.indexOf(dances[d].parameter2s)] = dances[d].parameter1s;
            programs[temp] = dances[d].parameter2s;
        }

        let currentSeen = getSeen(programs, d);

        if (seen.has(currentSeen) && !repFound) {
            i = 1000000000 - (1000000000 % i);
            repFound = true;
        }

        seen.add(currentSeen);
    }
}

console.log(programs.join(''));

function getSeen(programs: string[], index: number): string {
    return programs.join('') + index.toString();
}

console.timeEnd('Time');