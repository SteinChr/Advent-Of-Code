import { readFileSync } from 'fs';
console.time('Time');
let input = parseInt(readFileSync('./input.txt', 'utf-8'));
let recipes: number[] = [3, 7];
let pos1 = 0;
let pos2 = 1;

while (recipes.length < input + 10) {
    let nextRecipe = recipes[pos1] + recipes[pos2];
    if (nextRecipe >= 10) recipes.push(1);
    recipes.push(nextRecipe % 10);
    pos1 = (pos1 + recipes[pos1] + 1) % recipes.length;
    pos2 = (pos2 + recipes[pos2] + 1) % recipes.length;
}

console.log(recipes.slice(input, input + 10).join(''));
console.timeEnd('Time');