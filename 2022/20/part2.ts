import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => parseInt(x));
let result = 0;

class sequenceElement {
    value: number;
    currentPosition: number;
}

const decryptionKey = 811589153;
let originalPositionOfZero = -1;
let sequence = new Map<number, sequenceElement>();
for (let i = 0; i < input.length; i++) {
    sequence.set(i, { value: input[i] * decryptionKey, currentPosition: i });
    if (input[i] == 0) originalPositionOfZero = i;
}

for (let j = 0; j < 10; j++) {
    for (let i = 0; i < sequence.size; i++) {
        let currentSequenceElement = sequence.get(i);
        let oldPosition = currentSequenceElement.currentPosition;
        let newPosition: number = currentSequenceElement.currentPosition + currentSequenceElement.value;
        if (newPosition > 0) {
            newPosition %= sequence.size - 1;
        } else if (newPosition < 0) {
            newPosition %= sequence.size - 1;
            newPosition += sequence.size - 1;
        } else {
            newPosition = sequence.size - 1;
        }
        sequence.set(i, { value: currentSequenceElement.value, currentPosition: newPosition });
        for (let l = 0; l < sequence.size; l++) {
            let element = sequence.get(l);
            if (oldPosition < newPosition) {
                if (element.currentPosition > oldPosition && element.currentPosition <= newPosition && l != i) {
                    sequence.set(l, { value: element.value, currentPosition: element.currentPosition - 1 });
                }
            } else {
                if (element.currentPosition < oldPosition && element.currentPosition >= newPosition && l != i) {
                    sequence.set(l, { value: element.value, currentPosition: element.currentPosition + 1 });
                }
            }
        }
    }
}

let zeroSequenceElement = sequence.get(originalPositionOfZero);
let resultPositions: number[] = [(zeroSequenceElement.currentPosition + 1000) % sequence.size, (zeroSequenceElement.currentPosition + 2000) % sequence.size, (zeroSequenceElement.currentPosition + 3000) % sequence.size];
for (let i = 0; i < sequence.size; i++) {
    if (resultPositions.includes(sequence.get(i).currentPosition)) result += sequence.get(i).value;
}

console.log(result);
console.timeEnd('Time');