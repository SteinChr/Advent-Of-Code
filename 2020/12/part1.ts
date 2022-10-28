import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('input.txt', 'utf-8');
let instructions = input.split('\r\n');
let letters = [];
let numbers = [];
let currentNorth = 0;
let currentEast = 0;
let currentDirection = 'east';

for (let i = 0; i < instructions.length; i++) {
    letters.push(instructions[i].charAt(0));
    numbers.push(parseInt(instructions[i].slice(1)));
}

for (let i = 0; i < instructions.length; i++) {
    if (letters[i] == 'N') {
        currentNorth += numbers[i];
    } else if (letters[i] == 'E') {
        currentEast += numbers[i];
    } else if (letters[i] == 'S') {
        currentNorth -= numbers[i];
    } else if (letters[i] == 'W') {
        currentEast -= numbers[i];
    } else if (letters[i] == 'R') {
        if (numbers[i] == 90) {
            if (currentDirection == 'north') {
                currentDirection = 'east';
            } else if (currentDirection == 'east') {
                currentDirection = 'south';
            } else if (currentDirection == 'south') {
                currentDirection = 'west';
            } else if (currentDirection == 'west') {
                currentDirection = 'north';
            }
        } else if (numbers[i] == 180) {
            if (currentDirection == 'north') {
                currentDirection = 'south';
            } else if (currentDirection == 'east') {
                currentDirection = 'west';
            } else if (currentDirection == 'south') {
                currentDirection = 'north';
            } else if (currentDirection == 'west') {
                currentDirection = 'east';
            }
        } else if (numbers[i] == 270) {
            if (currentDirection == 'north') {
                currentDirection = 'west';
            } else if (currentDirection == 'east') {
                currentDirection = 'north';
            } else if (currentDirection == 'south') {
                currentDirection = 'east';
            } else if (currentDirection == 'west') {
                currentDirection = 'south';
            }
        }
    } else if (letters[i] == 'L') {
        if (numbers[i] == 90) {
            if (currentDirection == 'north') {
                currentDirection = 'west';
            } else if (currentDirection == 'east') {
                currentDirection = 'north';
            } else if (currentDirection == 'south') {
                currentDirection = 'east';
            } else if (currentDirection == 'west') {
                currentDirection = 'south';
            }
        } else if (numbers[i] == 180) {
            if (currentDirection == 'north') {
                currentDirection = 'south';
            } else if (currentDirection == 'east') {
                currentDirection = 'west';
            } else if (currentDirection == 'south') {
                currentDirection = 'north';
            } else if (currentDirection == 'west') {
                currentDirection = 'east';
            }
        } else if (numbers[i] == 270) {
            if (currentDirection == 'north') {
                currentDirection = 'east';
            } else if (currentDirection == 'east') {
                currentDirection = 'south';
            } else if (currentDirection == 'south') {
                currentDirection = 'west';
            } else if (currentDirection == 'west') {
                currentDirection = 'north';
            }
        }
    } else if (letters[i] == 'F') {
        if (currentDirection == 'north') {
            currentNorth += numbers[i];
        } else if (currentDirection == 'east') {
            currentEast += numbers[i];
        } else if (currentDirection == 'south') {
            currentNorth -= numbers[i];
        } else if (currentDirection == 'west') {
            currentEast -= numbers[i];
        }
    }
}
let result = Math.abs(currentNorth) + Math.abs(currentEast);
console.log(result);
console.timeEnd('Time');