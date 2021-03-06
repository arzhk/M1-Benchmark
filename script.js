const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
      "Central Processing Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    answers: ["Static", "Private", "Public", "Final"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    answers: ["True", "False"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    answers: ["True", "False"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    answers: [".png", ".jpeg", ".gif", ".svg"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow", "Nougat"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    answers: ["120", "160", "100", "140"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    answers: ["True", "False"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    answers: ["Python", "C", "Jakarta", "Java"],
  },
];

let score = 0;
let currentQuestion = 0;
let questionNumber = 1;
let choiceSelector = [0, 1, 2, 3];
let randomChoices = [];
let currentTry = 0;
let remainingTries = 2;

function randomiseChoices() {
  let checkA = 0;
  let checkB = 0;
  let checkC = 0;
  let checkD = 0;
  let newArray = [];

  for (let i = 0; i < 50; i++) {
    let hold = Math.floor(Math.random() * 4) + 1;
    if (checkA === 0) {
      checkA = hold;
    } else if (checkB === 0 && hold !== checkA) {
      checkB = hold;
    } else if (checkC === 0 && hold !== checkA && hold !== checkB) {
      checkC = hold;
    } else if (
      checkD === 0 &&
      hold !== checkA &&
      hold !== checkB &&
      hold !== checkC
    ) {
      checkD = hold;
    } else if (checkA > 0 && checkB > 0 && checkC > 0 && checkD > 0) {
      newArray.push(checkA - 1);
      newArray.push(checkB - 1);
      newArray.push(checkC - 1);
      newArray.push(checkD - 1);
      return (randomChoices = newArray);
    }
  }
  return (randomChoices = newArray);
}

function play() {
  const homeContainer = document.querySelector("#maincontainer");
  homeContainer.classList.add("hidden");

  const questionContainer = document.querySelector("#questioncontainer");
  questionContainer.classList.remove("hidden");

  setQuestion();
}

function setQuestion() {
  let choiceContainer = document.querySelectorAll(".ui-choice");
  let choicePre = document.querySelectorAll(".choice-pre");
  let choicePreLetters = ["A.", "B.", "C.", "D."];

  if (
    questions[currentQuestion].correct_answer === "True" ||
    questions[currentQuestion].correct_answer === "False"
  ) {
    remainingTries = 1;
  } else {
    remainingTries = 2;
  }

  let questionTextE = document.querySelector("#questionText");
  questionTextE.innerText = questions[parseInt(currentQuestion)].question;
  console.log(currentQuestion);

  let questionNumberE = document.querySelector("#questionNumber");
  questionNumberE.innerText = questionNumber + "/" + questions.length;

  let triesLeftE = document.querySelector("#triesLeft");
  triesLeftE.innerText = "Remaining Tries: " + remainingTries;

  let choices = document.querySelectorAll(".choice-text");
  randomiseChoices();
  choices[0].innerText =
    questions[currentQuestion].answers[parseInt(randomChoices[0])];
  choices[1].innerText =
    questions[currentQuestion].answers[parseInt(randomChoices[1])];
  choices[2].innerText =
    questions[currentQuestion].answers[parseInt(randomChoices[2])];
  choices[3].innerText =
    questions[currentQuestion].answers[parseInt(randomChoices[3])];

  for (let i = 0; i < choices.length; i++) {
    if (choices[i].innerText === "undefined") {
      choiceContainer[i].classList.add("hidden");
    } else if (choiceContainer[i].classList !== "hidden") {
      choiceContainer[i].classList.remove("hidden");
      choicePre[i].innerText = choicePreLetters[i];
    }
    if (choices[i].innerText === "True" || choices[i].innerText === "False") {
      choicePre[i].innerText = "";
    }
  }
}

function nextQuestion() {
  let choiceContainer = document.querySelectorAll(".ui-choice");
  const nextButton = document.querySelector("#nextButton");
  currentQuestion++;
  questionNumber++;
  currentTry = 0;
  remainingTries = 2;
  nextButton.classList.add("hidden");
  for (let i = 0; i < choiceContainer.length; i++) {
    choiceContainer[i].classList.remove("correct");
    choiceContainer[i].classList.remove("incorrect");
  }
  if (questionNumber > 10) {
    questionNumber = 10;

    showScoreScreen();
  } else {
    setQuestion();
  }
}

function previousQuestion() {
  currentQuestion--;
  questionNumber--;
  if (questionNumber < 1) {
    currentQuestion = 0;
    questionNumber = 1;
    setQuestion();
  } else {
    setQuestion();
  }
}

function selectAnswer() {
  let currentTarget = event.target.innerText;
  console.log(currentTarget);
  let currentDiv = event.target;
  console.log(currentDiv);
  let currentTargetSplit = currentTarget.split("\n");
  console.log(currentTargetSplit);
  let currentTargetText = currentTargetSplit.pop(currentTargetSplit.length - 1);
  console.log(currentTargetText);
  let correctAnswer = questions[currentQuestion].correct_answer;

  let triesLeftE = document.querySelector("#triesLeft");
  const choiceContainer = document.querySelectorAll(".ui-choice");
  const nextButton = document.querySelector("#nextButton");

  if (currentTargetText === "True" || currentTargetText === "False") {
    if (currentTargetText === correctAnswer && currentTry !== 1) {
      currentDiv.classList.add("correct");
      nextButton.classList.remove("hidden");
      currentTry++;
      if (currentTry !== 1) {
        score++;
      }
    } else if (currentTry !== 1) {
      currentDiv.classList.add("incorrect");
      currentTry++;
      remainingTries--;
      triesLeftE.innerText = "Remaining Tries: " + remainingTries;
    }
    if (currentTry === 1) {
      nextButton.classList.remove("hidden");
    }
  } else {
    if (currentTargetText === correctAnswer && currentTry !== 2) {
      currentDiv.classList.add("correct");
      nextButton.classList.remove("hidden");
      if (currentTry !== 2) {
        score++;
      }
    } else if (currentTry !== 2) {
      currentDiv.classList.add("incorrect");
      currentTry++;
      remainingTries--;
      triesLeftE.innerText = "Remaining Tries: " + remainingTries;
    }
    if (currentTry === 2) {
      nextButton.classList.remove("hidden");
    }
  }
  console.log("Current Score is: " + score);
}

function showScoreScreen() {
  const questionContainer = document.querySelector("#questioncontainer");
  questionContainer.classList.add("hidden");

  const homeContainer = document.querySelector("#scorecontainer");
  homeContainer.classList.remove("hidden");

  let scoreH3 = document.querySelector("#scorecontainer h3");
  scoreH3.innerText = score;
}

function reset() {
  const questionContainer = document.querySelector("#questioncontainer");
  questionContainer.classList.add("hidden");

  const homeContainer = document.querySelector("#scorecontainer");
  homeContainer.classList.add("hidden");
  score = 0;
  currentQuestion = 0;
  questionNumber = 1;
  choiceSelector = [0, 1, 2, 3];
  randomChoices = [];
  currentTry = 0;
  play();
}
