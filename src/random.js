// separando as funções de aleatoriedade
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
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

module.exports = { rollDice, getRandomBlock };
