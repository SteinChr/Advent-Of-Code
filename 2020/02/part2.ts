import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let lines = input.split('\r\n');
let minimum;
let maximum;
let character;
let password;
let validPasswords = 0;

for (let i = 0; i < lines.length; i++) {
    minimum = parseInt(lines[i].split('-')[0]);
    let remaining = lines[i].split('-')[1];
    maximum = parseInt(remaining.split(' ')[0]);
    character = remaining.split(' ')[1];
    character = character.replace(':', '');
    password = remaining.split(' ')[2];

    minimum--;
    maximum--;

    if(password.charAt(minimum) === character || password.charAt(maximum) === character) {
        if(!(password.charAt(minimum) === character && password.charAt(maximum) === character)) {
            validPasswords++;
        }
    }
}
console.log(validPasswords);
console.timeEnd('Time');