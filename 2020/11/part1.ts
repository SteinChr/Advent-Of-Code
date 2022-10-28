import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let seatPlan = input.split('\r\n');
let result = 0;

while (true) {
    let newSeatPlan = [];
    for (let i = 0; i < seatPlan.length; i++) {
        let newSeat = [];
        for (let l = 0; l < seatPlan[i].length; l++) {
            if (seatPlan[i].charAt(l) == 'L') {
                let oben = i > 0;
                let unten = i < seatPlan.length - 1;
                let rechts = l < seatPlan[i].length - 1;
                let links = l > 0;
                let counter = 0;
                let nec = 8;
                if (unten) {
                    if (seatPlan[i + 1].charAt(l) != '#') {
                        counter++;
                    }
                } else {
                    nec -= 1;
                }
                if (oben) {
                    if (seatPlan[i - 1].charAt(l) != '#') {
                        counter++;
                    }
                } else {
                    nec -= 1;
                }
                if (rechts) {
                    if (seatPlan[i].charAt(l + 1) != '#') {
                        counter++;
                    }
                } else {
                    nec -= 1;
                }
                if (links) {
                    if (seatPlan[i].charAt(l - 1) != '#') {
                        counter++;
                    }
                } else {
                    nec -= 1;
                }
                if (oben && rechts) {
                    if (seatPlan[i - 1].charAt(l + 1) != '#') {
                        counter++;
                    }
                } else {
                    nec -= 1;
                }
                if (oben && links) {
                    if (seatPlan[i - 1].charAt(l - 1) != '#') {
                        counter++;
                    }
                } else {
                    nec -= 1;
                }
                if (unten && rechts) {
                    if (seatPlan[i + 1].charAt(l + 1) != '#') {
                        counter++;
                    }
                } else {
                    nec -= 1;
                }
                if (unten && links) {
                    if (seatPlan[i + 1].charAt(l - 1) != '#') {
                        counter++;
                    }
                } else {
                    nec -= 1;
                }
                if (counter == nec) {
                    newSeat.push('#');
                } else {
                    newSeat.push('L');
                }
            } else if (seatPlan[i].charAt(l) == '.') {
                newSeat.push('.');
            } else if (seatPlan[i].charAt(l) == '#') {
                let oben = i > 0;
                let unten = i < seatPlan.length - 1;
                let rechts = l < seatPlan[i].length - 1;
                let links = l > 0;
                let counter = 0;
                if (unten) {
                    if (seatPlan[i + 1].charAt(l) == '#') {
                        counter++;
                    }
                }
                if (oben) {
                    if (seatPlan[i - 1].charAt(l) == '#') {
                        counter++;
                    }
                }
                if (rechts) {
                    if (seatPlan[i].charAt(l + 1) == '#') {
                        counter++;
                    }
                }
                if (links) {
                    if (seatPlan[i].charAt(l - 1) == '#') {
                        counter++;
                    }
                }
                if (oben && rechts) {
                    if (seatPlan[i - 1].charAt(l + 1) == '#') {
                        counter++;
                    }
                }
                if (oben && links) {
                    if (seatPlan[i - 1].charAt(l - 1) == '#') {
                        counter++;
                    }
                }
                if (unten && rechts) {
                    if (seatPlan[i + 1].charAt(l + 1) == '#') {
                        counter++;
                    }
                }
                if (unten && links) {
                    if (seatPlan[i + 1].charAt(l - 1) == '#') {
                        counter++;
                    }
                }
                if (counter >= 4) {
                    newSeat.push('L');
                } else {
                    newSeat.push('#');
                }
            }
        }
        newSeatPlan.push(newSeat.join(''));
    }
    if (arraysEqual(seatPlan, newSeatPlan)) {
        break;
    } else {
        seatPlan = newSeatPlan;
    }
}
for (let i = 0; i < seatPlan.length; i++) {
    for (let l = 0; l < seatPlan[i].length; l++) {
        if (seatPlan[i].charAt(l) == '#') result++;
    }
}

console.log(result);

function arraysEqual(a, b) {
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

console.timeEnd('Time');