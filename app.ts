const numberOfGames = 1000;
let numberOfGamesPlayed = 0;
let numberOfLooses = 0;
let numberOfWins = 0;
let averageMaxLoopSize = 0;
let averageNumberOfLoops = 0;

for (let n = 1; n <= numberOfGames; n++) {

    let boxes = new Map();
    let randomNumbers: Array<number> = [];
    let chain: Array<number> = [];
    let loops: Array<Array<number>> = [];
    let longestLoop: Array<number> = [];

    function generateBoxes(): void {
        for (let index = 1; index <= 100; index++) {
            let random = randomIntFromInterval(1, 100);
            boxes.set(index, random)
        }
    }

    function randomIntFromInterval(min: number, max: number): number | undefined {
        while (randomNumbers.length <= 100) {
            let result = Math.floor(Math.random() * (max - min + 1) + min);
            if (!randomNumbers.includes(result)) {
                randomNumbers.push(result);
                return result;
            }
        }
    }

    function recursivelookIntoBox(genesisBox: number, boxNumber: number): void {
        let numberInBox = boxes.get(boxNumber);
        randomNumbers = randomNumbers.filter(e => e != numberInBox);
        chain.push(numberInBox);
        if ((boxNumber != numberInBox) && numberInBox != genesisBox) {
            boxNumber = numberInBox;
            recursivelookIntoBox(genesisBox, boxNumber);
        } else {
            if (randomNumbers.length > 0 || chain.length == 100) {
                loops.push(chain);
                chain = [];
                genesisBox = randomNumbers[0];
                recursivelookIntoBox(genesisBox, genesisBox)
            }
        }
    }

    function getLongestLoop(loops: Array<Array<number>>) {
        let maxLength = 0;
        let indexLoop = 0;
        loops.forEach((element, index) => {
            if (maxLength <= element.length) {
                maxLength = element.length;
                indexLoop = index;
            }
        });
        longestLoop = loops[indexLoop];
    }

    generateBoxes();
    let random = Math.floor(Math.random() * (100 - 1 + 1) + 1)
    recursivelookIntoBox(random, random)
    console.log(loops, loops.length)
    getLongestLoop(loops)
    console.log("longestLoop, longestLoop.length", longestLoop, longestLoop.length)

    numberOfGamesPlayed = numberOfGamesPlayed + 1;
    longestLoop.length <= 50 ? numberOfWins++ :numberOfLooses++;

}

console.log("-------------------------------");
console.log("-------------------------------");
console.log("Number Of Games: ", numberOfGamesPlayed)
console.log("Number Of Looses: ", numberOfLooses)
console.log("Number Of Wins: ", numberOfWins)
console.log("-------------------------------");
console.log("Win Percentage %", numberOfWins / numberOfGamesPlayed * 100);