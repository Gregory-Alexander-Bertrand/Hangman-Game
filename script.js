const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['apple', 'kiwi', 'lime', 'lemon', 'grape', 'watermelon', 'dragonfruit', 
'aptricots', 'banana', 'blackberries', 'blueberries', 'cantaloupe', 'clementine', 'durian',
 'grapefruit', 'guava', 'kumquat', 'lychee', 'mango', 'orange', 'papaya'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable= true;

const correctLetters = [];
const wrongLetters = [];

//Show hidden word
function displayWord () {
    wordEl.innerHTML = `${selectedWord.split('').map( letter => `
    <span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`)
.join('')}`;
    const innerWord = wordEl.innerText.replace(/[ \n]/g, '');
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Great job, due, you won!';
        popup.style.display = 'flex';

        playable = false;
    }
}

//Update the wrong letters
function updateWrongLettersEl() {
    wrongLetters.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span`)}`;

    //display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    //Check loss
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Sorry bud, you lost.';
        finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
        popup.style.display = 'flex';

        playable = false;
    }
}

//show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(
        () => {
            notification.classList.remove('show');
        }, 2000
    );
}

//letter press
window.addEventListener('keydown', e => {
    if (playable) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const letter = e.key.toLowerCase();

            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter))
                correctLetters.push(letter);

                displayWord();
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    
                    updateWrongLettersEl();
                } else {
                    showNotification();
                }
            }
        }
    }
});
//Restart game and play again
playAgainBtn.addEventListener('click', () => {
    playable = true;

    // The two Empty Arrays Above
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();
