import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let result = 0;

const deckSize = 10007;
let deck: number[] = [];

for (let i = 0; i < deckSize; i++) {
    deck.push(i);
}

for (let i = 0; i < input.length; i++) {
    if (input[i] == 'deal into new stack') {
        deck.reverse();
    } else if (input[i].startsWith('cut')) {
        let cutIndex = parseInt(input[i].split(' ')[1]);

        if (cutIndex > 0) {
            deck.push(...deck.slice(0, cutIndex));
            deck.splice(0, cutIndex);
        } else {
            deck.unshift(...deck.slice(cutIndex));
            deck.splice(cutIndex);
        }
    } else if (input[i].startsWith('deal with increment')) {
        let incrementIndex = parseInt(input[i].split(' ')[3]);

        let newDeck = new Array(deck.length);
        let counter = 0;

        for (let d = 0; d < deck.length; d++) {
            newDeck[counter] = deck[d];
            counter += incrementIndex;
            counter %= deck.length;
        }

        deck = newDeck.slice();
    }
}

result = deck.indexOf(2019);
console.log(result);
console.timeEnd('Time');