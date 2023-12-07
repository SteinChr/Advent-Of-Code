import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');
let result = 0;

let cardTypes = ['five-of-a-kind', 'four-of-a-kind', 'full-house', 'three-of-a-kind', 'two-pair', 'one-pair', 'high-card'];
let cardLabels = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

class Card {
    hand: string;
    bid: number;
    type: string;
}

let cards: Card[] = [];

for (let i = 0; i < input.length; i++) {
    let currentCard = input[i].split(' ');
    cards.push({ hand: currentCard[0], bid: parseInt(currentCard[1]), type: '' });
}

for (let i = 0; i < cards.length; i++) {
    let currentHand = cards[i].hand.split('');

    if (currentHand[0] == currentHand[1] && currentHand[0] == currentHand[2] && currentHand[0] == currentHand[3] && currentHand[0] == currentHand[4]) {
        cards[i].type = 'five-of-a-kind';
    } else if (currentHand.filter(x => x == currentHand[0]).length == 4 || currentHand.filter(x => x == currentHand[1]).length == 4) {
        cards[i].type = 'four-of-a-kind';
    } else if (currentHand.filter(x => x == currentHand[0]).length == 3 || currentHand.filter(x => x == currentHand[1]).length == 3 || currentHand.filter(x => x == currentHand[2]).length == 3) {
        if (currentHand.filter(x => x == currentHand[0]).length == 2 || currentHand.filter(x => x == currentHand[1]).length == 2 || currentHand.filter(x => x == currentHand[2]).length == 2 || currentHand.filter(x => x == currentHand[3]).length == 2) {
            cards[i].type = 'full-house';
        } else {
            cards[i].type = 'three-of-a-kind';
        }
    } else if (new Set (currentHand).size == currentHand.length - 2) {
        cards[i].type = 'two-pair';
    } else if (new Set (currentHand).size == currentHand.length - 1) {
        cards[i].type = 'one-pair';
    } else if (new Set(currentHand).size == currentHand.length) {
        cards[i].type = 'high-card';
    } else {
        console.log('Error, no type detected', currentHand);
    }
}

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