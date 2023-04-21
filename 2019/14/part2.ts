import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
const trillion = 1_000_000_000_000;
let result = 0;

class Chemical {
    name: string;
    quantity: number;
}

class Reaction {
    ingredients: Chemical[];
    resultChemicalQuantity: number;
}

let min: number = 0;
let max: number = trillion;
let testValue = min + Math.ceil((max - min) / 2);
for (let i = 0; max - min > 1 && i < 100; i++) {
    let numberOfOres = doReaction(testValue);
    if (numberOfOres < trillion) {
        min = testValue;
    } else {
        max = testValue;
    }
    testValue = min + Math.ceil((max - min) / 2);
}

for (let i = min - 2; i <= max + 2; i++) {
    let numberOfOres = doReaction(i);
    if (numberOfOres > trillion) {
        result = i - 1;
        break;
    }
}

console.log(result);

function getReactions(): Map<string, Reaction> {
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
    return reactions;
}

function doReaction(fuels: number): number {
    let reactions = getReactions();
    let necessary: Chemical[] = reactions.get('FUEL').ingredients;
    necessary.forEach(x => {
        x.quantity *= fuels;
    });
    let spare = new Map<string, number>();
    let oreCount = 0;
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
            oreCount += currentNecessary.quantity;
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
    return oreCount;
}

console.timeEnd('Time');