const musicPlayer = document.querySelector(".music-player");
const playPauseButton = document.getElementById("play-pause");
const sound = document.getElementById("sound");

sound.src = "sounds/back-music.mp3";

playPauseButton.addEventListener("click", togglePlayPause);

function togglePlayPause() {
  if (sound.paused) {
    sound.play();
  } else {
    sound.pause();
  }
  playPauseButton.classList.toggle("fa-play-circle", sound.paused);
  playPauseButton.classList.toggle("fa-pause-circle", !sound.paused);
  musicPlayer.classList.toggle("playing", !sound.paused);
}

sound.addEventListener("play", () => {
  playPauseButton.classList.remove("fa-play-circle");
  playPauseButton.classList.add("fa-pause-circle");
  musicPlayer.classList.add("playing");
});

sound.addEventListener("pause", () => {
  playPauseButton.classList.remove("fa-pause-circle");
  playPauseButton.classList.add("fa-play-circle");
  musicPlayer.classList.remove("playing");
});

$(document).ready(function () {
  const audio = new Audio("sounds/keyboard.wav");
  $(document).on("keydown", function () {
    audio.play();
  });
});

function playSound() {
  const sound = document.getElementById("sound");
  sound.play();
}
document.addEventListener("mousedown", playSound);

document.addEventListener("DOMContentLoaded", function () {
  anime({
    targets: "#navbarBrand",
    translateY: [-30, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeOutQuad",
  });

  anime({
    targets: ".navbar-nav .nav-link",
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeOutQuad",
    delay: anime.stagger(200),
  });
});

function blendBackground() {
  document.querySelector(".sub-home").style.backgroundColor =
    "rgba(255, 255, 255, 0)";
}
function resetBackground() {
  document.querySelector(".sub-home").style.backgroundColor =
    "rgba(255, 255, 255, 0.7)";
}

const questions = [
  {
    question: "Кто был первым правителем Казахского народа?",
    answers: [
      {
        text: "Керей-хан",
        correct: true,
      },
      {
        text: "Жанибек-хан",
        correct: false,
      },
      {
        text: "Тауке-хан",
        correct: false,
      },
      {
        text: "Бурындык-хан",
        correct: false,
      },
    ],
  },
  {
    question: "В каком году произошло образование Казахского ханства?",
    answers: [
      {
        text: "1464",
        correct: false,
      },
      {
        text: "1460",
        correct: false,
      },
      {
        text: "1465",
        correct: true,
      },
      {
        text: "1455",
        correct: false,
      },
    ],
  },
  {
    question: "Кто был правителем Казахского ханства в период 1802-1847 гг.?",
    answers: [
      {
        text: "Абылай-хан",
        correct: false,
      },
      {
        text: "Сырым-хан",
        correct: false,
      },
      {
        text: "Абулхайыр-хан",
        correct: false,
      },
      {
        text: "Кенесары-хан",
        correct: true,
      },
    ],
  },
  {
    question: "Кто возглавлял Алашскую автономию в 1917-1920 гг.?",
    answers: [
      { text: "Алихан Бокейханов", correct: true },
      {
        text: "Ахмет Байтурсынулы",
        correct: false,
      },
      {
        text: "Санжар Асфендияров",
        correct: false,
      },
      {
        text: "Жусыпбек Аймауытов",
        correct: false,
      },
    ],
  },
  {
    question:
      "Первый секретарь ЦК Компартии Казахстана в 1960-62 и 1964-86 гг.?",
    answers: [
      {
        text: "Динмухаммед Конаев",
        correct: true,
      },
      {
        text: "Сталин",
        correct: false,
      },
      {
        text: "Геннадий Васильевич",
        correct: false,
      },
      {
        text: "Исмаил Абдурасулович",
        correct: false,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Следующий";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("butn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct == "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Вы ответили на ${score} вопросов из ${questions.length} !`;
  questionElement.style.textAlign = "center";
  nextButton.innerHTML = "Играть Cнова";
  nextButton.style.display = "block";
}

function handleNextBtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();

// свечение кнопок
function hoverButton(btn) {
  btn.style.boxShadow = "0 2px 16px -1px rgb(254, 240, 39)";
}
function unhoverButton(btn) {
  btn.style.boxShadow = "0 2px 8px -1px rgb(254, 240, 39)";
}
var buttons = document.querySelectorAll(".for-btn");
buttons.forEach(function (button) {
  button.addEventListener("mouseover", function () {
    hoverButton(this);
  });

  button.addEventListener("mouseout", function () {
    unhoverButton(this);
  });
});

var navItems = document.querySelectorAll(".navbar-nav-scroll .nav-item");
navItems.forEach(function (item) {
  item.addEventListener("mouseover", function () {
    this.style.boxShadow = "0 0 20px rgba(0, 123, 255, 0.8)";
  });
  item.addEventListener("mouseout", function () {
    this.style.boxShadow = "none";
  });
});

var btn2 = document.querySelector(".btn2");
btn2.addEventListener("mouseover", function () {
  this.style.boxShadow = "0 0 20px rgba(0, 123, 255, 0.8)";
});
btn2.addEventListener("mouseout", function () {
  this.style.boxShadow = "none";
});

function hoverButton(btn) {
  btn.style.boxShadow = "0 2px 16px -1px #007bff";
}
function unhoverButton(btn) {
  btn.style.boxShadow = "0 2px 8px -1px #007bff";
}
var buttons = document.querySelectorAll(".quiz-div button");
buttons.forEach(function (button) {
  button.addEventListener("mouseover", function () {
    hoverButton(this);
  });
  button.addEventListener("mouseout", function () {
    unhoverButton(this);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var h2 = document.querySelector(".quiz-h1");

  anime({
    targets: ".quiz-h1",
    opacity: 1,
    duration: 2000,
    easing: "easeInOutQuad",
    delay: anime.stagger(100, { start: 100 }), // Задержка для каждой буквы
    autoplay: true,
  });
});
