const promptSync = require('prompt-sync');

// funcão para criar um input
function getInputNumber(message) {
    let prompt = promptSync();
    let number = Number.parseInt(prompt(message))
    return number
}

function getInputText(message) {
    let prompt = promptSync();
    let text = prompt(message)
    return text
}

module.exports = { getInputNumber, getInputText };
