import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split(/\r\n|:\s|\s->\s|\s/));
let result = 0;

class Gate {
    inputWire1: string;
    inputWire2: string;
    outputWire: string;
    type: string;
    handeled: boolean;
}

let wires = new Map<string, number>();
let gates: Gate[] = [];

for (let i = 0; i < input[0].length; i += 2) {
    wires.set(input[0][i], parseInt(input[0][i + 1]));
}

for (let i = 0; i < input[1].length; i += 4) {
    gates.push({ inputWire1: input[1][i], inputWire2: input[1][i + 2], outputWire: input[1][i + 3], type: input[1][i + 1], handeled: false });
}

let done = 0;

while (done < gates.length) {
    for (let g = 0; g < gates.length; g++) {
        let newValue = -1;
        if (!gates[g].handeled) {
            if (wires.has(gates[g].inputWire1) && wires.has(gates[g].inputWire2)) {
                if (gates[g].type == 'AND') {
                    if (wires.get(gates[g].inputWire1) == 1 && wires.get(gates[g].inputWire2) == 1) {
                        newValue = 1;
                    } else {
                        newValue = 0;
                    }
                } else if (gates[g].type == 'OR') {
                    if (wires.get(gates[g].inputWire1) == 1 || wires.get(gates[g].inputWire2) == 1) {
                        newValue = 1;
                    } else {
                        newValue = 0;
                    }
                } else if (gates[g].type == 'XOR') {
                    if (wires.get(gates[g].inputWire1) != wires.get(gates[g].inputWire2)) {
                        newValue = 1;
                    } else {
                        newValue = 0;
                    }
                }

                wires.set(gates[g].outputWire, newValue);
                done++;
                gates[g].handeled = true;
            }
        }
    }
}

let bitResult = '';

for (let z = 100; z >= 0; z--) {
    let searchedWire = '';
    if (z < 10) {
        searchedWire = `z0${z}`;
    } else {
        searchedWire = `z${z}`;
    }

    if (wires.has(searchedWire)) bitResult += wires.get(searchedWire);
}

result = parseInt(bitResult, 2);

console.log(result);
console.timeEnd('Time');