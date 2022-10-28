import { readFileSync } from 'fs';
console.time('Time');

class V3d {
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    x: number;
    y: number;
    z: number;

    sub(rhs: V3d) {
        return new V3d(
            this.x - rhs.x,
            this.y - rhs.y,
            this.z - rhs.z
        );
    }

    add(rhs: V3d) {
        return new V3d(
            this.x + rhs.x,
            this.y + rhs.y,
            this.z + rhs.z
        );
    }

    length() {
        return Math.floor(Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z) * Math.pow(10, 5));
    }

    manhattanDistance(other: V3d) {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y) + Math.abs(this.z - other.z);
    }
}

class Translation {
    movement: V3d;
    rotator: Rotator;
    rotatorIndex: number;

    clone() {
        let newTrans = new Translation();
        newTrans.movement = new V3d(this.movement.x, this.movement.y, this.movement.z);
        newTrans.rotator = rotators[this.rotatorIndex];
        newTrans.rotatorIndex = this.rotatorIndex;
        return newTrans;
    }

    rotate(v: V3d) {
        return this.rotator(v);
    }

    translate(v: V3d) {
        return this.rotate(v).sub(this.movement);
    }

    translateVectors(s: V3d[]) {
        return s.map(v => this.translate(v));
    }
}

class ScannerData {
    beacons: V3d[];
    distances: number[];
    movementToZero: V3d;
    translationToZero: Translation[];

    constructor(beacons: V3d[]) {
        this.beacons = beacons;
        this.distances = this.getDistances(beacons);
        this.movementToZero = new V3d(0, 0, 0);
        this.translationToZero = [];
    }

    getDistances(beacons: V3d[]) {
        let distances: number[] = [];
        for (let i = 0; i < beacons.length - 1; i++) {
            for (let j = i + 1; j < beacons.length; j++) {
                distances.push(beacons[j].sub(beacons[i]).length());
            }
        }
        return distances;
    }
}

type Rotator = (v: V3d) => V3d;

let rotators: Rotator[] = [
    v => new V3d(v.x, v.y, v.z),
    v => new V3d(v.y, -v.x, v.z),
    v => new V3d(-v.x, -v.y, v.z),
    v => new V3d(-v.y, v.x, v.z),

    v => new V3d(-v.x, v.y, -v.z),
    v => new V3d(v.y, v.x, -v.z),
    v => new V3d(v.x, -v.y, -v.z),
    v => new V3d(-v.y, -v.x, -v.z),

    v => new V3d(-v.z, v.y, v.x),
    v => new V3d(v.y, v.z, v.x),
    v => new V3d(v.z, -v.y, v.x),
    v => new V3d(-v.y, -v.z, v.x),

    v => new V3d(v.z, v.y, -v.x),
    v => new V3d(v.y, -v.z, -v.x),
    v => new V3d(-v.z, -v.y, -v.x),
    v => new V3d(-v.y, v.z, -v.x),

    v => new V3d(-v.z, -v.x, v.y),
    v => new V3d(-v.x, v.z, v.y),
    v => new V3d(v.z, v.x, v.y),
    v => new V3d(v.x, -v.z, v.y),

    v => new V3d(v.z, -v.x, -v.y),
    v => new V3d(-v.x, -v.z, -v.y),
    v => new V3d(-v.z, v.x, -v.y),
    v => new V3d(v.x, v.z, -v.y),
];

let input = readFileSync('./input.txt', 'utf-8')
    .split('\r\n\r\n')
    .map(x => x.split('\r\n').slice(1)
        .map(y => y.split(','))
        .map(y => new V3d(parseInt(y[0]), parseInt(y[1]), parseInt(y[2]))))
    .map(x => new ScannerData(x));

solve(input);

let result = 0;
for (let s1 of input) {
    for (let s2 of input) {
        let currentManhattanDistance = s1.movementToZero.manhattanDistance(s2.movementToZero);
        if (currentManhattanDistance > result) result = currentManhattanDistance;
    }
}
console.log(result);

function getRequiredTranslation(s1: ScannerData, s2: ScannerData): (Translation | null) {
    const minEqualDistances = 12 * 11 / 2;
    if (s1.distances.filter(x => s2.distances.includes(x)).length < minEqualDistances) {
        return null;
    }

    for (let s1b of s1.beacons) {
        for (let s2b of s2.beacons) {
            for (let ri = 0; ri < rotators.length; ri++) {
                let s2br = rotators[ri](s2b);
                let translation = new Translation();
                translation.movement = s2br.sub(s1b);
                translation.rotate = rotators[ri];
                translation.rotatorIndex = ri;
                let s2translated = translation.translateVectors(s2.beacons);

                let intersectionSize = 0;
                let checked = 0;
                for (let s2mb of s2translated) {
                    if (s1.beacons.filter(x => x.x == s2mb.x && x.y == s2mb.y && x.z == s2mb.z).length != 0) {
                        intersectionSize++;
                    }
                    checked++;
                    if (s2translated.length - checked + intersectionSize < 12) {
                        break;
                    }
                    if (intersectionSize >= 12) {
                        return translation;
                    }
                }
            }
        }
    }
    return null;
}

function solve(input: ScannerData[]): V3d[] {
    let s: number[] = [];
    for (let i = 1; i < input.length; i++) {
        s.push(i);
    }
    let beacons: V3d[] = input[0].beacons.slice();
    let sNew: number[] = [0];

    while (true) {
        let sNewNew: number[] = [];
        for (let snix of sNew) {
            for (let six of s) {
                let translation = getRequiredTranslation(input[snix], input[six]);
                if (translation) {
                    let translatedBeacons = translation.translateVectors(input[six].beacons);
                    input[six].translationToZero = input[snix].translationToZero.slice();
                    input[six].translationToZero = [translation.clone(), ...input[snix].translationToZero];
                    for (let trans of input[snix].translationToZero) {
                        translation.movement = trans.rotate(translation.movement);
                        translatedBeacons = trans.translateVectors(translatedBeacons);
                    }
                    input[six].movementToZero = input[snix].movementToZero.add(translation.movement);
                    sNewNew.push(six);
                    for (let trans of translatedBeacons) {
                        if (beacons.filter(x => x.x == trans.x && x.y == trans.y && x.z == trans.z).length == 0) {
                            beacons.push(trans);
                        }
                    }
                }
            }
        }
        sNew = sNewNew;
        s = s.filter(x => sNew.filter(y => y == x).length == 0);
        if (s.length == 0) break;
    }
    return beacons;
}

console.timeEnd('Time');