import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('');
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let possibleResults = [];
let result = 0;

for (let i = 0; i < letters.length; i++) {
    let polymer = input.filter(x => x != letters[i] && x != letters[i].toUpperCase());
    possibleResults.push(react(polymer));
}
result = Math.min(...possibleResults);
console.log(result);

function react(polymer: string[]): number {
    let repeat = true;
    while (repeat) {
        repeat = false;
        for (let i = 0; i < polymer.length - 1; i++) {
            if (polymer[i].toLowerCase() == polymer[i + 1].toLowerCase()) {
                if (polymer[i] != polymer[i + 1]) {
                    polymer.splice(i, 2);
                    repeat = true;
                }
            }
        }
    }
    return polymer.length;
}
console.timeEnd('Time');