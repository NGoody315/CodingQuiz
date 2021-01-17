//Assignments
const startTextEl = document.getElementById("start-text");
const startTitleEL = document.getElementById("start-title")
const beginQuiz = document.getElementById("begin-quiz");
const timerEl = document.getElementById("timer");
const questionContainerEl = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");
const nextButtonEl = document.getElementById('next-button');
const viewScoresEl = document.getElementById('view-scores');
// const restartButtonEl = document.getElementById('restart-button');
const endGameButton = document.getElementById("endgame-button");
const highScoreContainer = document.getElementById('hs-container');
var scoreCounter = 0;

let shuffledQuestions, currentQuestionIndex

//Questions Array
const questions = [
    {
        q: 'What is the HTML tag under which one can write the JS code?',
        a: [
            {text: "<javascript>", correct: false},
            {text: "<scripted>", correct: false},
            {text: "<script>", correct: true},
            {text: "<js>", correct: false},
        ]
    },
    {
        q: 'Choose the correct JavaScript syntax to change the content of the following HTML code.',
        a: [
            {text: "document.getElement('geek').innerHTML='I am a Geek'", correct: false},
            {text: "document.getElementById('geek').innerHTML='I am a Geek'", correct: true},
            {text: "documenet.getId('geek')='I am a Geek'", correct: false},
            {text: "document.getElementById('geek').innerHTML= I am a Geek", correct: false},
        ]
    },

    {
        q: 'Which of the following is the correct syntax to display "GeeksforGeeks" in an alert box using Javascript?',
        a: [
            {text: "alertbox('GeeksforGeeks');", correct: false},
            {text: "msg('GeeksforGeeks');", correct: false},
            {text: "msgbox('GeeksforGeeks');", correct: false},
            {text: "alert('GeeksforGeeks');", correct: true},
        ]
    },
    {
        q: "What is the correct syntax for referring to an external script called 'geek.js'?",
        a: [
            {text: "<script src='geek.js'>", correct: true},
            {text: "<script href='geek.js'>", correct: false},
            {text: "<script ref='geek.js'>", correct: false},
            {text: "<script name='geek.js'>", correct: false},
        ]
    }

]

//Event Listeners
beginQuiz.addEventListener("click", startGame);
nextButtonEl.addEventListener("click", ()=> {
    currentQuestionIndex++
    setNextQuestion();
})
viewScoresEl.addEventListener("click", viewHighScore)
// restartButtonEl.addEventListener("click", resetGame)
endGameButton.addEventListener("click", endGame)

//Timer Display Message
function displayMessage(){
    document.getElementById('timer').innerHTML="TIME'S UP!"
}

//Timer
var timeLeft = 31;

function countdown() {
  
    var timeInterval = setInterval(function() {
        document.getElementById("timer").innerHTML="00: " + timeLeft;
        timeLeft--;
        if (timeLeft < 1) {
            clearInterval(timeInterval);
            displayMessage();
            viewScoresEl.classList.add('hide')
            questionContainerEl.classList.add('hide')
            //restartButtonEl.classList.remove('hide')
            endGameButton.classList.add('hide')
            highScoreContainer.classList.remove('hide')
            viewHighScore();
        }
    }, 1000);
}


//Start Game
function startGame() {
//hide Start Quiz elements
    beginQuiz.classList.add('hide')
    startTextEl.classList.add('hide')
    startTitleEL.classList.add('hide')
//Shuffle Question Order
    shuffledQuestions = questions.sort(()=> Math.random() - .5)
    currentQuestionIndex = 0
//Recall Quiz Questions
    questionContainerEl.classList.remove('hide')
//Recall Buttons
    viewScoresEl.classList.remove('hide')
    nextButtonEl.classList.remove('hide')

    setNextQuestion();
    countdown();
    scoreCounter = 0;
}

//Shows Questions on Screen
function showQuestion (questions) {
    questionEl.innerText = questions.q
    questions.a.forEach(a => {
        const button = document.createElement('button')
        button.innerText = a.text
        button.classList.add('btn')
        if (a.correct) {
            button.dataset.correct = a.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

//Next Question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

//Reset State of Questions
function resetState() {
    nextButtonEl.classList.add('hide')
    highScoreContainer.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

//Select Answer
function selectAnswer (e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
    nextButtonEl.classList.remove('hide')
    } else {
        endGameButton.classList.remove('hide')
        }
    
    if (selectedButton.dataset = correct){
        scoreCounter++;
    } else {
        timeLeft-=5;
    }
}

//Sets the correct answers to be correct
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove ('correct')
    element.classList.remove('wrong')
}

//Restart Game
// function resetGame() {
//     beginQuiz.classList.add('hide')
//     startTextEl.classList.add('hide')
//     startTitleEL.classList.add('hide')
//     shuffledQuestions = questions.sort(()=> Math.random() - .5)
//     currentQuestionIndex = 0
//     questionContainerEl.classList.remove('hide')
//     viewScoresEl.classList.remove('hide')
//     nextButtonEl.classList.remove('hide')

//     setNextQuestion();
//     countdown();
//     scoreCounter = 0;
// }

//Set High Score
function setHighScore(){

}

//High Score Message
function hsMessage(){
    document.getElementById('hs-container').innerHTML="Your Score: " + scoreCounter;
}

//End Game 
function endGame(){
    timeLeft=1;
};

//Submit High Score

//View High Score
function viewHighScore (){
    questionContainerEl.classList.add('hide')
    viewScoresEl.classList.remove('hide')
    //restartButtonEl.classList.remove('hide')
    nextButtonEl.classList.add('hide')
    highScoreContainer.classList.remove('hide')
 
    hsMessage();
}

