import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let binary = '';
for (let i = 0; i < input.length; i++) {
    binary += parseInt(input.charAt(i), 16).toString(2).padStart(4, '0');
}
let result = 0;
result = explorePacket(binary).value;
console.log(result);

function explorePacket(value: string): { packet: string, value: number } {
    let typeID = parseInt(value.substring(3, 6), 2);
    let currentResult = 0;
    if (typeID == 4) {
        let literal = '';
        let lastPosition = -1;
        for (let i = 6; i < value.length; i += 5) {
            literal += value.substring(i + 1, i + 5);
            if (value.charAt(i) == '0') {
                lastPosition = i + 5;
                break;
            }
        }
        return { packet: value.substring(0, lastPosition), value: parseInt(literal, 2) };
    } else {
        let lengthTypeID = value.substring(6, 7);
        let subPackets = [];
        let startingPoint = -1;
        if (lengthTypeID == '0') {
            startingPoint = 22;
            let lengthOfSubPackets = parseInt(value.substr(7, 15), 2);
            while (lengthOfSubPackets > subPackets.map(x => x.packet).join().length) {
                let currentSubPacket = explorePacket(value.substring(startingPoint));
                subPackets.push(currentSubPacket);
                startingPoint += currentSubPacket.packet.length;
            }
        } else {
            startingPoint = 18;
            let numberOfSubPackets = parseInt(value.substr(7, 11), 2);
            while (numberOfSubPackets > subPackets.length) {
                let currentSubPacket = explorePacket(value.substring(startingPoint));
                subPackets.push(currentSubPacket);
                startingPoint += currentSubPacket.packet.length;
            }
        }
        if (typeID == 0) {
            currentResult = subPackets.map(x => x.value).reduce((a, b) => a + b, 0);
        } else if (typeID == 1) {
            currentResult = subPackets.map(x => x.value).reduce((a, b) => a * b, 1);
        } else if (typeID == 2) {
            currentResult = Math.min(...subPackets.map(x => x.value));
        } else if (typeID == 3) {
            currentResult = Math.max(...subPackets.map(x => x.value));
        } else if (typeID == 5) {
            if (subPackets[0].value > subPackets[1].value) {
                currentResult = 1;
            } else {
                currentResult = 0;
            }
        } else if (typeID == 6) {
            if (subPackets[0].value < subPackets[1].value) {
                currentResult = 1;
            } else {
                currentResult = 0;
            }
        } else if (typeID == 7) {
            if (subPackets[0].value == subPackets[1].value) {
                currentResult = 1;
            } else {
                currentResult = 0;
            }
        }
        return { packet: value.substring(0, startingPoint), value: currentResult };
    }
}
console.timeEnd('Time');