import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split(/\r\n|,\s/));
let result = 0;

let availablePatterns: string[] = input[0].slice();
let desiredDesigns: string[] = input[1].slice();

let found = new Map<string, boolean>();

for (let i = 0; i < desiredDesigns.length; i++) {
    if (createDesign(desiredDesigns[i])) result++;
}

function createDesign(design: string): boolean {
    if (found.has(design)) return found.get(design);

    if (design == '') {
        found.set(design, true);
        return true;
    } else {
        for (let i = 0; i < availablePatterns.length; i++) {
            if (design.startsWith(availablePatterns[i])) {
                found.set(design, true);
                if (createDesign(design.slice(availablePatterns[i].length))) return true;
            }
        }
    }

    found.set(design, false);
    return false;
}

console.log(result);
console.timeEnd('Time');