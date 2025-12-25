import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split(',').map(x => parseInt(x));
let result = 0;

const showLogsOfIntcode: boolean = false;

class Door {
    dir: string;
    leadsTo: string;
    known: boolean;
}

class Room {
    info: string;
    doors: Door[];
    items: string[];
}

class Droid {
    room: string;
    items: string[];
}

let counter = 0;
let relativeBase = 0;

let itemsBlacklist: string[] = ['escape pod', 'photons', 'infinite loop', 'molten lava', 'giant electromagnet'];
let allCollectableItems: string[] = [];

let rooms = new Map<string, Room>();
let droid: Droid = { room: '', items: [] };
let cameFrom = new Map<string, string>();

let nextInstruction: string = '';
let nextInstructionType: string = 'dir';

let mode: number = 0; // 0 == exploring and collecting all items, 1 == moving to Security Checkpoint, 2 == dropping all items in Security Checkpoint, 3 == getting new item combination, 4 == taking/dropping to have correct items, 5 == try entering

let combinationCounter = 1;
let currentCombination: number[] = [];
let dirToPressureSensitiveFloor = '';

while (true) {
    let instructionsAscii: number[] = [];

    for (let i = 0; i < nextInstruction.length; i++) {
        instructionsAscii.push(nextInstruction[i].charCodeAt(0));
    }

    if (instructionsAscii.length != 0) instructionsAscii.push(10);

    let outAscii = intcode(instructionsAscii);
    let outString: string[] = [];

    for (let i = 0; i < outAscii.length; i++) {
        outString.push(String.fromCharCode(outAscii[i]));
    }

    if (showLogsOfIntcode) console.log(outString.join(''));

    if (nextInstructionType == 'dir') {
        let out = outString.join('').split('\n').filter(x => x != '');
        let roomName = out[0].slice(3, out[0].length - 3);
        out.shift();
        let roomInfo = out.shift();
        out.shift();

        if (mode == 5) {
            if (out[1].startsWith('A loud, robotic voice says "Alert! Droids on this ship are')) {
                mode = 2;
            } else if (out[1].startsWith('A loud, robotic voice says "Analysis complete! You may proceed."')) {
                while (out[0].startsWith('- ')) {
                    out.shift();
                }
                
                if (!showLogsOfIntcode) console.log(out.join('\r\n'));
                result = parseInt(out.join('').split(' ')[43]);
                break;
            }
        }

        if (mode != 5) {
            let doors: Door[] = [];
            while (out[0].startsWith('- ')) {
                if ((nextInstruction == 'north' && out[0].slice(2) == 'south') || (nextInstruction == 'south' && out[0].slice(2) == 'north') || (nextInstruction == 'east' && out[0].slice(2) == 'west') || (nextInstruction == 'west' && out[0].slice(2) == 'east')) {
                    doors.push({ dir: out[0].slice(2), leadsTo: droid.room, known: true });
                } else {
                    doors.push({ dir: out[0].slice(2), leadsTo: '', known: false });
                }

                out.shift();
            }

            let items: string[] = [];
            if (out[0].startsWith('Items')) {
                out.shift();

                while (out[0].startsWith('- ')) {
                    items.push(out[0].slice(2));
                    out.shift();
                }
            }

            if (rooms.has(roomName)) {
                let oldDoors = rooms.get(roomName).doors.slice();
                let newDoors: Door[] = [];

                for (let i = 0; i < oldDoors.length; i++) {
                    if ((nextInstruction == 'north' && oldDoors[i].dir == 'south') || (nextInstruction == 'south' && oldDoors[i].dir == 'north') || (nextInstruction == 'east' && oldDoors[i].dir == 'west') || (nextInstruction == 'west' && oldDoors[i].dir == 'east')) {
                        newDoors.push({ dir: oldDoors[i].dir, leadsTo: droid.room, known: true });
                    } else {
                        newDoors.push(oldDoors[i]);
                    }
                }

                rooms.set(roomName, { info: roomInfo, doors: newDoors, items: items });
            } else {
                rooms.set(roomName, { info: roomInfo, doors: doors, items: items });
            }

            let oldRoom = rooms.get(droid.room);

            for (let i = 0; oldRoom && i < oldRoom.doors.length; i++) {
                if (oldRoom.doors[i].dir == nextInstruction) {
                    oldRoom.doors[i].leadsTo = roomName;
                    oldRoom.doors[i].known = true;
                }
            }

            droid.room = roomName;
            if (!cameFrom.has(roomName)) cameFrom.set(roomName, nextInstruction);
        }
    } else if (nextInstructionType == 'take') {
        let currentRoom = rooms.get(droid.room);
        let newItems: string[] = [];

        for (let i = 0; i < currentRoom.items.length; i++) {
            if (nextInstruction.slice(5) != currentRoom.items[i]) newItems.push(currentRoom.items[i]);
        }

        rooms.set(droid.room, { info: currentRoom.info, doors: currentRoom.doors, items: newItems });
        droid.items.push(nextInstruction.slice(5));
        if (!allCollectableItems.includes(nextInstruction.slice(5))) allCollectableItems.push(nextInstruction.slice(5));
    } else if (nextInstructionType == 'drop') {
        let currentRoom = rooms.get(droid.room);

        for (let i = 0; i < droid.items.length; i++) {
            if (droid.items[i] == nextInstruction.slice(5)) {
                droid.items.splice(i, 1);
                rooms.set(droid.room, { info: currentRoom.info, doors: currentRoom.doors, items: [...currentRoom.items, nextInstruction.slice(5)] });
            }
        }
    }

    if (mode == 0) {
        let unknownDoors: boolean = false;

        rooms.forEach((value, key) => {
            for (let i = 0; i < value.doors.length; i++) {
                if (key != 'Security Checkpoint' && !value.doors[i].known) unknownDoors = true;
            }
        });

        if (!unknownDoors) {
            mode = 1;
            rooms.forEach((value, key) => {
                for (let i = 0; i < value.doors.length; i++) {
                    value.doors[i].known = false;
                }
            });
        }
    }

    if (mode == 1 && droid.room == 'Security Checkpoint') mode = 2;

    if (mode <= 1) {
        let currentRoom = rooms.get(droid.room);
        nextInstruction = '';

        for (let i = 0; i < currentRoom.items.length; i++) {
            if (!itemsBlacklist.includes(currentRoom.items[i])) {
                nextInstruction = 'take ' + currentRoom.items[i];
                nextInstructionType = 'take';
                break;
            }
        }

        if (nextInstruction == '') {
            for (let i = 0; i < currentRoom.doors.length; i++) {
                if (!currentRoom.doors[i].known) {
                    nextInstruction = currentRoom.doors[i].dir;
                    nextInstructionType = 'dir';
                    break;
                }
            }
        }

        if (nextInstruction == '' || droid.room == 'Security Checkpoint') {
            nextInstruction = cameFrom.get(droid.room);
            nextInstructionType = 'dir';

            if (nextInstruction == 'north') {
                nextInstruction = 'south';
            } else if (nextInstruction == 'south') {
                nextInstruction = 'north';
            } else if (nextInstruction == 'east') {
                nextInstruction = 'west';
            } else if (nextInstruction == 'west') {
                nextInstruction = 'east';
            }
        }
    } else if (mode == 2) {
        if (droid.items.length != 0) {
            nextInstruction = 'drop ' + droid.items[0];
            nextInstructionType = 'drop';
        } else {
            mode = 3;
        }
    }

    if (mode == 3) {
        currentCombination = (combinationCounter).toString(2).padStart(allCollectableItems.length, '0').split('').map(x => parseInt(x));
        combinationCounter++;
        mode = 4;
    }

    if (mode == 4) {
        let itemsCorrect: boolean = true;

        for (let i = 0; i < allCollectableItems.length; i++) {
            if (currentCombination[i] == 1 && !droid.items.includes(allCollectableItems[i])) {
                nextInstruction = 'take ' + allCollectableItems[i];
                nextInstructionType = 'take';
                itemsCorrect = false;
                break;
            }
        }

        if (itemsCorrect) {
            if (dirToPressureSensitiveFloor == '') {
                let currentRoom = rooms.get(droid.room);

                for (let i = 0; i < currentRoom.doors.length; i++) {
                    if (currentRoom.doors[i].leadsTo == '') dirToPressureSensitiveFloor = currentRoom.doors[i].dir;
                }
            }

            nextInstruction = dirToPressureSensitiveFloor;
            nextInstructionType = 'dir';

            mode = 5;
        }
    }
}

console.log(result);

function intcode(userInputs: number[]): number[] {
    let userInputCounter = 0;
    let output: number[] = [];

    while (true) {
        let opcode = input[counter] % 100;
        let parameterMode1 = Math.floor(input[counter] / 100) % 10;
        let parameterMode2 = Math.floor(input[counter] / 1000) % 10;
        let parameterMode3 = Math.floor(input[counter] / 10000) % 10;

        let parameter1 = 0;
        let parameter2 = 0;

        if (parameterMode1 == 0) {
            parameter1 = input[input[counter + 1]];
        } else if (parameterMode1 == 1) {
            parameter1 = input[counter + 1];
        } else if (parameterMode1 == 2) {
            parameter1 = input[input[counter + 1] + relativeBase];
        }

        if (parameterMode2 == 0) {
            parameter2 = input[input[counter + 2]];
        } else if (parameterMode2 == 1) {
            parameter2 = input[counter + 2];
        } else if (parameterMode2 == 2) {
            parameter2 = input[input[counter + 2] + relativeBase];
        }

        if (parameter1 == null) parameter1 = 0;
        if (parameter2 == null) parameter2 = 0;
        if (input[input[counter + 3]] == null) input[input[counter + 3]] = 0;

        if (opcode == 1) {
            input[input[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = parameter1 + parameter2;
            counter += 4;
        } else if (opcode == 2) {
            input[input[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = parameter1 * parameter2;
            counter += 4;
        } else if (opcode == 3) {
            if (userInputCounter >= userInputs.length) return output;
            input[input[counter + 1] + (parameterMode1 == 2 ? relativeBase : 0)] = userInputs[userInputCounter];
            userInputCounter++;
            counter += 2;
        } else if (opcode == 4) {
            output.push(parameter1);
            counter += 2;
        } else if (opcode == 5) {
            if (parameter1 != 0) {
                counter = parameter2;
            } else {
                counter += 3;
            }
        } else if (opcode == 6) {
            if (parameter1 == 0) {
                counter = parameter2;
            } else {
                counter += 3;
            }
        } else if (opcode == 7) {
            if (parameter1 < parameter2) {
                input[input[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = 1;
            } else {
                input[input[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = 0;
            }
            counter += 4;
        } else if (opcode == 8) {
            if (parameter1 == parameter2) {
                input[input[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = 1;
            } else {
                input[input[counter + 3] + (parameterMode3 == 2 ? relativeBase : 0)] = 0;
            }
            counter += 4;
        } else if (opcode == 9) {
            relativeBase += parameter1;
            counter += 2;
        } else if (opcode == 99) {
            return output;
        }
    }
}

console.timeEnd('Time');