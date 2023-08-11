'use strict';
const gameEl = document.querySelector('.memory');
const result = document.querySelector('.result');
const resTimer = document.querySelector('.resTimer');
const result__score = document.querySelector('.score__result');
const result__final = document.querySelector('.result__final');
const result__time = document.querySelector('.result__time');
const clickClass = document.querySelectorAll('.click');
const emoji = ['😂', '😂', '😊', '😊', '😘', '😘', '😍', '😍', '❤', '❤', '🤣', '🤣', '😁', '😁', '🤢', '🤢', '😎', '😎', '😜', '😜'].sort(() => (Math.random() > 0.5) ? 2 : -1);
let cnt = 0;
let k = 0;
let timer = 60;

const get = () => {
    emoji.forEach((item) => {
        const block = document.createElement('div');
        block.classList.add('block__grid')
        block.innerHTML = item;
        block.onclick = () => {
            cnt++
            k++
            if (cnt == 1) {
                setInterval(() => {
                    if (timer > 0 && document.querySelectorAll('.success').length !== emoji.length) {
                        resTimer.innerHTML = `00:${timer < 11 ? `0${--timer}` : --timer}`
                    } else {
                        result__final.innerHTML = result.innerHTML
                        gameEl.classList.add('memory__hidden')
                        result__score.classList.add('res')
                        result__time.innerHTML = `00:${timer < 11 ? `0${timer}` : timer}`
                    }

                }, 1000)
            }
            k <= 2 ? block.classList.add('click') : null
            const clickClass = document.querySelectorAll('.click');
            setTimeout(() => {
                clickClass.length == 2 ? k = 0 : null
                if (clickClass.length > 1) {
                    if (clickClass[0].innerHTML === clickClass[1].innerHTML) {
                        clickClass[0].classList.add('success')
                        clickClass[1].classList.add('success')
                        clickClass[0].classList.remove('click')
                        clickClass[1].classList.remove('click')
                        result.innerHTML++;
                    } else {
                        clickClass[0].classList.remove('click')
                        clickClass[1].classList.remove('click')
                    }
                }
                if (document.querySelectorAll('.success').length === emoji.length) {
                    result__final.innerHTML = result.innerHTML
                    gameEl.classList.add('memory__hidden')
                    result__score.classList.add('res')
                }

            }, 1000)
        }
        gameEl.appendChild(block);
    })
}
get()
