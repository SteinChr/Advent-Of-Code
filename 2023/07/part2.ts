import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let result = 0;

let cardTypes = ['five-of-a-kind', 'four-of-a-kind', 'full-house', 'three-of-a-kind', 'two-pair', 'one-pair', 'high-card', 'not-found'];
let cardLabels = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'j'];

class Card {
    hand: string;
    bid: number;
    type: string;
}

let cards: Card[] = [];

for (let i = 0; i < input.length; i++) {
    let currentCard = input[i].split(' ');
    cards.push({ hand: currentCard[0], bid: parseInt(currentCard[1]), type: 'not-found' });
}

for (let i = 0; i < cards.length; i++) {
    let currentHand = cards[i].hand.split('');
    let numberOfJs = currentHand.filter(x => x == 'J').length;

    if (numberOfJs >= 4) {
        cards[i].type = 'five-of-a-kind';
    } else {
        let indexOfJ1 = -1;
        let indexOfJ2 = -1;
        let indexOfJ3 = -1;

        if (numberOfJs == 3) indexOfJ1 = currentHand.indexOf('J');
        if (numberOfJs >= 2) indexOfJ2 = currentHand.indexOf('J', (indexOfJ1 != -1 ? indexOfJ1 + 1 : 0));
        if (numberOfJs >= 1) indexOfJ3 = currentHand.indexOf('J', (indexOfJ2 != -1 ? indexOfJ2 + 1 : 0));

        for (let j1 = 0; j1 < (numberOfJs == 3 ? 13 : 1); j1++) {
            if (numberOfJs == 3) currentHand[indexOfJ1] = cardLabels[j1];
            
            for (let j2 = 0; j2 < (numberOfJs >= 2 ? 13 : 1); j2++) {
                if (numberOfJs >= 2) currentHand[indexOfJ2] = cardLabels[j2];

                for (let j3 = 0; j3 < (numberOfJs >= 1 ? 13 : 1); j3++) {
                    if (numberOfJs >= 1) currentHand[indexOfJ3] = cardLabels[j3];

                    if (currentHand[0] == currentHand[1] && currentHand[0] == currentHand[2] && currentHand[0] == currentHand[3] && currentHand[0] == currentHand[4]) {
                        if (cardTypes.indexOf(cards[i].type) > cardTypes.indexOf('five-of-a-kind')) cards[i].type = 'five-of-a-kind';
                    } else if (currentHand.filter(x => x == currentHand[0]).length == 4 || currentHand.filter(x => x == currentHand[1]).length == 4) {
                        if (cardTypes.indexOf(cards[i].type) > cardTypes.indexOf('four-of-a-kind')) cards[i].type = 'four-of-a-kind';
                    } else if (currentHand.filter(x => x == currentHand[0]).length == 3 || currentHand.filter(x => x == currentHand[1]).length == 3 || currentHand.filter(x => x == currentHand[2]).length == 3) {
                        if (currentHand.filter(x => x == currentHand[0]).length == 2 || currentHand.filter(x => x == currentHand[1]).length == 2 || currentHand.filter(x => x == currentHand[2]).length == 2 || currentHand.filter(x => x == currentHand[3]).length == 2) {
                            if (cardTypes.indexOf(cards[i].type) > cardTypes.indexOf('full-house')) cards[i].type = 'full-house';
                        } else {
                            if (cardTypes.indexOf(cards[i].type) > cardTypes.indexOf('three-of-a-kind')) cards[i].type = 'three-of-a-kind';
                        }
                    } else if (new Set(currentHand).size == currentHand.length - 2) {
                        if (cardTypes.indexOf(cards[i].type) > cardTypes.indexOf('two-pair')) cards[i].type = 'two-pair';
                    } else if (new Set(currentHand).size == currentHand.length - 1) {
                        if (cardTypes.indexOf(cards[i].type) > cardTypes.indexOf('one-pair')) cards[i].type = 'one-pair';
                    } else if (new Set(currentHand).size == currentHand.length) {
                        if (cardTypes.indexOf(cards[i].type) > cardTypes.indexOf('high-card')) cards[i].type = 'high-card';
                    }
                }
            }
        }
    }
}

cardLabels[cardLabels.length - 1] = 'J';
cards.sort(compare);

for (let i = 0; i < cards.length; i++) {
    result += cards[i].bid * (i + 1);
}

console.log(result);

function compare(a: Card, b: Card): number {
    if (cardTypes.indexOf(a.type) < cardTypes.indexOf(b.type)) {
        return 1;
    } else if (cardTypes.indexOf(a.type) > cardTypes.indexOf(b.type)) {
        return -1;
    } else {
        for (let l = 0; l < a.hand.length; l++) {
            if (cardLabels.indexOf(a.hand[l]) < cardLabels.indexOf(b.hand[l])) {
                return 1;
            } else if (cardLabels.indexOf(a.hand[l]) > cardLabels.indexOf(b.hand[l])) {
                return -1;
            }
        }
    }
    return 0;
}

console.timeEnd('Time');