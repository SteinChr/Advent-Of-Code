import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('').map(x => parseInt(x));
let result = 0;

class Block {
    length: number;
    id: number;
    blancSpacesFollowing: number;
    idsFollowing: { id: number, length: number }[];
    movedAway: boolean;
}

let blocks = new Map<number, Block>();
let indexes: number[] = [];
let indexCounter: number = 0;

for (let i = 0; i < input.length; i += 2) {
    blocks.set(indexCounter, { length: input[i], id: i / 2, blancSpacesFollowing: i + 1 < input.length ? input[i + 1] : 0, idsFollowing: [], movedAway: false });
    indexes.push(indexCounter);
    indexCounter += input[i] + input[i + 1];
}

for (let i = indexes.length - 1; i >= 0; i--) {
    let currentBlock = blocks.get(indexes[i]);

    for (let l = 0; l < i; l++) {
        let potentialSpaceBlock = blocks.get(indexes[l]);

        if (currentBlock.length <= potentialSpaceBlock.blancSpacesFollowing) {
            potentialSpaceBlock.blancSpacesFollowing -= currentBlock.length;
            potentialSpaceBlock.idsFollowing.push({ id: currentBlock.id, length: currentBlock.length });
            currentBlock.movedAway = true;
            break;
        }
    }
}

for (let i = 0; i < indexes.length; i++) {
    let currentBlock = blocks.get(indexes[i]);
    let posOffside = 0;

    for (let l = 0; l < currentBlock.length; l++) {
        if (!currentBlock.movedAway) result += (indexes[i] + posOffside) * currentBlock.id;
        posOffside++;
    }

    for (let j = 0; j < currentBlock.idsFollowing.length; j++) {
        for (let l = 0; l < currentBlock.idsFollowing[j].length; l++) {
            result += (indexes[i] + posOffside) * currentBlock.idsFollowing[j].id;
            posOffside++;
        }
    }
}

console.log(result);
console.timeEnd('Time');