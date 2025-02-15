const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

//set values
let timer;
let maxtime = 60;
let timeleft = maxtime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
  const paragraph = [
    "Avoid daydreaming about the years to come.","You are the most important person in your whole life.","Always be true to who you are, and ignore what other people have to say about you.","Always be true to who you are, and ignore what other people have to say about you.","Only demonstrate your strength when it is really required.","Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.","A room without books is like a body without a soul.","Be the change that you wish to see in the world.","If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.","I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.","Live as if you were to die tomorrow. Learn as if you were to live forever.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment."
  ];

  const randomIndex = Math.floor(Math.random() * paragraph.length);
  typingText.innerHTML = '';
  for (const char of paragraph[randomIndex]) {
    typingText.innerHTML += `<span>${char}</span>`;
  }

  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => input.focus());
  typingText.addEventListener("click", () => input.focus());
}


//Handle user input
function initTyping(){
    const char = typingText.querySelectorAll("span");
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeleft > 0){

        if(!isTyping){
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add("correct");
            console.log("correct");
        }
        else{
            mistake++;
            char[charIndex].classList.add("Incorrect");
            console.log("Incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    }
    else{
        clearInterval(timer);
        input.value = '';
    }
}

function initTime(){
    if(timeleft > 0){
        timeleft--;
        time.innerText = timeleft;
        let wpmVal = Math.round(((charIndex - mistake)/5) / (maxtime - timeleft) * 60);
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeleft = maxtime;
    time.innerText = timeleft;
    input.value = '';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);
loadParagraph();
