import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(x => x.split('\r\n').slice(1));
let result = 0;

class Group {
    army: string;
    numberOfUnits: number;
    hitPoints: number;
    immunities: string[];
    weaknesses: string[];
    attackDamage: number;
    attackType: string;
    initiative: number;
    effectivePower: number;
    target: number;
    uniqueIndex: number;
}

class Target {
    index: number;
    damage: number;
    uniqueIndex: number;
}

let armies: Group[] = [];
let success: boolean = false;

for (let boost = 0; !success; boost++) {
    armies = [];
    readInput();
    for (let i = 0; i < armies.length; i++) {
        if (armies[i].army == 'immuneSystem') armies[i].attackDamage += boost;
    }
    updateEffectivePower(-1);
    doCombat();
}

calculateResult();
console.log(result);

function doCombat() {
    let previousNumberOfUnits = 0;
    for (let i = 0; true; i++) {
        previousNumberOfUnits = armies.reduce((previous, current) => previous + current.numberOfUnits, 0);
        selectTargets();
        attack();

        if (checkIfCombatIsOver()) {
            if (armies[0].army == 'immuneSystem') success = true;
            break;
        }
        if (armies.reduce((previous, current) => previous + current.numberOfUnits, 0) == previousNumberOfUnits) break;
    }
}

function updateEffectivePower(i: number) {
    if (i != -1) {
        armies[i].effectivePower = armies[i].numberOfUnits * armies[i].attackDamage;
    } else {
        for (let l = 0; l < armies.length; l++) {
            armies[l].effectivePower = armies[l].numberOfUnits * armies[l].attackDamage;
        }
    }
}

function checkIfCombatIsOver(): boolean {
    let immuneSystemFound: boolean = false;
    let infectionFound: boolean = false;
    for (let i = 0; i < armies.length; i++) {
        if (armies[i].army == 'immuneSystem') infectionFound = true;
        if (armies[i].army == 'infection') immuneSystemFound = true;
        if (infectionFound && immuneSystemFound) return false;
    }
    return true;
}

function readInput() {
    for (let i = 0; i < input.length; i++) {
        for (let g = 0; g < input[i].length; g++) {
            let currentGroup = input[i][g].split(' ');

            let currentNumberOfUnits: number = parseInt(currentGroup[0]);
            let currentHitPoints: number = parseInt(currentGroup[4]);
            let currentInitiative: number = parseInt(currentGroup[currentGroup.length - 1]);
            let currentAttackType: string = currentGroup[currentGroup.length - 5];
            let currentAttackDamage: number = parseInt(currentGroup[currentGroup.length - 6]);

            let currentArmy = 'immuneSystem';
            if (i == 1) currentArmy = 'infection';

            let currentImmunities: string[] = [];
            let currentWeaknesses: string[] = [];

            currentGroup = input[i][g].split('');
            let startOfBracket = currentGroup.indexOf('(');
            let endOfBracket = currentGroup.indexOf(')');

            if (startOfBracket != -1) {
                let currentGroupImmunitiesAndWeaknesses = currentGroup.slice(startOfBracket + 1, endOfBracket).join('').split(/;\s/).map(x => x.split(/,\s|\s/));
                for (let l = 0; l < currentGroupImmunitiesAndWeaknesses.length; l++) {
                    let currentType: string = '';
                    if (currentGroupImmunitiesAndWeaknesses[l][0] == 'immune') currentType = 'immunity';
                    if (currentGroupImmunitiesAndWeaknesses[l][0] == 'weak') currentType = 'weakness';
                    currentGroupImmunitiesAndWeaknesses[l] = currentGroupImmunitiesAndWeaknesses[l].slice(2);
                    while (currentGroupImmunitiesAndWeaknesses[l].length > 0) {
                        if (currentType == 'immunity') {
                            currentImmunities.push(currentGroupImmunitiesAndWeaknesses[l][0]);
                            currentGroupImmunitiesAndWeaknesses[l] = currentGroupImmunitiesAndWeaknesses[l].slice(1);
                        } else if (currentType == 'weakness') {
                            currentWeaknesses.push(currentGroupImmunitiesAndWeaknesses[l][0]);
                            currentGroupImmunitiesAndWeaknesses[l] = currentGroupImmunitiesAndWeaknesses[l].slice(1);
                        }
                    }
                }
            }

            let currentIndex = armies.length;

            armies.push({
                army: currentArmy,
                numberOfUnits: currentNumberOfUnits,
                hitPoints: currentHitPoints,
                immunities: currentImmunities,
                weaknesses: currentWeaknesses,
                attackDamage: currentAttackDamage,
                attackType: currentAttackType,
                initiative: currentInitiative,
                effectivePower: currentNumberOfUnits * currentAttackDamage,
                target: -1,
                uniqueIndex: currentIndex
            });
        }
    }
}

function sortForSelectingTarget(a: Group, b: Group): number {
    if (a.effectivePower > b.effectivePower) {
        return -1;
    } else if (a.effectivePower < b.effectivePower) {
        return 1;
    } else if (a.effectivePower == b.effectivePower) {
        if (a.initiative > b.initiative) {
            return -1;
        } else if (a.initiative < b.initiative) {
            return 1;
        }
    }
    return 0;
}

function sortForAttacking(a: Group, b: Group): number {
    if (a.initiative > b.initiative) {
        return -1;
    } else if (a.initiative < b.initiative) {
        return 1;
    }
    return 0;
}

function selectTargets() {
    armies.sort(sortForSelectingTarget);
    let targets: number[] = new Array(armies.length);

    for (let i = 0; i < armies.length; i++) {
        armies[i].target = -1;
        let currentTarget: Target = { index: -1, damage: 0, uniqueIndex: -1 };
        for (let t = 0; t < armies.length; t++) {
            let uniqueIndexOfTarget = armies[t].uniqueIndex;
            if (armies[i].army != armies[t].army && !targets.includes(uniqueIndexOfTarget) && !armies[t].immunities.includes(armies[i].attackType)) {
                let currentDamage = calculateDamage(i, t);
                if (currentTarget.index == -1) {
                    currentTarget = { index: t, damage: currentDamage, uniqueIndex: uniqueIndexOfTarget };
                } else {
                    if (currentDamage > currentTarget.damage && currentDamage > 0) {
                        currentTarget = { index: t, damage: currentDamage, uniqueIndex: uniqueIndexOfTarget };
                    } else if (currentDamage == currentTarget.damage) {
                        if (armies[t].effectivePower > armies[currentTarget.index].effectivePower) {
                            currentTarget = { index: t, damage: currentDamage, uniqueIndex: uniqueIndexOfTarget };
                        } else if (armies[t].effectivePower == armies[currentTarget.index].effectivePower) {
                            if (armies[t].initiative > armies[currentTarget.index].initiative) {
                                currentTarget = { index: t, damage: currentDamage, uniqueIndex: uniqueIndexOfTarget };
                            }
                        }
                    }
                }
            }
        }
        targets[i] = currentTarget.uniqueIndex;
    }

    for (let i = 0; i < armies.length; i++) {
        armies[i].target = targets[i];
    }
}

function attack() {
    armies.sort(sortForAttacking);

    for (let i = 0; i < armies.length; i++) {
        let currentIndexOfTarget = -1;
        for (let l = 0; l < armies.length; l++) {
            if (armies[l].uniqueIndex == armies[i].target) {
                currentIndexOfTarget = l;
                break;
            }
        }
        if (armies[i].numberOfUnits > 0 && currentIndexOfTarget != -1) {
            let currentDamage = calculateDamage(i, currentIndexOfTarget);
            let numberOfLostUnits = Math.floor(currentDamage / armies[currentIndexOfTarget].hitPoints);
            armies[currentIndexOfTarget].numberOfUnits -= numberOfLostUnits;
            updateEffectivePower(currentIndexOfTarget);
        }
    }

    for (let i = armies.length - 1; i >= 0; i--) {
        if (armies[i].numberOfUnits <= 0) armies.splice(i, 1);
    }
}

function calculateDamage(attackingArmyIndex: number, targetArmyIndex: number): number {
    let damage: number = armies[attackingArmyIndex].effectivePower;
    if (armies[targetArmyIndex].immunities.includes(armies[attackingArmyIndex].attackType)) damage = 0;
    if (armies[targetArmyIndex].weaknesses.includes(armies[attackingArmyIndex].attackType)) damage *= 2;
    return damage;
}

function calculateResult() {
    for (let i = 0; i < armies.length; i++) {
        result += armies[i].numberOfUnits;
    }
}

console.timeEnd('Time');