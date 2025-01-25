'use strict';

const gameEl = document.querySelector('.memory__game');
const result = document.querySelector('.result');
const resTimer = document.querySelector('.resTimer');
const result__score = document.querySelector('.score__result');
const result__final = document.querySelector('.result__final');
const result__time = document.querySelector('.result__time');
const emoji =['😂',  '😊',  '😘',  '😍', '❤', '🤣', '😁', '🤢', '😎', '😜']
const randomEmoji = emoji.concat(emoji).sort(() => (Math.random() > 0.5) ? 2 : -1);

let cnt = 0;
let k = 0;
let timer = 60;
let intervalId;

const startTimer = () => {
    intervalId = setInterval(() => {
        if (timer > 0 && document.querySelectorAll('.success').length !== randomEmoji.length) {
            resTimer.innerHTML = `00:${timer < 11 ? `0${--timer}` : --timer}`;
        } else {
            clearInterval(intervalId);
            endGame();
        }
    }, 1000);
};

const endGame = () => {
    result__final.innerHTML = result.innerHTML;
    gameEl.classList.add('memory__game');
    result__score.classList.add('res');
    result__time.innerHTML = `00:${timer < 11 ? `0${timer}` : timer}`;
};

const handleClick = (block) => {
    if (!block.classList.contains('active') && !block.classList.contains('success')) {
        cnt++;
        k++;
        if (cnt === 1) {
            startTimer();
        }
        if (k <= 2) {
            block.classList.add('active');
        }
    }
    const clickClass = document.querySelectorAll('.active');
    setTimeout(() => {
        if (clickClass.length === 2) {
            k = 0;
            if (clickClass[0].innerHTML === clickClass[1].innerHTML) {
                clickClass[0].classList.add('success');
                clickClass[1].classList.add('success');
                clickClass[0].classList.remove('active');
                clickClass[1].classList.remove('active');
                result.innerHTML++;
            } else {
                clickClass[0].classList.remove('active');
                clickClass[1].classList.remove('active');
            }
        }
        if (document.querySelectorAll('.success').length === randomEmoji.length) {
            clearInterval(intervalId);
            endGame();
        }
    }, 1000);
};

const createBlocks = () => {
    randomEmoji.forEach((item) => {
        const block = document.createElement('div');
        block.classList.add('block__grid');
        block.innerHTML = item;
        block.onclick = () => handleClick(block);
        gameEl.appendChild(block);
    });
};

createBlocks();
