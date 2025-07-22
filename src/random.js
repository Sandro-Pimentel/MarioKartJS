// separando as funções de aleatoriedade
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomItem(items) {
    const itemIndex = await getRandomIndex(items);

    return items[itemIndex];
}

// função que seleciona uma pista pré-definida aleatóriamente
async function randomChoice(roads) {
    let avaliableRoads = roads;
    avaliableRoads.pop();
    avaliableRoads.pop();

    const random = Math.floor(Math.random() * avaliableRoads.length);

    return avaliableRoads[random];
}

// função que gera um pista aleatória
async function generateRoad() {
    const rounds = [1, 3, 5, 7, 10];

    const roadRounds = rounds[await getRandomIndex(rounds)];
    let generatedRoad = [];

    for (let i = 0; i < roadRounds; i++) {
        const block = await getRandomBlock();
        
        generatedRoad.push(block);
    }

    return {
        name: "Random generated",
        rounds: roadRounds,
        blocks: generatedRoad,
    };
}

// funções usadas dentro do script
async function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
        result = "RETA";
        break;
        case random < 0.66:
        result = "CURVA";
        break;
        default:
        result = "CONFRONTO";
    }

    return result;
}

module.exports = { rollDice, getRandomItem, randomChoice, generateRoad};
