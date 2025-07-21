const characters = require("../data/characters");
const roads = require("../data/roads");

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

async function logChooseRoad() {
  console.log("Pistas disponíveis: \n");
  roads.forEach((road, index) => {
    console.log(`${index + 1}. ${road.name}`);
    console.log(`   Rodadas: ${road.rounds}`);
    console.log(`   Blocos: ${road.blocks}`);
    console.log("------------------------------");
  });
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  else console.log("A corrida terminou em empate");
}

module.exports = { logRollResult, logChooseCharacter, logChooseRoad, declareWinner };
