import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n');
let initialState = new Array(20).fill('.').join('') + input[0].split('initial state: ')[1] + new Array(1500).fill('.').join('');
let plants = initialState.split('');
let notes = input[1].split('\r\n').map(x => x.split(' => '));
let result = 0;

for (let g = 0; g < 100; g++) {
    let newPlants = plants.slice();
    for (let i = 2; i < plants.length - 2; i++) {
        let currentSection = plants.slice(i - 2, i + 3).join('');
        for (let l = 0; l < notes.length; l++) {
            if (notes[l][0] == currentSection) {
                newPlants[i] = notes[l][1];
                break;
            }
            
            //only necessary for test case
            if (l == notes.length - 1) newPlants[i] = '.';
        }
    }
    plants = newPlants.slice();
}
for (let i = 0; i < plants.length; i++) {
    if (plants[i] == '#') {
        result += i - 20 + 50000000000 - 100;
    }
}
console.log(result);
console.timeEnd('Time');