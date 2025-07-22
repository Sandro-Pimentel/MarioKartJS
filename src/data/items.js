// criando itens para o confronto
const items = [
    {
        name: "Bomba",
        points: -2,     // numeros negativos representam que o perdedor perderá pontos
        emoji: "💣",
    },
    {
        name: "Casco",
        points: -1,
        emoji: "🐢",
    },
    {
        name: "Cogumelo",
        points: 1,     // numeros positivos representam que o vencedor ganhará pontos
        emoji: "🍄",
    },
];

module.exports = items;
