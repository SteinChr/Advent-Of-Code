import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split(/\r\n|,\s/));
let result = 0;

let availablePatterns: string[] = input[0].slice();
let desiredDesigns: string[] = input[1].slice();

let found = new Map<string, number>();

for (let i = 0; i < desiredDesigns.length; i++) {
    result += createDesign(desiredDesigns[i]);
}

function createDesign(design: string): number {
    if (found.has(design)) return found.get(design);

    let possibilities = 0;
    
    if (design == '') {
        possibilities = 1;
    } else {
        for (let i = 0; i < availablePatterns.length; i++) {
            if (design.startsWith(availablePatterns[i])) {
                possibilities += createDesign(design.slice(availablePatterns[i].length));
            }
        }
    }

    found.set(design, possibilities);
    return possibilities;
}

console.log(result);
console.timeEnd('Time');