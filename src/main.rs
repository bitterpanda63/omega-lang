use std::fs;
use crate::analysis::scanner;

pub mod analysis;


fn main() {
    let contents = fs::read_to_string("./../test_file.omega")
        .expect("Should have been able to read the file");
    println!("{}", contents);
    scanner("Test")

}