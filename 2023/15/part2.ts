import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',');
let result = 0;

class Lens {
    label: string;
    focalLength: number;
}

let boxes = new Map<number, Lens[]>();
for (let i = 0; i < 256; i++) {
    boxes.set(i, []);
}

for (let i = 0; i < input.length; i++) {
    let label = input[i].split(/-|=/)[0];
    let boxNumber = getAscii(label);
    let curerntBox = boxes.get(boxNumber);

    let operation = '=';
    if (input[i].includes('-')) operation = '-';

    if (operation == '-') {
        for (let b = 0; b < curerntBox.length; b++) {
            if (curerntBox[b].label == label) {
                curerntBox.splice(b, 1);
                break;
            }
        }
    } else {
        let focalLength = parseInt(input[i].split(/-|=/)[1]);
        let sameLabelInBox: boolean = false;

        for (let b = 0; b < curerntBox.length; b++) {
            if (curerntBox[b].label == label) {
                curerntBox[b].focalLength = focalLength;
                sameLabelInBox = true;
                break;
            }
        }

        if (!sameLabelInBox) {
            curerntBox.push({ label: label, focalLength: focalLength });
        }
    }

    boxes.set(boxNumber, curerntBox);
}

for (let b = 0; b < boxes.size; b++) {
    let currentBox = boxes.get(b);
    
    for (let l = 0; l < currentBox.length; l++) {
        result += (b + 1) * (l + 1) * currentBox[l].focalLength;
    }
}

console.log(result);

function getAscii(label: string): number {
    let currentValue = 0;
    for (let l = 0; l < label.length; l++) {
        let ascii = label.charCodeAt(l);
        currentValue += ascii;
        currentValue *= 17;
        currentValue = currentValue % 256;
    }
    return currentValue;
}

console.timeEnd('Time');