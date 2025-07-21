// Pistas pré-definidas
const roads = [
    {
        name: "Mario Circuit",
        rounds: 1,
        blocks: ["RETA"],
    },
    {
        name: "Moo Moo Meadows",
        rounds: 3,
        blocks: ["RETA", "CURVA", "CONFRONTO"],
    },
    {
        name: "Toad's Factory",
        rounds: 5,
        blocks: ["RETA", "CURVA", "CONFRONTO", "CURVA", "reta"],
    },
    {
        name: "Wario's Gold Mine",
        rounds: 7,
        blocks: ["RETA", "CONFRONTO", "CURVA", "CONFRONTO", "CURVA", "RETA", "CONFRONTO"],
    },
    {
        name: "Rainbow Road",
        rounds: 10,
        blocks: ["RETA", "CURVA", "CONFRONTO", "CURVA", "RETA", "CURVA", "CONFRONTO", "CURVA", "RETA", "CONFRONTO"],
    },
    {
        name: "Random choice",
        rounds: "?",
        blocks: "?",
    },
    {
        name: "Random generated",
        rounds: "?",
        blocks: "?",
    },
];

module.exports = roads;
