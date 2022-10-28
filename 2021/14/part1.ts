import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.toString());
let template = input[0].split('');
let pairs = input[1].split('\r\n').map(x => x.split(' -> '));
let count = 0;
let min = 0;
let max = 0;
let result = 0;
for (let step = 0; step < 10; step++) {
    let newTemplate = template.slice();
    for (let i = template.length - 1; i >= 0; i--) {
        for (let l = 0; l < pairs.length; l++) {
            if (template[i] == pairs[l][0].charAt(0)) {
                if (template[i + 1] == pairs[l][0].charAt(1)) {
                    newTemplate.splice(i + 1, 0, pairs[l][1]);
                }
            }
        }
    }
    template = newTemplate.slice();
}
min = template.length;
for (let i = 0; i < template.length; i++) {
    for (let l = 0; l < template.length; l++) {
        if (template[i] == template[l]) count++;
    }
    if (count > max) max = count;
    if (count < min) min = count;
    count = 0;
}
result = max - min;
console.log(result);
console.timeEnd('Time');