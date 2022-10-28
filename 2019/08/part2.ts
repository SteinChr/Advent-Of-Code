import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
const width = 25;
const height = 6;
const numberOfLayers = input.length / (width * height);
let picture = [];
let finalPicture = [];
let message = [];
let counter = 0;

for (let i = 0; i < numberOfLayers; i++) {
    picture[i] = [];
    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            picture[i].push(parseInt(input.charAt(counter)));
            counter++;
        }
    }
}

for (let i = 0; i < picture[0].length; i++) {
    counter = 0;
    while (picture[counter][i] == 2) {
        counter++;
    }
    finalPicture.push(picture[counter][i]);
}

for (let i = 0; i < height; i++) {
    message[i] = '';
    for (let l = 0; l < width; l++) {
        if (finalPicture[width * i + l] == 1) {
            message[i] += '#';
        } else if (finalPicture[width * i + l] == 0) {
            message[i] += ' ';
        }
    }
}

console.log(message);
console.timeEnd('Time');