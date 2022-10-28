import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('').map(x => parseInt(x));
let joinedInput = input.join('');
let recipes: number[] = [3, 7];
let pos1 = 0;
let pos2 = 1;
let result = 0;

for (let i = 0; true; i++) {
    let nextRecipe = recipes[pos1] + recipes[pos2];
    if (nextRecipe >= 10) recipes.push(1);
    recipes.push(nextRecipe % 10);
    pos1 = (pos1 + recipes[pos1] + 1) % recipes.length;
    pos2 = (pos2 + recipes[pos2] + 1) % recipes.length;

    let currentLastNumber: string = '';
    for (let l = Math.min(input.length + 1, recipes.length); l > 1; l--) {
        currentLastNumber += recipes[recipes.length - l].toString();
    }
    if (currentLastNumber == joinedInput) {
        result = recipes.length - input.length - 1;
        break;
    } else {
        currentLastNumber = currentLastNumber.substring(1);
        currentLastNumber += recipes[recipes.length - 1].toString();
        if (currentLastNumber == joinedInput) {
            result = recipes.length - input.length;
            break;
        }
    }
}

console.log(result);
console.timeEnd('Time');