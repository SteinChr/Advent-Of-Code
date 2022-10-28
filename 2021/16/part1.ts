import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let binary = '';
for (let i = 0; i < input.length; i++) {
    binary += parseInt(input.charAt(i), 16).toString(2).padStart(4, '0');
}
let result = 0;
explorePacket(binary);
console.log(result);

function explorePacket(value: string): string {
    let version = parseInt(value.substring(0, 3), 2);
    let typeID = parseInt(value.substring(3, 6), 2);
    result += version;
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
        return value.substring(0, lastPosition);
    } else {
        let lengthTypeID = value.substring(6, 7);
        let subPackets = [];
        let startingPoint = -1;
        if (lengthTypeID == '0') {
            startingPoint = 22;
            let lengthOfSubPackets = parseInt(value.substr(7, 15), 2);
            while (lengthOfSubPackets > subPackets.join().length) {
                let currentSubPacket = explorePacket(value.substring(startingPoint))
                subPackets.push(currentSubPacket);
                startingPoint += currentSubPacket.length;
            }
        } else {
            startingPoint = 18;
            let numberOfSubPackets = parseInt(value.substr(7, 11), 2);
            while (numberOfSubPackets > subPackets.length) {
                let currentSubPacket = explorePacket(value.substring(startingPoint))
                subPackets.push(currentSubPacket);
                startingPoint += currentSubPacket.length;
            }
        }
        return value.substring(0, startingPoint);
    }
}
console.timeEnd('Time');