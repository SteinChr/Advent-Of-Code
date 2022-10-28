import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let allBags = input.split('\r\n');
let currentBagType;
let currentBagContent;
let myBag = 'shiny gold bags';
let possibleBags = [];
let bagsToLookUp = [];
let newBagsToLookUp = [];

for (let i = 0; i < allBags.length; i++) {
    currentBagType = allBags[i].split(' contain ')[0]
    currentBagContent = allBags[i].split(' contain ')[1];
    currentBagContent = currentBagContent.split(', ');

    for (let l = 0; l < currentBagContent.length; l++) {
        if (currentBagType == myBag) {
            let currentBagInnerContent = currentBagContent[l].split(' ');
            let pushObject = { number: parseInt(currentBagInnerContent[0]), bag: currentBagInnerContent[1] + ' ' + currentBagInnerContent[2] };
            possibleBags.push(pushObject);
            bagsToLookUp.push(pushObject);
        }
    }
}

while (bagsToLookUp.length != 0) {
    for (let i = 0; i < allBags.length; i++) {
        currentBagType = allBags[i].split(' contain ')[0]
        currentBagContent = allBags[i].split(' contain ')[1];
        currentBagContent = currentBagContent.split(', ');

        for (let l = 0; l < bagsToLookUp.length; l++) {
            if (currentBagType.includes(bagsToLookUp[l].bag)) {
                for (let j = 0; j < currentBagContent.length; j++) {
                    let currentBagInnerContent = currentBagContent[j].split(' ');
                    let pushObject = { number: parseInt(currentBagInnerContent[0]) * bagsToLookUp[l].number, bag: currentBagInnerContent[1] + ' ' + currentBagInnerContent[2] };
                    possibleBags.push(pushObject);
                    newBagsToLookUp.push(pushObject);
                }
            }
        }
    }
    bagsToLookUp = newBagsToLookUp;
    newBagsToLookUp = [];
}
let result = 0;
for (let i = 0; i < possibleBags.length; i++) {
    if (!isNaN(possibleBags[i].number)) result += possibleBags[i].number;
}
console.log(result);
console.timeEnd('Time');