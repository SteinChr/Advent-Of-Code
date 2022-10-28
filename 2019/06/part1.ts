import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8').split('\r\n');
let orbits = input.map(i => i.split(')'));
let result = orbits.length;

for (let i = 0; i < orbits.length; i++) {
    let currentElement = orbits[i][1];
    let currentIndex = i;
    while (orbits[currentIndex][0] != 'COM') {
        result++;
        currentElement = orbits[currentIndex][0];
        for (let l = 0; l < orbits.length; l++) {
            if (orbits[l][1] == currentElement) {
                currentIndex = l;
                break;
            }
        }
    }
}

console.log(result);
console.timeEnd('Time');