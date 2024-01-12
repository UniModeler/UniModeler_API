export function generateIDFromTime() {

    let id;

    for (let i = 0; i < 4; i++) {
        id += randomLetter();
    }

    id += lastDigitsFromTimestamp();

    return id;
}

function randomLetter() {
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    let index =  (Math.random() * 25).toFixed();

    return alphabet[index];
}

function lastDigitsFromTimestamp() {
    let date = new Date();

    let miliseconds = String(date.getTime())

    return miliseconds.slice(-3);
}