import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let cardKey = parseInt(input.split('\r\n')[0]);
let doorKey = parseInt(input.split('\r\n')[1]);
let value = 1;
let loopSizeCard = 0;
let loopSizeDoor = 0;
let subjectNumber = 7;
let cardPublicKey = 0;
let encryptionKeyCard = 1;
let encryptionKeyDoor = 1;

while (cardKey != value) {
    value *= subjectNumber;
    value = value % 20201227;
    loopSizeCard++;
}

value = 1;

while (doorKey != value) {
    value *= subjectNumber;
    value = value % 20201227;
    loopSizeDoor++;
}

for (let i = 0; i < loopSizeCard; i++) {
    encryptionKeyDoor *= doorKey;
    encryptionKeyDoor = encryptionKeyDoor % 20201227;
}

for (let i = 0; i < loopSizeDoor; i++) {
    encryptionKeyCard *= cardKey;
    encryptionKeyCard = encryptionKeyCard % 20201227;
}

console.log(encryptionKeyDoor);
console.timeEnd('Time');