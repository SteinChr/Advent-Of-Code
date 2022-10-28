import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.toString());
let imageEnchancementAlgorithm = input[0];
let inputImage = input[1].split('\r\n').map(x => x.split(''));
const addNumber = 200;
const cutValue = 3;
let originalLength = inputImage[0].length;
let result = 0;
for (let l = 0; l < inputImage.length; l++) {
    for (let i = 0; i < Math.floor((addNumber - originalLength) / 2); i++) {
        inputImage[l].unshift('.');
        inputImage[l].push('.');
    }
}
for (let i = 0; i < Math.floor(addNumber / 2); i++) {
    inputImage.unshift(new Array(addNumber).fill('.'));
    inputImage.push(new Array(addNumber).fill('.'));
}
for (let step = 0; step < 2; step++) {
    let outputImage = new Array(inputImage.length);
    for (let i = 0; i < inputImage.length; i++) {
        outputImage[i] = inputImage[i].slice();
    }
    for (let y = 1; y < inputImage.length - 1; y++) {
        for (let x = 1; x < inputImage[y].length - 1; x++) {
            let binaryIndex = inputImage[y - 1][x - 1] + inputImage[y - 1][x] + inputImage[y - 1][x + 1] + inputImage[y][x - 1] + inputImage[y][x] + inputImage[y][x + 1] + inputImage[y + 1][x - 1] + inputImage[y + 1][x] + inputImage[y + 1][x + 1];
            binaryIndex = binaryIndex.replace(/\#/g, '1');
            binaryIndex = binaryIndex.replace(/\./g, '0');
            let index = parseInt(binaryIndex, 2);
            outputImage[y][x] = imageEnchancementAlgorithm.charAt(index);
        }
    }
    for (let i = 0; i < inputImage.length; i++) {
        inputImage[i] = outputImage[i].slice();
    }
}
for (let y = cutValue; y < inputImage.length - cutValue; y++) {
    for (let x = cutValue; x < inputImage[y].length - cutValue; x++) {
        if (inputImage[y][x] == '#') {
            result++;
        }
    }
}
console.log(result);
console.timeEnd('Time');