import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').replace(/\\/g, 'b').split('\r\n').map(x => x.replace(/\s/g, '.')).map(x => x.split(''));

class Cart {
    x: number;
    y: number;
    facingDirection: string;
    nextTurningDirection: string;
    delete: boolean;
}
let carts: Cart[] = readCarts();

while (carts.length > 1) {
    for (let c = 0; c < carts.length && carts.length > 1; c++) {
        let targetPoint: { x: number, y: number } = { x: carts[c].x, y: carts[c].y };
        if (carts[c].facingDirection == 'down') {
            targetPoint.y++;
        } else if (carts[c].facingDirection == 'up') {
            targetPoint.y--;
        } else if (carts[c].facingDirection == 'right') {
            targetPoint.x++;
        } else if (carts[c].facingDirection == 'left') {
            targetPoint.x--;
        }

        if (input[targetPoint.y][targetPoint.x] == '|' || input[targetPoint.y][targetPoint.x] == '-') {
            carts[c].x = targetPoint.x;
            carts[c].y = targetPoint.y;
        } else if (input[targetPoint.y][targetPoint.x] == '/' || input[targetPoint.y][targetPoint.x] == 'b') {
            carts[c].x = targetPoint.x;
            carts[c].y = targetPoint.y;
            carts[c].facingDirection = getNewFacingDirection(carts[c].facingDirection, input[targetPoint.y][targetPoint.x]);
        } else if (input[targetPoint.y][targetPoint.x] == '+') {
            carts[c].x = targetPoint.x;
            carts[c].y = targetPoint.y;
            if (carts[c].nextTurningDirection == 'straight') {
                carts[c].nextTurningDirection = 'right';
            } else {
                carts[c].facingDirection = getNewFacingDirection(carts[c].facingDirection, carts[c].nextTurningDirection);
                if (carts[c].nextTurningDirection == 'left') carts[c].nextTurningDirection = 'straight';
                if (carts[c].nextTurningDirection == 'right') carts[c].nextTurningDirection = 'left';
            }
        }
        checkForCrash();
    }
    deleteCarts();
    carts.sort( compare );
}

console.log(carts[0].x.toString() + ',' + carts[0].y.toString());

function deleteCarts() {
    for (let c = carts.length - 1; c >= 0; c--) {
        if (carts[c].delete) {
            carts.splice(c, 1);
        }
    }
}

function checkForCrash() {
    for (let c1 = 0; c1 < carts.length; c1++) {
        for (let c2 = c1 + 1; c2 < carts.length; c2++) {
            if (carts[c1].x == carts[c2].x && carts[c1].y == carts[c2].y) {
                carts[c1].delete = true;
                carts[c2].delete = true;
            }
        }
    }
}

function getNewFacingDirection(currentFacingDirection: string, change: string): string {
    let newFacingDirection: string = '';

    if (change == '/') {
        if (currentFacingDirection == 'up') newFacingDirection = 'right';
        if (currentFacingDirection == 'down') newFacingDirection = 'left';
        if (currentFacingDirection == 'right') newFacingDirection = 'up';
        if (currentFacingDirection == 'left') newFacingDirection = 'down';
    } else if (change == 'b') {
        if (currentFacingDirection == 'up') newFacingDirection = 'left';
        if (currentFacingDirection == 'down') newFacingDirection = 'right';
        if (currentFacingDirection == 'right') newFacingDirection = 'down';
        if (currentFacingDirection == 'left') newFacingDirection = 'up';
    } else if (change == 'left') {
        if (currentFacingDirection == 'up') newFacingDirection = 'left';
        if (currentFacingDirection == 'down') newFacingDirection = 'right';
        if (currentFacingDirection == 'right') newFacingDirection = 'up';
        if (currentFacingDirection == 'left') newFacingDirection = 'down';
    } else if (change == 'right') {
        if (currentFacingDirection == 'up') newFacingDirection = 'right';
        if (currentFacingDirection == 'down') newFacingDirection = 'left';
        if (currentFacingDirection == 'right') newFacingDirection = 'down';
        if (currentFacingDirection == 'left') newFacingDirection = 'up';
    }

    return newFacingDirection;
}

function readCarts() {
    let carts: Cart[] = [];
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] == 'v') {
                carts.push({ x: x, y: y, facingDirection: 'down', nextTurningDirection: 'left', delete: false });
                input[y][x] = '|';
            } else if (input[y][x] == '^') {
                carts.push({ x: x, y: y, facingDirection: 'up', nextTurningDirection: 'left', delete: false });
                input[y][x] = '|';
            } else if (input[y][x] == '>') {
                carts.push({ x: x, y: y, facingDirection: 'right', nextTurningDirection: 'left', delete: false });
                input[y][x] = '-';
            } else if (input[y][x] == '<') {
                carts.push({ x: x, y: y, facingDirection: 'left', nextTurningDirection: 'left', delete: false });
                input[y][x] = '-';
            }
        }
    }
    return carts;
}

function compare(a, b) {
    if (a.y != b.y) {
        if (a.y < b.y) {
            return -1;
        } else if (a.y > b.y) {
            return 1;
        }
    } else {
        if (a.x < b.x) {
            return -1;
        } else if (a.x > b.x) {
            return 1;
        }
    }
}

console.timeEnd('Time');