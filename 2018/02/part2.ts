import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let changedString = '';
let running = true;
for (let i = 0; i < input.length; i++) { // jede zeile
    for (let l = 0; l < input[i].length; l++) { // jeden buchstaben in der zeile ersetzen
        for (let j = 0; j < letters.length; j++) { //jeden buchstaben benützen
            changedString = input[i].substr(0, l) + letters[j] + input[i].substr(l + 1);
            if (input.filter(x => x == changedString).length != 0 && input.indexOf(changedString) != i && running) {
                console.log(changedString.substr(0, l) + changedString.substr(l +  1));
                running = false;
            }
        }
    }
}
console.timeEnd('Time');