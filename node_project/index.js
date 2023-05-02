const TEST_FILE = "./../test_file.omega";

const scanner = require("./src/analysis/scanner/index");
const fs = require("fs");

const contents = fs.readFileSync(TEST_FILE, 'utf-8');

scanner(contents);