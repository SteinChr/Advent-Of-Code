import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let lines = input.split('\r\n');
let foods: { ingredients: string[], allergens: string[] }[] = [];
let finalMatches: { ingredient: string, allergen: string }[] = [];
let result = 0;

for (let i = 0; i < lines.length; i++) {
    let ingredients = lines[i].split(' (contains ')[0];
    let allergens = lines[i].split(' (contains ')[1].split(')')[0];
    let object = { ingredients: ingredients.split(' '), allergens: allergens.split(', ') };
    foods.push(object);
}

while (foods.find(f => f.allergens.length != 0)) {
    for (let food of foods) {
        for (let allergen of food.allergens) {
            let listOfFoodsWithSameAllergene = [];
            //alle items mit gleichem allergen finden
            for (let i = 0; i < foods.length; i++) {
                if (foods[i] != food && foods[i].allergens.includes(allergen)) {
                    listOfFoodsWithSameAllergene.push(foods[i].ingredients);
                }
            }
            //gleiche ingredients finden
            let ingredientMatches = [];
            for (let i = 0; i < food.ingredients.length; i++) {
                let counter = 0;
                for (let l = 0; l < listOfFoodsWithSameAllergene.length; l++) {
                    if (listOfFoodsWithSameAllergene[l].includes(food.ingredients[i])) {
                        counter++;
                    }
                }
                if (counter == listOfFoodsWithSameAllergene.length) {
                    ingredientMatches.push(food.ingredients[i]);
                }
            }
            if (ingredientMatches.length == 1) {
                finalMatches.push({ ingredient: ingredientMatches[0], allergen: allergen });
                for (let l = 0; l < foods.length; l++) {
                    if (foods[l].ingredients.includes(ingredientMatches[0])) {
                        foods[l].ingredients.splice(foods[l].ingredients.indexOf(ingredientMatches[0]), 1);
                    }
                    if (foods[l].allergens.includes(allergen)) {
                        foods[l].allergens.splice(foods[l].allergens.indexOf(allergen), 1);
                    }
                }
            }
        }
    }
}

for (let i = 0; i < foods.length; i++) {
    result += foods[i].ingredients.length;
}

console.log(result);
console.timeEnd('Time');