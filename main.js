const charToMorse = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----'
};

const morseToChar = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G',
    '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N',
    '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U',
    '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y', '--..': 'Z',
    '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5',
    '-....': '6', '--...': '7', '---..': '8', '----.': '9', '-----': '0'
};

const ditFrequency = 800;
const dahFrequency = 800;
const dotDuration = 0.050;
const dashDuration = dotDuration*3;
const spaceDuration = dotDuration;
const wordSpaceDuration = dotDuration*7;

var osc = new Tone.Oscillator({
    "frequency": 550,
    "volume" : 0
  }).toMaster();

function playDit(){
    osc.start();
    osc.stop(`+${dotDuration}`);
    console.log("play dit")
}

function playDah(){
    osc.start();
    osc.stop(`+${dashDuration}`);
    console.log('play dah')
}

function playSymbolSpace(){
    Tone.Transport.scheduleOnce(() => {}, `+${spaceDuration}`);
}

function playWordSpace(){
    Tone.Transport.scheduleOnce(() => {}, `+${wordSpaceDuration}`);
}

function playMorseCode(text){
    const morseCode = textToMorse(text);
    let timeOffset = 0;

    for(const symbol of morseCode){
        if(symbol === '.'){
            setTimeout(playDit, timeOffset);
            timeOffset += dotDuration * 2500;
        }
        else if(symbol === '-'){
            setTimeout(playDah, timeOffset);
            timeOffset += dashDuration * 1500;
        }
        else if(symbol === ' '){
            setTimeout(playSymbolSpace, timeOffset);
            timeOffset += spaceDuration * 1000;
        }
        else if(symbol === '/'){
            setTimeout(playWordSpace, timeOffset);
            timeOffset += wordSpaceDuration * 1000;
        }
    }
}


function textToMorse(text){
    text = text.toUpperCase();
    let result = '';
    for(const letter of text){
        if(letter in charToMorse){
            result += charToMorse[letter] + '  ';
        } else if(letter == ' '){
            result += '/'
        }
    }
    return result.trim();
}

function morseToText(text){
    const symbols = text.split(' '); // Split by space to get individual symbols
    let result = '';
    
    for(const symbol of symbols){
        if(symbol in morseToChar){
            result += morseToChar[symbol];
        } else if (symbol === '/') {
            result += ' '; // Add space for word separation
        }
    }
    return result.trim().toLowerCase();
}

function updateTranslation(){
    const inputText = document.getElementById('inputText').value;
    let outputText = '';

    // check if input contains only plain text characters and special characters
    const isPlainText = /^[a-zA-Z0-9\s]*$/.test(inputText);

    if(isPlainText){
        // translate plain text to morse code
        outputText = textToMorse(inputText);
    }
    else{
        outputText = morseToText(inputText);
        console.log('morse code dfkdlfkdfjsdfjsf');
    }

    document.getElementById('outputText').value = outputText;
}

document.getElementById('inputText').addEventListener('input', updateTranslation);
document.querySelector('#play').addEventListener('click', function(){
    const code = document.getElementById('inputText').value;
    console.log('button pressed; please playyy');
    playMorseCode(code);
});