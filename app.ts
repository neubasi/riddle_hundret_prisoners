const numberOfGames = 1000;
const numberofPriosners = 100;
const numberOfAttempt = 50
let numberOfGamesPlayed = 0;
let numberOfLooses = 0;
let numberOfWins = 0;
let controlLoop = 0;

for (let n = 1; n <= numberOfGames; n++) {

    let boxes = new Map();
    let randomNumbers: Array<number> = [];
    let chain: Array<number> = [];
    let loops: Array<Array<number>> = [];
    let longestLoop: Array<number> = [];

    function generateBoxes(): void {
        for (let index = 1; index <= numberofPriosners; index++) {
            let random = randomIntFromInterval(1, numberofPriosners);
            boxes.set(index, random)
        }
        console.log(boxes)
    }

    function randomIntFromInterval(min: number, max: number): number | undefined {
        while (randomNumbers.length <= numberofPriosners) {
            let result = Math.floor(Math.random() * (max - min + 1) + min);
            if (!randomNumbers.includes(result)) {
                randomNumbers.push(result);
                return result;
            }
        }
    }

    function recursivelookIntoBox(genesisBox: number, boxNumber: number): void {
        let numberInBox = boxes.get(boxNumber); //9
        randomNumbers = randomNumbers.filter(e => e != boxNumber); // []
        chain.push(numberInBox);
        if ((boxNumber != numberInBox) && numberInBox != genesisBox) {
            boxNumber = numberInBox;
            recursivelookIntoBox(genesisBox, boxNumber);
        } else {
            if (countLengthinAllLoops(loops) < numberofPriosners) {
                loops.push(chain);
                chain = [];
                genesisBox = randomNumbers[0];
                recursivelookIntoBox(genesisBox, genesisBox)
            }
        }
    }

    function countLengthinAllLoops(loops: Array<Array<number>>): number {
        let result = 0;
        loops.forEach(element => {
            result = result +element.length
        });
        return result;
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
    let random = Math.floor(Math.random() * (numberofPriosners - 1 + 1) + 1);
    recursivelookIntoBox(random, random)
    console.log(loops, loops.length)
    getLongestLoop(loops)
    console.log("longestLoop, longestLoop.length", longestLoop, longestLoop.length)

    numberOfGamesPlayed = numberOfGamesPlayed + 1;
    longestLoop.length <= numberOfAttempt ? numberOfWins++ :numberOfLooses++;

    // Kontrollfunktion
    let controlLength = countLengthinAllLoops(loops);
    console.log("Control length has to be ", numberofPriosners, "and is ", controlLength)
    if(controlLength > numberofPriosners) {
        console.log("Kontrollfunktion")
        process.exit(1)
    }
}

console.log("-------------------------------");
console.log("-------------------------------");
console.log("Number Of Games: ", numberOfGamesPlayed)
console.log("Number Of Looses: ", numberOfLooses)
console.log("Number Of Wins: ", numberOfWins)
console.log("Number Of Priosners: ", numberofPriosners)
console.log("Number Of Attempts: ", numberOfAttempt)
console.log("-------------------------------");
console.log("Win Percentage %", numberOfWins / numberOfGamesPlayed * 100);

