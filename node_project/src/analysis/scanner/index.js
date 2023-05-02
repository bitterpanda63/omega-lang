const strings_regexp = /(`(.+)`)/gmu;
const equality_regexp = new RegExp("/=/", "g");
const variables_regexp = new RegExp("/var:(int|str|char)/", "g");
const termination_regexp = new RegExp("/;/", "g");
const output_regexp = new RegExp("/out/", "g");
const variable_name_regexp = new RegExp("/([a-z]|[A-Z])([a-z]|[0-9]|[A-Z]|[_])+/", "g");
const REGEXES = [
    {
        regex: /(`(.+)`)/gmu,
        constant: 'STR'
    },
    {
        regex: /=/gmu,
        constant: 'EQU'
    },
    {
        regex: /var:(int|str|char)/gmu,
        constant: 'VAR'
    },
    {
        regex: /;/gmu,
        constant: 'TRM'
    },
    {
        regex: /out/gmu,
        constant: 'OUT'
    },
    {
        regex: /([a-z]|[A-Z])([a-z]|[0-9]|[A-Z]|[_])+/gmu,
        constant: 'NAM'
    }
];

class LexicalStructure {
    constructor() {

    }
    addRecord(indexStart, indexEnd, constant) {
        console.log(`index : ${indexStart}-${indexEnd}, constant: ${constant}`);
    }
}

const scanner = (file) => {
    let lexicalStructure = new LexicalStructure();
    REGEXES.forEach(regexObj => {
        file = regexHandler(file, regexObj, lexicalStructure);
    });
}

const regexHandler = (file, regexObj, lexicalStructure) => {
    let returnedMatches = file.match(regexObj.regex);
    return handleMatches(file, returnedMatches, regexObj.constant, lexicalStructure);
}

const handleMatches = (file, returnedMatches, constant, lexicalStructure) => {
    for (let i = 0; i < returnedMatches.length; i++) {
        let indexStart = file.indexOf(returnedMatches[i]);
        let indexEnd = indexStart + returnedMatches[i].length - 1;
        file = file.replace(returnedMatches[i], "");
        lexicalStructure.addRecord(indexStart, indexEnd, constant);
    }
    return file;
}

module.exports = scanner;

// Strings : /`([A-z]?|[A-z]+)`/g
// Equality : /=/g
// Variables : /var:(int|str|char)/g
// ; --> /;/g
// out --> /out/g
// Variable name --> /([a-z]|[A-Z])([a-z]|[0-9]|[A-Z]|[_])+/g