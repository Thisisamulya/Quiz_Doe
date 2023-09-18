const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: 'Which planet has the most moons?',
        choice1: 'Jupiter',
        choice2: 'Saturn',
        choice3: 'Neptune',
        choice4: 'Uranus',
        answer: 2,
    },
    {
        question:"How many bones do we have in an ear?",
        choice1: "3",
        choice2: "1",
        choice3: "7",
        choice4: "5",
        answer: 1,
    },
    {
        question: "What city is known as 'The Eternal City'? ",
        choice1: "Rome",
        choice2: "Barcelona",
        choice3: "Italy",
        choice4: "Cologne",
        answer: 1,
    },
    {
        question: "What country has the highest life expectancy?",
        choice1: "Russia",
        choice2: "Japan",
        choice3: "Hongkong",
        choice4: "South Africa",
        answer: 3,
    },
    {
        question: "What is a group of crows called?",
        choice1: "Attack",
        choice2: "War",
        choice3: "Suicide",
        choice4: "Murder",
        answer: 4,
    }
];
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign("end.html");
  }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

startGame();