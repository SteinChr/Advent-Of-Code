import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8');
let splittedInput = input.split('\r\n\r\n');
let tiles = splittedInput.map(t => t.split('\r\n'));
let tilesWithVersion: { id: number, edges: string[][] }[] = [];
let result = 1;

for (let i = 0; i < tiles.length; i++) {
    tilesWithVersion.push({
        id: parseInt(tiles[i][0].split(' ')[1].split(':')[0]), edges: [
            [tiles[i][1], tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).join(''), tiles[i][tiles[i].length - 1], tiles[i].slice(1).map(x => x.charAt(0)).join('')],
            [tiles[i].slice(1).map(x => x.charAt(0)).reverse().join(''), tiles[i][1], tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).reverse().join(''), tiles[i][tiles[i].length - 1].split('').join('')],
            [tiles[i][tiles[i].length - 1].split('').reverse().join(''), tiles[i].slice(1).map(x => x.charAt(0)).reverse().join(''), tiles[i][1].split('').reverse().join(''), tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).reverse().join('')],
            [tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).join(''), tiles[i][tiles[i].length - 1].split('').reverse().join(''), tiles[i].slice(1).map(x => x.charAt(0)).join(''), tiles[i][1].split('').reverse().join('')],
            [tiles[i][1].split('').reverse().join(''), tiles[i].slice(1).map(x => x.charAt(0)).join(''), tiles[i][tiles[i].length - 1].split('').reverse().join(''), tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).join('')],
            [tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).reverse().join(''), tiles[i][1].split('').reverse().join(''), tiles[i].slice(1).map(x => x.charAt(0)).reverse().join(''), tiles[i][tiles[i].length - 1].split('').reverse().join('')],
            [tiles[i][tiles[i].length - 1], tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).reverse().join(''), tiles[i][1], tiles[i].slice(1).map(x => x.charAt(0)).reverse().join('')],
            [tiles[i].slice(1).map(x => x.charAt(0)).join(''), tiles[i][tiles[i].length - 1], tiles[i].slice(1).map(x => x.charAt(tiles[i].length - 2)).join(''), tiles[i][1]]
        ]
    });
}
let corners: number[] = [];
for (let i = 0; i < tilesWithVersion.length; i++) {
    for (let l = 0; l < tilesWithVersion[i].edges.length; l++) {
        let matches = 0;
        for (let j = 0; j < tilesWithVersion[i].edges[l].length; j++) {
            let currentEdge = tilesWithVersion[i].edges[l][j];
            if (tilesWithVersion.filter(t => t.id != tilesWithVersion[i].id).find(t => t.edges[0].includes(currentEdge) || t.edges[1].includes(currentEdge) || t.edges[2].includes(currentEdge) || t.edges[3].includes(currentEdge) || t.edges[4].includes(currentEdge) || t.edges[5].includes(currentEdge) || t.edges[6].includes(currentEdge) || t.edges[7].includes(currentEdge))) {
                matches++;
            }
        }
        if (matches == 2 && !corners.includes(tilesWithVersion[i].id)) {
            corners.push(tilesWithVersion[i].id);
        }
    }
}

for (let i = 0; i < corners.length; i++) {
    result *= corners[i];
}

console.log(result);
console.timeEnd('Time');