const characters = require("./data/characters");
const items = require("./data/items");
const roads = require("./data/roads");
const { getInputNumber, getInputText } = require("./utils/prompt");
const { logRollResult, logChooseCharacter, logChooseRoad, declareWinner } = require("./utils/logs");
const { getRandomItem, rollDice, randomChoice, generateRoad } = require("./random");

async function checkChoice(text, array) {
  while(true) {
    choice = getInputNumber(text);
    
    if(choice > 0 && choice <= array.length) {
      return choice;
    }

    console.log("Escolha inválida, tente novamente");
  }
}

async function checkRoadChoice(choice) {
  if(choice.name === "Random generated") {
    return await generateRoad();
  }
  
  if(choice.name === "Random choice") {
    return await randomChoice(roads);
  }
  
  return choice;
}

async function playRaceEngine(character1, character2, road) {
  let index = 0;

  console.log(`🏁 Corrida em ${road.name} - ${road.rounds} rodadas 🏁\n`)

  for (const round of road.blocks) {
    // avançar as rodadas
    index++;

    getInputText("Pressione ENTER para continuar...\n");
    console.log(`🏁 Rodada ${index}`);

    console.log(`Bloco: ${round}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (round === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );

      console.log(
        totalTestSkill2 === totalTestSkill1
          ? "Empate na reta, ninguém pontuou!"
          : ""
      );
    }

    if (round === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );

      console.log(
        totalTestSkill2 === totalTestSkill1
          ? "Curva acirrada, ninguém pontuou!"
          : ""
      );
    }

    if (round === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou ${character2.NOME}! 🥊`);

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

      const item = await getRandomItem(items);

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {        
        if(item.points > 0) {
          character1.PONTOS+=item.points;
          
          console.log(
            `\n${character1.NOME} venceu o confronto e ganhou ${item.name}, ${character1.NOME} ganhou ${item.points} ponto(s) ${item.emoji}`
          );
        } else {
          character2.PONTOS+=item.points;

          console.log(
            `\n${character1.NOME} venceu o confronto e ganhou ${item.name}, ${character2.NOME} perdeu ${item.points * -1} ponto(s) ${item.emoji}`
          );
        }
      }

      if (powerResult2 > powerResult1 && character1.PONTOS + item.points > 0) {
        if(item.points > 0) {
          character2.PONTOS+=item.points

          console.log(
            `\n${character2.NOME} venceu o confronto e ganhou ${item.name}, ${character2.NOME} ganhou ${item.points} ponto(s) ${item.emoji}`
          );
         } else { 
          character1.PONTOS+=item.points;
          
          console.log(
            `\n${character2.NOME} venceu o confronto e ganhou ${item.name}, ${character1.NOME} perdeu ${item.points * -1} ponto(s) ${item.emoji}`
          );
        }
      }

      console.log(
        powerResult2 === powerResult1
          ? "\nConfronto empatado! Nenhum ponto foi perdido"
          : ""
      );
    }

    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    console.log("-----------------------------");
  }
}

(async function main() {
  await logChooseCharacter();

  const playerChoice1 = await checkChoice("Escolha o primeiro personagem: ", characters) - 1;
  const playerChoice2 = await checkChoice("Escolha o segundo personagem: ", characters) - 1;

  const player1 = characters[playerChoice1];
  const player2 = characters[playerChoice2];

  await logChooseRoad();

  const roadChoice = await checkChoice("Escolha a pista: ", roads) - 1;

  console.log(`Opção escolhida: ${roads[roadChoice].name}`)

  const road = await checkRoadChoice(roads[roadChoice]);

  console.log(
    `\n🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... 🚨\n`
  );

  await playRaceEngine(player1, player2, road);

  getInputText("Pressione ENTER para continuar...\n"); 

  await declareWinner(player1, player2);
})();
