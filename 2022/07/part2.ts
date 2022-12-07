import { readFileSync } from 'fs';
console.time('Time');
let input = readFileSync('./input.txt', 'utf-8').split('\r\n');

class File {
    name: string;
    size: number;
}

class Directory {
    name: string;
    files: File[];
    directories: Directory[];
    parent: Directory | null;
}

let rootDirectory: Directory = { name: '/', files: [], directories: [], parent: null };
let currentDirectory: Directory = rootDirectory;
for (let i = 0; i < input.length; i++) {
    if (input[i].slice(0, 4) == '$ cd') {
        let newDir: string = input[i].slice(5);
        if (newDir == '..') {
            currentDirectory = currentDirectory.parent;
        } else if (newDir == '/') {
            currentDirectory = rootDirectory;
        } else {
            currentDirectory = currentDirectory.directories.find(d => d.name == newDir);
        }
    } else if (input[i].slice(0, 3) == 'dir') {
        let newDir: string = input[i].slice(4);
        currentDirectory.directories.push({ name: newDir, files: [], directories: [], parent: currentDirectory});
    } else if (input[i].slice(0, 4) != '$ ls') {
        let fileSize: number = parseInt(input[i].split(' ')[0]);
        let fileName: string = input[i].split(' ')[1];
        currentDirectory.files.push({ name: fileName, size: fileSize });
    }
}

let directorySizes: number[] = [];
let usedSpace: number = getFileSize(rootDirectory);
let neededSpace: number = 30000000 - (70000000 - usedSpace);
let result = Math.min(...directorySizes.filter(x => x >= neededSpace));
console.log(result);

function getFileSize(directory: Directory): number {
    let totalFileSize: number = directory.files.reduce((previous, next) => previous + next.size, 0);
    for (let i = 0; i < directory.directories.length; i++) {
        totalFileSize += getFileSize(directory.directories[i]);
    }
    directorySizes.push(totalFileSize);
    return totalFileSize;
}

console.timeEnd('Time');