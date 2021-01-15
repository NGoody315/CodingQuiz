//Assignments
const startTextEl = document.getElementById("start-text");
const startTitleEL = document.getElementById("start-title")
const beginQuiz = document.getElementById("begin-quiz");
const timerEl = document.getElementById("timer");
const questionContainerEl = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("anwer-buttons");
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
    }
]

//Event Listeners
beginQuiz.addEventListener("click", startGame, countdown);

//Timer
function countdown() {
    var timeLeft = 60;
    
    var timeInterval = setInterval(function() {
        document.getElementById("timer").innerHTML="00: " + timeLeft;
        timeLeft--;
        if (timeLeft === 0) {
            clearInterval(timeInterval);

            displayMessage("Time's Up!")
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
    setNextQuestion();
}

//Next Question
function setNextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion (question) {
    questionEl.innerText = questions.questions

}
//Select Answer
function selectAnswer (){

}
//View High Scores
function viewHighScore (){


}

