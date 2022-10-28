import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let passports = input.split('\r\n\r\n');
let elements = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].sort().join(' ');
let result = 0;

for (let y = 0; y < passports.length; y++) {
    let data = passports[y].split(/[(\r\n) ]/).filter(p => p != '' && !p.startsWith('cid')).sort();

    let keys = data.map(p => p.split(':')[0]).join(' ');
    let values = data.map(p => p.split(':')[1]);
    let isValid = true;
    if (keys === elements) {
        isValid = isValid && parseInt(values[0]) >= 1920 && parseInt(values[0]) <= 2002;
        isValid = isValid && values[1].match(/^(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)$/) != null;
        isValid = isValid && parseInt(values[2]) >= 2020 && parseInt(values[2]) <= 2030;
        isValid = isValid && values[3].match(/^#[0-9a-f]{6}$/) != null;
        let val = values[4].match(/^([0-9]+)((in)|(cm))$/);
        if (val != null) {
            if (val[2] === 'cm') {
                isValid = isValid && parseInt(val[1]) >= 150 && parseInt(val[1]) <= 193;
            } else if (val[2] === "in") {
                isValid = isValid && parseInt(val[1]) >= 59 && parseInt(val[1]) <= 76;
            }
        } else {
            isValid = false;
        }
        isValid = isValid && parseInt(values[5]) >= 2010 && parseInt(values[5]) <= 2020;
        isValid = isValid && values[6].match(/^[0-9]{9}$/) != null;
        if (isValid == true) {
            result++;
        }
    }
}
console.log(result);
console.timeEnd('Time');