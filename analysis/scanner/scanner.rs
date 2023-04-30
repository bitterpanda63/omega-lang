use regex::Regex;
use lazy_static::lazy_static;

fn regexes() {
    lazy_static! {
        static ref Strings:Regex = Regex::new("/`([A-z]?|[A-z]+)`/g").unwrap();
        static ref Variables:Regex = Regex::new("/var:(int|str|char)/g").unwrap();
        static ref Equality:Regex = Regex::new("/=/g").unwrap();
        static ref End:Regex = Regex::new("/;/g").unwrap();

        static ref Addition:Regex = Regex::new("/+/g").unwrap();
        static ref Subtraction:Regex = Regex::new("/-/g").unwrap();
        static ref Multiplication:Regex = Regex::new("/*/g").unwrap();

        static ref Output:Regex = Regex::new("/out/g").unwrap();
    }
}

const TOKEN_TYPES = {
    identifier: 0,
    add_operator: 1,
    assign_operator: 2,
    constant: 3   
}

struct Token {
    token_type: u16,
    index: u64
}
// Strings : /`([A-z]?|[A-z]+)`/g
// Equality : /=/g
// Variables : /var:(int|str|char)/g
// ; --> /;/g
// out --> /out/g
// Variable name --> /([a-z]|[A-Z])([a-z]|[0-9]|[A-Z]|[_])+/g