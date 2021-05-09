const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();
console.log('Number:' , randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition =  new window.SpeechRecognition(); 

//start recognising
recognition.start();

//get the speech of client
function onSpeak(event){
    const msg = event.results[0][0].transcript;
    writeMsg(msg);
    checkNumber(msg);
}

//insert info to DOM
function writeMsg(num){
    msgEl.innerHTML=`
    <div>You Said :</div>
    <span class='box'>${num}</span>`;
}

//Check the number 
function checkNumber(msg){
    const num = +msg;

    //check if it is not number
    if(Number.isNaN(num)){
        msgEl.innerHTML +='<div>That is not number please say  valid number</div>';
        return;
    }
    //check the range of number 
    if(num > 100 ||  num < 1){
        msgEl.innerHTML+='<div>Say number between 1-100</div>';
    }

    //check the higher or lower number
    if(num === randomNum){
        document.body.innerHTML =`
        <h2>Congrat's you guessed the number <br><br>It was the ${num}</h2>
        <button class='play-again' id='play-again'>Play Again</button>
        `;
    }
    else if(num > randomNum){
        msgEl.innerHTML += '<div>Go Lower</div>';
    }else{
        msgEl.innerHTML += '<div>Go Higher</div>';
    }
}

//create random number
function getRandomNumber(){
    return Math.floor(Math.random() *100) +1 ;
}

recognition.addEventListener('result',onSpeak);

//play tillthe right answer
recognition.addEventListener('end',() => recognition.start());

//play again btn
document.body.addEventListener('click',event => {
    if(event.target.id ==='play-again'){
        window.location.reload();
    }
});
