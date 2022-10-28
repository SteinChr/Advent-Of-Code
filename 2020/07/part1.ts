import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let allBags = input.split('\r\n');
let currentBagType;
let currentBagContent;
let myBag = 'shiny gold';
let possibleBags = [];
let bagsToLookUp = [];
let newBagsToLookUp = [];

for (let i = 0; i < allBags.length; i++) {
    currentBagType = allBags[i].split(' contain ')[0];
    currentBagContent = allBags[i].split(' contain ')[1];

    if (currentBagContent.includes(myBag)) {
        possibleBags.push(currentBagType);
        bagsToLookUp.push(currentBagType.replace('bags', 'bag'));
    }
}

while (bagsToLookUp.length != 0) {
    for (let i = 0; i < allBags.length; i++) {
        currentBagType = allBags[i].split(' contain ')[0]
        currentBagContent = allBags[i].split(' contain ')[1];

        for (let l = 0; l < bagsToLookUp.length; l++) {
            if (currentBagContent.includes(bagsToLookUp[l])) {
                possibleBags.push(currentBagType);
                newBagsToLookUp.push(currentBagType.replace('bags', 'bag'));
            }
        }
    }
    bagsToLookUp = newBagsToLookUp.filter((p, i, all) => all.indexOf(p) == i);
    newBagsToLookUp = [];
}


possibleBags = possibleBags.filter((p, i, all) => all.indexOf(p) == i);
console.log(possibleBags.length);
console.timeEnd('Time');