import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(/<x=|,\sy=|,\sz=|>/).map(y => parseInt(y)));

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

for (let i = 0; i < 1000; i++) {
    applyGravity();
    applyVelocity();
}

console.log(calculateEnergy());

function calculateEnergy(): number {
    let energy = 0;
    for (let i = 0; i < moons.length; i++) {
        energy += (Math.abs(moons[i].posX) + Math.abs(moons[i].posY) + Math.abs(moons[i].posZ)) * (Math.abs(moons[i].velX) + Math.abs(moons[i].velY) + Math.abs(moons[i].velZ));
    }
    return energy;
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