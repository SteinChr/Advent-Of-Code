import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let lines = input.split('\r\n');
let minimum;
let maximum;
let character;
let password;
let passwordNew;
let validPasswords = 0;

for (let i = 0; i < lines.length; i++) {
    minimum = parseInt(lines[i].split('-')[0]);
    let remaining = lines[i].split('-')[1];
    maximum = parseInt(remaining.split(' ')[0]);
    character = remaining.split(' ')[1];
    character = character.replace(':', '');
    password = remaining.split(' ')[2];

    passwordNew = password;

    while (passwordNew.indexOf(character) >= 0) {
        passwordNew = passwordNew.replace(character, '');
    }
    let numberOfChar = password.length - passwordNew.length;

    if (numberOfChar >= minimum && numberOfChar <= maximum) {
        validPasswords++;
    }
}
console.log(validPasswords);
console.timeEnd('Time');