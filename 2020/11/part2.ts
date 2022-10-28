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
                let counter = 0;
                let nec = 8;
                let index = 0;
                while (true) {
                    index++;
                    let unten = i < seatPlan.length - index;
                    if (unten) {
                        if (seatPlan[i + index].charAt(l) == '#') {
                            break;
                        } else if (seatPlan[i + index].charAt(l) == 'L') {
                            counter++;
                            break;
                        }
                    } else {
                        nec -= 1;
                        break;
                    }
                }
                index = 0;
                while (true) {
                    index++;
                    let oben = i > (index - 1);
                    if (oben) {
                        if (seatPlan[i - index].charAt(l) == '#') {
                            break;
                        } else if (seatPlan[i - index].charAt(l) == 'L') {
                            counter++;
                            break;
                        }
                    } else {
                        nec -= 1;
                        break;
                    }
                }
                index = 0;
                while (true) {
                    index++;
                    let rechts = l < seatPlan[i].length - index;
                    if (rechts) {
                        if (seatPlan[i].charAt(l + index) == '#') {
                            break;
                        } else if (seatPlan[i].charAt(l + index) == 'L') {
                            counter++;
                            break;
                        }
                    } else {
                        nec -= 1;
                        break;
                    }
                }
                index = 0;
                while (true) {
                    index++;
                    let links = l > (index - 1);
                    if (links) {
                        if (seatPlan[i].charAt(l - index) == '#') {
                            break;
                        } else if (seatPlan[i].charAt(l - index) == 'L') {
                            counter++;
                            break;
                        }
                    } else {
                        nec -= 1;
                        break;
                    }
                }
                index = 0;
                while (true) {
                    index++;
                    let oben = i > (index - 1);
                    let rechts = l < seatPlan[i].length - index;
                    if (oben && rechts) {
                        if (seatPlan[i - index].charAt(l + index) == '#') {
                            break;
                        } else if (seatPlan[i - index].charAt(l + index) == 'L') {
                            counter++;
                            break;
                        }
                    } else {
                        nec -= 1;
                        break;
                    }
                }
                index = 0;
                while (true) {
                    index++;
                    let oben = i > (index - 1);
                    let links = l > (index - 1);
                    if (oben && links) {
                        if (seatPlan[i - index].charAt(l - index) == '#') {
                            break;
                        } else if (seatPlan[i - index].charAt(l - index) == 'L') {
                            counter++;
                            break;
                        }
                    } else {
                        nec -= 1;
                        break;
                    }
                }
                index = 0;
                while (true) {
                    index++;
                    let unten = i < seatPlan.length - index;
                    let rechts = l < seatPlan[i].length - index;
                    if (unten && rechts) {
                        if (seatPlan[i + index].charAt(l + index) == '#') {
                            break;
                        } else if (seatPlan[i + index].charAt(l + index) == 'L') {
                            counter++;
                            break;
                        }
                    } else {
                        nec -= 1;
                        break;
                    }
                }
                index = 0;
                while (true) {
                    index++;
                    let unten = i < seatPlan.length - index;
                    let links = l > (index - 1);
                    if (unten && links) {
                        if (seatPlan[i + index].charAt(l - index) == '#') {
                            break;
                        } else if (seatPlan[i + index].charAt(l - index) == 'L') {
                            counter++;
                            break;
                        }
                    } else {
                        nec -= 1;
                        break;
                    }
                }
                if (counter == nec) {
                    newSeat.push('#');
                } else {
                    newSeat.push('L');
                }
            } else if (seatPlan[i].charAt(l) == '.') {
                newSeat.push('.');
            } else if (seatPlan[i].charAt(l) == '#') {
                let index = 0;
                let counter = 0;
                while (true) {
                    index++;
                    let unten = i < seatPlan.length - index;
                    if (unten) {
                        if (seatPlan[i + index].charAt(l) == '#') {
                            counter++;
                            break;
                        } else if (seatPlan[i + index].charAt(l) == 'L') {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                index = 0;
                while (true) {
                    index++;
                    let oben = i > (index - 1);
                    if (oben) {
                        if (seatPlan[i - index].charAt(l) == '#') {
                            counter++;
                            break;
                        } else if (seatPlan[i - index].charAt(l) == 'L') {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                index = 0;
                while (true) {
                    index++;
                    let rechts = l < seatPlan[i].length - index;
                    if (rechts) {
                        if (seatPlan[i].charAt(l + index) == '#') {
                            counter++;
                            break;
                        } else if (seatPlan[i].charAt(l + index) == 'L') {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                index = 0;
                while (true) {
                    index++;
                    let links = l > (index - 1);
                    if (links) {
                        if (seatPlan[i].charAt(l - index) == '#') {
                            counter++;
                            break;
                        } else if (seatPlan[i].charAt(l - index) == 'L') {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                index = 0;
                while (true) {
                    index++;
                    let oben = i > (index - 1);
                    let rechts = l < seatPlan[i].length - index;
                    if (oben && rechts) {
                        if (seatPlan[i - index].charAt(l + index) == '#') {
                            counter++;
                            break;
                        } else if (seatPlan[i - index].charAt(l + index) == 'L') {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                index = 0;
                while (true) {
                    index++;
                    let oben = i > (index - 1);
                    let links = l > (index - 1);
                    if (oben && links) {
                        if (seatPlan[i - index].charAt(l - index) == '#') {
                            counter++;
                            break;
                        } else if (seatPlan[i - index].charAt(l - index) == 'L') {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                index = 0;
                while (true) {
                    index++;
                    let unten = i < seatPlan.length - index;
                    let rechts = l < seatPlan[i].length - index;
                    if (unten && rechts) {
                        if (seatPlan[i + index].charAt(l + index) == '#') {
                            counter++;
                            break;
                        } else if (seatPlan[i + index].charAt(l + index) == 'L') {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                index = 0;
                while (true) {
                    index++;
                    let unten = i < seatPlan.length - index;
                    let links = l > (index - 1);
                    if (unten && links) {
                        if (seatPlan[i + index].charAt(l - index) == '#') {
                            counter++;
                            break;
                        } else if (seatPlan[i + index].charAt(l - index) == 'L') {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                if (counter >= 5) {
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