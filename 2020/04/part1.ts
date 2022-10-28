import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let passports = input.split('\r\n\r\n');
let elements = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
let containsElements = 0;
let validPassports = 0;

for (let i = 0; i < passports.length; i++) {
    containsElements = 0;
    for (let l = 0; l < elements.length; l++) {
        if (passports[i].includes(elements[l])) {
            containsElements++;
        }
    }
    if(containsElements === elements.length) {
        validPassports++;
    }
}

console.log(validPassports);
console.timeEnd('Time');