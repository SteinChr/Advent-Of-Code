import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split(/\r\n|:\s|\s->\s|\s/));
let result = '';

class Gate {
    input1Index: number;
    input2Index: number;
    outputIndex: number;
    operation: number; // AND = 0, OR = 1, XOR = 2
}

class GateForOriginalCheck {
    inputWire1: string;
    inputWire2: string;
    outputWire: string;
    type: string;
    handeled: boolean;
}

let gates: Gate[] = [];
let statusOfWires: number[] = [];

let dictWireToIndex = new Map<string, number>();
let dictIndexToWire = new Map<number, string>();
let index = 0;

for (let i = 0; i < input[0].length; i += 2) {
    dictWireToIndex.set(input[0][i], index);
    dictIndexToWire.set(index, input[0][i]);
    statusOfWires.push(parseInt(input[0][i + 1]));
    index++;
}

let bitCount = index / 2;
let offset = bitCount * 2;

for (let z = 0; z <= bitCount; z++) {
    dictWireToIndex.set(z >= 10 ? `z${z}` : `z0${z}`, index);
    dictIndexToWire.set(index, z >= 10 ? `z${z}` : `z0${z}`);
    statusOfWires.push(-1);
    index++;
}

for (let i = 0; i < input[1].length; i += 4) {
    if (!dictWireToIndex.has(input[1][i])) {
        dictWireToIndex.set(input[1][i], index);
        dictIndexToWire.set(index, input[1][i]);
        statusOfWires.push(-1);
        index++;
    }

    if (!dictWireToIndex.has(input[1][i + 2])) {
        dictWireToIndex.set(input[1][i + 2], index);
        dictIndexToWire.set(index, input[1][i + 2]);
        statusOfWires.push(-1);
        index++;
    }

    if (!dictWireToIndex.has(input[1][i + 3])) {
        dictWireToIndex.set(input[1][i + 3], index);
        dictIndexToWire.set(index, input[1][i + 3]);
        statusOfWires.push(-1);
        index++;
    }

    gates.push({ input1Index: dictWireToIndex.get(input[1][i]), input2Index: dictWireToIndex.get(input[1][i + 2]), outputIndex: dictWireToIndex.get(input[1][i + 3]), operation: input[1][i + 1] == 'AND' ? 0 : (input[1][i + 1] == 'OR' ? 1 : 2) });
}

let gatesByOutput = new Map<number, Gate>();
for (let i = 0; i < gates.length; i++) {
    gatesByOutput.set(gates[i].outputIndex, gates[i]);
}

let gatesByInput = new Map<number, Gate[]>();
for (let i = 0; i < gates.length; i++) {
    if (gatesByInput.has(gates[i].input1Index)) {
        gatesByInput.set(gates[i].input1Index, [...gatesByInput.get(gates[i].input1Index), gates[i]]);
    } else {
        gatesByInput.set(gates[i].input1Index, [gates[i]]);
    }

    if (gatesByInput.has(gates[i].input2Index)) {
        gatesByInput.set(gates[i].input2Index, [...gatesByInput.get(gates[i].input2Index), gates[i]]);
    } else {
        gatesByInput.set(gates[i].input2Index, [gates[i]]);
    }
}

let { candidatePairs, operations } = findErrors();
let pairsForRandomTests = trySwaps(candidatePairs, operations);
let pairsForOriginalInputTest: string[][][] = [];

for (let i = 0; i < pairsForRandomTests.length; i++) {
    if (checkWithRandomTests(pairsForRandomTests[i])) pairsForOriginalInputTest.push(getWireNames(pairsForRandomTests[i]));
}

for (let i = 0; i < pairsForOriginalInputTest.length; i++) {
    if (checkWithOriginalInput(pairsForOriginalInputTest[i])) result = formatAnswer(pairsForOriginalInputTest[i]);
}

console.log(result);

function reset() {
    for (let i = 0; i < statusOfWires.length; i++) {
        if (i < bitCount * 2) {
            statusOfWires[i] = 0;
        } else {
            statusOfWires[i] = -1;
        }
    }
}

function setInputs(x: BigInt, y: BigInt) {
    let xBinary = x.toString(2);
    let yBinary = y.toString(2);

    let count = 0;

    for (let i = xBinary.length - 1; i >= 0; i--) {
        if (xBinary[i] == '1') {
            statusOfWires[count] = 1;
        }

        count++;
    }

    count = bitCount;

    for (let i = yBinary.length - 1; i >= 0; i--) {
        if (yBinary[i] == '1') {
            statusOfWires[count] = 1;
        }

        count++;
    }
}

function compute(index) {
    if (statusOfWires[index] == -2) {
        return -2;
    } else if (statusOfWires[index] == -1) {
        let gateToCompute = gatesByOutput.get(index);
        statusOfWires[index] = -2;

        let valueOfInputGate1 = compute(gateToCompute.input1Index);
        let valueOfInputGate2 = compute(gateToCompute.input2Index);
        let output = -1;

        if (gateToCompute.operation == 0) {
            if (valueOfInputGate1 == 1 && valueOfInputGate2 == 1) {
                output = 1;
            } else {
                output = 0;
            }
        } else if (gateToCompute.operation == 1) {
            if (valueOfInputGate1 == 1 || valueOfInputGate2 == 1) {
                output = 1;
            } else {
                output = 0;
            }
        } else if (gateToCompute.operation == 2) {
            if (valueOfInputGate1 != valueOfInputGate2) {
                output = 1;
            } else {
                output = 0;
            }
        }

        statusOfWires[index] = output;
        return output;
    } else {
        return statusOfWires[index];
    }
}

function computeAllZ() {
    for (let bit = 0; bit < bitCount; bit++) {
        compute(offset + bit);
    }
}

function testSingleOperation(bit: number, opIndex: number): boolean {
    reset();

    if (opIndex == 1) setInputs(BigInt(1) << BigInt(bit), BigInt(0));
    if (opIndex == 2) setInputs(BigInt(0), BigInt(1) << BigInt(bit));
    if (opIndex == 3) setInputs(BigInt(1) << BigInt(bit), BigInt(1) << BigInt(bit));

    let zIndex = opIndex == 3 ? bitCount * 2 + bit + 1 : bitCount * 2 + bit;
    computeAllZ();

    return statusOfWires[zIndex] == 1;
}

function countErrors() {
    let errors = 0;

    for (let b = 0; b <= bitCount - 2; b++) {
        for (let i = 1; i <= 3; i++) {
            if (testSingleOperation(b, i) == false) errors++;
        }
    }

    return errors;
}

function testAllBits() {
    for (let b = 0; b <= bitCount - 2; b++) {
        for (let i = 1; i <= 3; i++) {
            if (testSingleOperation(b, i) == false) return false;
        }
    }

    return true;
}

function reachableOutputs(startIndex): Set<number> {
    let seen = new Set<number>();

    let gatesToCheck: Gate[] = [gatesByOutput.get(startIndex)];

    if (gatesToCheck[0] == undefined) return seen;

    while (gatesToCheck.length != 0) {
        let currentGate = gatesToCheck.pop();

        if (seen.has(currentGate.outputIndex)) continue;
        seen.add(currentGate.outputIndex);

        let newGate = gatesByOutput.get(currentGate.input1Index);
        if (newGate != undefined && !seen.has(newGate.outputIndex)) gatesToCheck.push(newGate);

        newGate = gatesByOutput.get(currentGate.input2Index);
        if (newGate != undefined && !seen.has(newGate.outputIndex)) gatesToCheck.push(newGate);
    }

    return seen;
}

function swapOutputs(output1, output2) {
    let gate1 = gatesByOutput.get(output1);
    let gate2 = gatesByOutput.get(output2);

    if (!gate1 || !gate2) return;

    gatesByOutput.set(output1, gate2);
    gatesByOutput.set(output2, gate1);

    let temp = gate1.outputIndex;
    gate1.outputIndex = gate2.outputIndex;
    gate2.outputIndex = temp;
}

function findErrors() {
    let candidatePairStrings = new Set<string>();
    let operations = new Set<string>();
    let reachableCache = new Map<number, Set<number>>();

    let currentErrorCount = countErrors();

    for (let b = 0; b <= bitCount - 2; b++) {
        for (let opIndex = 1; opIndex <= 3; opIndex++) {
            reset();

            if (opIndex == 1) {
                setInputs(BigInt(1) << BigInt(b), BigInt(0));
            } else if (opIndex == 2) {
                setInputs(BigInt(0), BigInt(1) << BigInt(b));
            } else if (opIndex == 3) {
                setInputs(BigInt(1) << BigInt(b), BigInt(1) << BigInt(b));
            }

            let finish = opIndex == 3 ? offset + b + 1 : offset + b;
            computeAllZ();

            if (statusOfWires[finish] != 1) {
                operations.add(`${b}:${opIndex}`);

                let trueOutputs: number[] = [];

                for (let i = offset; i < statusOfWires.length; i++) {
                    if (statusOfWires[i] == 1) trueOutputs.push(i);
                }

                let reachable = reachableCache.get(finish) ? reachableCache.get(finish) : reachableOutputs(finish);
                if (!reachableCache.has(finish)) reachableCache.set(finish, reachable);

                for (let o1 of reachable) {
                    for (let o2 of trueOutputs) {
                        if (o1 == o2) continue;

                        try {
                            swapOutputs(o1, o2);

                            if (testSingleOperation(b, opIndex) && countErrors() < currentErrorCount) {
                                let pairKey = o1 < o2 ? `${o1},${o2}` : `${o2},${o1}`;
                                candidatePairStrings.add(pairKey);
                            }
                        } finally {
                            swapOutputs(o1, o2);
                        }
                    }
                }
            }
        }
    }

    let candidatePairs = [];
    for (let cps of candidatePairStrings) {
        let [a, b] = cps.split(',').map(Number);
        candidatePairs.push([a, b]);
    }

    return { candidatePairs, operations: Array.from(operations) };
}

function trySwaps(candidatePairs: number[][], operations: string[]): number[][][] {
    let candidatePairsLength = candidatePairs.length;

    let goodCandidatePairs: number[][][] = [];

    for (let a = 0; a <= candidatePairsLength - 4; a++) {
        for (let b = a + 1; b <= candidatePairsLength - 3; b++) {
            for (let c = b + 1; c <= candidatePairsLength - 2; c++) {
                for (let d = c + 1; d <= candidatePairsLength - 1; d++) {
                    let pairs = [candidatePairs[a], candidatePairs[b], candidatePairs[c], candidatePairs[d]];

                    let outputsSet = new Set<number>();
                    for (let p of pairs) {
                        outputsSet.add(p[0]);
                        outputsSet.add(p[1]);
                    }

                    if (outputsSet.size == 8) {
                        try {
                            for (let p of pairs) {
                                swapOutputs(p[0], p[1]);
                            }

                            let ok: boolean = true;
                            for (let op of operations) {
                                let [bit, opIndex] = op.split(':').map(s => Number(s));

                                try {
                                    if (!testSingleOperation(bit, opIndex)) {
                                        ok = false;
                                        break;
                                    }
                                } catch {
                                    ok = false;
                                    break;
                                }
                            }

                            if (ok) {
                                try {
                                    if (!testAllBits()) {
                                        continue;
                                    }
                                } catch {
                                    continue;
                                }

                                goodCandidatePairs.push(pairs);
                            }
                        } finally {
                            for (let i = pairs.length - 1; i >= 0; i--) {
                                swapOutputs(pairs[i][0], pairs[i][1]);
                            }
                        }
                    }
                }
            }
        }
    }

    return goodCandidatePairs;
}

function getZOutput(input1: BigInt, input2: BigInt): BigInt {
    reset();
    setInputs(input1, input2);
    computeAllZ();

    let z = 0n;

    for (let b = 0; b < bitCount; b++) {
        if (statusOfWires[offset + b] == 1) {
            z |= (1n << BigInt(b));
        }
    }

    return z;
}

function checkWithRandomTests(pairs: number[][]): boolean {
    let randomTests = [[0n, 0n], [1n, 1n], [2n, 3n], [(1n << 20n) - 1n, 1n], [(1n << 40n) - 1n, (1n << 40n) - 1n], [123456789n, 987654321n]];

    for (let [a, b] of pairs) {
        swapOutputs(a, b);
    }

    let success: boolean = true;

    for (let [i1, i2] of randomTests) {
        let output = getZOutput(i1, i2);

        if (output != i1 + i2) {
            success = false;
            break;
        }
    }

    for (let i = pairs.length - 1; i >= 0; i--) {
        swapOutputs(pairs[i][0], pairs[i][1]);
    }

    return success;
}

function getWireNames(pairsIndexes: number[][]): string[][] {
    let pairsNames: string[][] = [];

    for (let i = 0; i < pairsIndexes.length; i++) {
        pairsNames.push([dictIndexToWire.get(pairsIndexes[i][0]), dictIndexToWire.get(pairsIndexes[i][1])]);
    }

    return pairsNames;
}

function checkWithOriginalInput(pairsToCheck: string[][]) {
    let wires = new Map<string, number>();
    let gates: GateForOriginalCheck[] = [];

    for (let i = 0; i < input[0].length; i += 2) {
        wires.set(input[0][i], parseInt(input[0][i + 1]));
    }

    for (let i = 0; i < input[1].length; i += 4) {
        let outputWire: string = input[1][i + 3];
        for (let l = 0; l < pairsToCheck.length; l++) {
            if (outputWire == pairsToCheck[l][0]) {
                outputWire = pairsToCheck[l][1];
            } else if (outputWire == pairsToCheck[l][1]) {
                outputWire = pairsToCheck[l][0];
            }
        }

        gates.push({ inputWire1: input[1][i], inputWire2: input[1][i + 2], outputWire: outputWire, type: input[1][i + 1], handeled: false });
    }

    let done = 0;
    let oldDone = -1;

    while (done < gates.length) {
        if (oldDone == done) return false;
        oldDone = done;

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

    let xBinary = '';
    let yBinary = '';
    let zBinary = '';

    for (let i = bitCount; i >= 0; i--) {
        let searchedXWire = '';
        let searchedYWire = '';
        let searchedZWire = '';

        if (i < 10) {
            searchedXWire = `x0${i}`;
            searchedYWire = `y0${i}`;
            searchedZWire = `z0${i}`;
        } else {
            searchedXWire = `x${i}`;
            searchedYWire = `y${i}`
            searchedZWire = `z${i}`;
        }

        if (wires.has(searchedXWire)) xBinary += wires.get(searchedXWire);
        if (wires.has(searchedYWire)) yBinary += wires.get(searchedYWire);
        if (wires.has(searchedZWire)) zBinary += wires.get(searchedZWire);
    }

    if (parseInt(xBinary, 2) + parseInt(yBinary, 2) == parseInt(zBinary, 2)) {
        return true;
    } else {
        return false;
    }
}

function formatAnswer(pairs: string[][]): string {
    let names: string[] = [];

    for (let pair of pairs) {
        names.push(pair[0]);
        names.push(pair[1]);
    }

    names.sort();

    return names.join(',');
}

console.timeEnd('Time');