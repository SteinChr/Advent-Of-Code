import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8').split('\r\n');
let orbits = input.map(i => i.split(')'));
let youPosition = '';
let sanPosition = '';
let youIndex = 0;
let sanIndex = 0;
let youWay = [];
let sanWay = [];
let result = 0;

for (let i = 0; i < orbits.length; i++) {
    if (orbits[i][1] == 'YOU') {
        youIndex = i;
    }
    if (orbits[i][1] == 'SAN') {
        sanIndex = i;
    }
}

while (true) {
    youPosition = orbits[youIndex][0];
    for (let i = 0; i < orbits.length; i++) {
        if (orbits[i][1] == youPosition) {
            youIndex = i;
            break;
        }
    }
    youWay.push(youPosition);

    sanPosition = orbits[sanIndex][0];
    for (let i = 0; i < orbits.length; i++) {
        if (orbits[i][1] == sanPosition) {
            sanIndex = i;
            break;
        }
    }
    sanWay.push(sanPosition);

    if (youWay.some(w => sanWay.includes(w))) break;
}

for (let i = 0; i < youWay.length; i++) {
    if (sanWay.includes(youWay[i])) {
        result = i + sanWay.indexOf(youWay[i]);
        break;
    }
}

console.log(result);
console.timeEnd('Time');