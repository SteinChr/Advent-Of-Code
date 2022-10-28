import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let lowestPassword = parseInt(input.split('-')[0]);
let highestPassword = parseInt(input.split('-')[1]);
let possiblePasswords = 0;

for (let i = lowestPassword; i <= highestPassword; i++) {
    if (increasingDigits(i) && sameDigits(i)) {
        possiblePasswords++;
    }
}

console.log(possiblePasswords);

function increasingDigits(number) {
    let password = [...number + ''].map(n => parseInt(n));

    for (let i = 0; i < password.length; i++) {
        if (password[i] > password[i + 1]) {
            return false;
        }
    }

    return true;
}

function sameDigits(number) {
    let password = [...number + ''].map(n => parseInt(n));

    for (let i = 0; i < password.length; i++) {
        if (password[i] == password[i + 1]) {
            return true;
        }
    }

    return false;
}

console.timeEnd('Time');