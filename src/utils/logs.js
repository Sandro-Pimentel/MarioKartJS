const characters = require("../characters");

// separando funções de log

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(
      `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
        diceResult + attribute
      }`
    );
  }
  
async function logChooseCharacter() {
    console.log("Personagens disponíveis: \n");
    characters.forEach((character, index) => {
        console.log(`${index + 1}. ${character.NOME}`);
        console.log(`   Velocidade: ${character.VELOCIDADE}`);
        console.log(`   Manobrabilidade: ${character.MANOBRABILIDADE}`);
        console.log(`   Poder: ${character.PODER}`);
        console.log("-----------------------------");
    });
}

module.exports = { logRollResult, logChooseCharacter };
