import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let result = 0;

class Chemical {
    name: string;
    quantity: number;
}

class Reaction {
    ingredients: Chemical[];
    resultChemicalQuantity: number;
}

let reactions = new Map<string, Reaction>();
for (let i = 0; i < input.length; i++) {
    let splittedIngredients: string[] = input[i].split(' => ')[0].split(', ');
    let currentResultChemical: string = input[i].split(' => ')[1];
    let ingredients: Chemical[] = [];
    for (let currentIngredient of splittedIngredients) {
        ingredients.push({ name: currentIngredient.split(' ')[1], quantity: parseInt(currentIngredient.split(' ')[0]) });
    }
    reactions.set(currentResultChemical.split(' ')[1], { ingredients: ingredients, resultChemicalQuantity: parseInt(currentResultChemical.split(' ')[0]) });
}

let necessary: Chemical[] = reactions.get('FUEL').ingredients;
let spare = new Map<string, number>();
for (let i = 0; necessary.length != 0; i++) {
    let currentNecessary: Chemical = necessary.shift();
    if (spare.has(currentNecessary.name)) {
        if (spare.get(currentNecessary.name) > currentNecessary.quantity) {
            spare.set(currentNecessary.name, spare.get(currentNecessary.name) - currentNecessary.quantity);
            currentNecessary.quantity = 0;
        } else {
            currentNecessary.quantity -= spare.get(currentNecessary.name);
            spare.delete(currentNecessary.name);
        }
    }

    if (currentNecessary.name == 'ORE') {
        result += currentNecessary.quantity;
    } else {
        let newNecessary: Chemical[] = reactions.get(currentNecessary.name).ingredients;
        const factor = Math.ceil(currentNecessary.quantity / reactions.get(currentNecessary.name).resultChemicalQuantity);
        for (let n = 0; n < newNecessary.length; n++) {
            let remaining: number = currentNecessary.quantity;
            if (remaining > 0) necessary.push({ name: newNecessary[n].name, quantity: newNecessary[n].quantity * factor });
        }
        let difference = factor * reactions.get(currentNecessary.name).resultChemicalQuantity - currentNecessary.quantity;
        if (difference > 0) spare.set(currentNecessary.name, (spare.get(currentNecessary.name) ? spare.get(currentNecessary.name) : 0) + difference);
    }
}

console.log(result);
console.timeEnd('Time');