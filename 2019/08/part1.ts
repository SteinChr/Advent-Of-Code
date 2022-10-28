import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
const width = 25;
const height = 6;
const numberOfLayers = input.length / (width * height);
let picture = [];
let numberOfZeroes = [];
let layerWithFewestZeroes = -1;
let counter = 0;
let result = 0;

for (let i = 0; i < numberOfLayers; i++) {
    picture[i] = [];
    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            picture[i].push(parseInt(input.charAt(counter)));
            counter++;
        }
    }
}

for (let i = 0; i < numberOfLayers; i++) {
    numberOfZeroes.push(picture[i].filter(l => l == 0).length);
}

layerWithFewestZeroes = numberOfZeroes.indexOf(Math.min(...numberOfZeroes));
result = picture[layerWithFewestZeroes].filter(l => l == 1).length * picture[layerWithFewestZeroes].filter(l => l == 2).length;
console.log(result);
console.timeEnd('Time');