import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n').map(x => x.split(',').map(y => parseInt(y)));
let result = 0;

class Coord {
    x: number;
    y: number;
    z: number;
}

class Distance {
    distance: number;
    id1: number;
    id2: number;
}

let coords = new Map<number, Coord>();

for (let i = 0; i < input.length; i++) {
    coords.set(i, { x: input[i][0], y: input[i][1], z: input[i][2] });
}

let circuits: number[][] = [];

for (let c = 0; c < input.length; c++) {
    circuits.push([c]);
}

let lastSmallestDistance = 0;

while (true) {
    let smallestDistance: Distance = { distance: Number.MAX_VALUE, id1: -1, id2: -1 };

    for (let i = 0; i < input.length; i++) {
        for (let l = i + 1; l < input.length; l++) {
            let distance = getDistance(coords.get(i), coords.get(l));

            if (distance < smallestDistance.distance && distance > lastSmallestDistance) {
                smallestDistance.distance = distance;
                smallestDistance.id1 = i;
                smallestDistance.id2 = l;
            }
        }
    }

    outerLoop: for (let c1 = 0; c1 < circuits.length; c1++) {
        if (circuits[c1].includes(smallestDistance.id1)) {
            for (let c2 = 0; c2 < circuits.length; c2++) {
                if (c1 != c2 && circuits[c2].includes(smallestDistance.id2)) {
                    for (let i = 0; i < circuits[c2].length; i++) {
                        circuits[c1].push(circuits[c2][i]);
                    }

                    circuits.splice(c2, 1);

                    break outerLoop;
                }
            }
        }
    }

    lastSmallestDistance = smallestDistance.distance;

    if (circuits.length == 1) {
        result = coords.get(smallestDistance.id1).x * coords.get(smallestDistance.id2).x;
        break;
    }

}

console.log(result);

function getDistance(c1: Coord, c2: Coord): number {
    return Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2) + Math.pow(c1.z - c2.z, 2));
}

console.timeEnd('Time');