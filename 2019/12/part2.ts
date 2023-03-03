import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/<x=|,\sy=|,\sz=|>/).map(y => parseInt(y)));
let result = 0;

class Moon {
    posX: number;
    posY: number;
    posZ: number;
    velX: number;
    velY: number;
    velZ: number;
}

let moons: Moon[] = [];
for (let i = 0; i < input.length; i++) {
    moons.push({ posX: input[i][1], posY: input[i][2], posZ: input[i][3], velX: 0, velY: 0, velZ: 0 });
}

let states: number[][][] = new Array(4);
let resultsForParameters: number[][] = new Array(4);
for (let i = 0; i < states.length; i++) {
    states[i] = new Array(6);
    resultsForParameters[i] = new Array(6).fill(0);
    for (let l = 0; l < states[i].length; l++) {
        states[i][l] = [];
    }
}

for (let i = 0; resultsForParameters.some(r => r.some(r1 => r1 == 0)); i++) {
    for (let m = 0; m < moons.length; m++) {
        states[m][0].push(moons[m].posX);
        states[m][1].push(moons[m].posY);
        states[m][2].push(moons[m].posZ);
        states[m][3].push(moons[m].velX);
        states[m][4].push(moons[m].velY);
        states[m][5].push(moons[m].velZ);
    }

    applyGravity();
    applyVelocity();

    for (let m = 0; m < moons.length; m++) {
        for (let p = 0; p < 6; p++) {
            if (resultsForParameters[m][p] == 0 && compareArray(states[m][p])) {
                resultsForParameters[m][p] = states[0][0].length / 2;
            }
        }
    }
}

result = lcm([...resultsForParameters[0], ...resultsForParameters[1], ...resultsForParameters[2], ...resultsForParameters[3]]);
console.log(result);

function compareArray(states: number[]): boolean {
    if (states.length <= 5) return false;
    if (states.length % 2 == 1) return false;
    for (let i = 0; i < states.length / 2; i++) {
        if (states[i] != states[i + states.length / 2]) return false;
    }
    return true;
}

function lcm(nums: number[]) {
    let primeNums = new Map<number, number>();
    let lcm = 1;
    for (let i = 0; i < nums.length; i++) {
        let currentNums: number[] = [nums[i]];
        let currentPrimeNums: number[] = [];
        outerLoop: for (let l = 0; currentNums.length > 0; l++) {
            let currentNum = currentNums.shift();
            for (let n = 2; n <= currentNum / 2; n++) {
                if (currentNum % n == 0 && currentNum != n) {
                    currentNums.push(currentNum / n);
                    currentNums.push(n);
                    continue outerLoop;
                }
            }
            currentPrimeNums.push(currentNum);
        }

        for (let l = 0; l < currentPrimeNums.length; l++) {
            let frequencyOfNumber = currentPrimeNums.filter(x => x == currentPrimeNums[l]).length;
            if (!primeNums.get(currentPrimeNums[l]) || primeNums.get(currentPrimeNums[l]) < frequencyOfNumber) {
                primeNums.set(currentPrimeNums[l], frequencyOfNumber);
            }
        }
    }

    for (let [key, value] of primeNums) {
        lcm *= Math.pow(key, value);
    }

    return lcm;
}

function applyVelocity() {
    for (let i = 0; i < moons.length; i++) {
        moons[i].posX += moons[i].velX;
        moons[i].posY += moons[i].velY;
        moons[i].posZ += moons[i].velZ;
    }
}

function applyGravity() {
    for (let i = 0; i < moons.length; i++) {
        for (let l = i + 1; l < moons.length; l++) {
            if (moons[i].posX < moons[l].posX) {
                moons[i].velX++;
                moons[l].velX--;
            } else if (moons[i].posX > moons[l].posX) {
                moons[i].velX--;
                moons[l].velX++;
            }

            if (moons[i].posY < moons[l].posY) {
                moons[i].velY++;
                moons[l].velY--;
            } else if (moons[i].posY > moons[l].posY) {
                moons[i].velY--;
                moons[l].velY++;
            }

            if (moons[i].posZ < moons[l].posZ) {
                moons[i].velZ++;
                moons[l].velZ--;
            } else if (moons[i].posZ > moons[l].posZ) {
                moons[i].velZ--;
                moons[l].velZ++;
            }
        }
    }
}

console.timeEnd('Time');