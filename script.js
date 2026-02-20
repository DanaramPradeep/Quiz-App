const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language"],
        answer: 0
    },
    {
        question: "Which CSS property is used to change text color?",
        options: ["text-color", "font-color", "color", "text-style"],
        answer: 2
    },
    {
        question: "What is the correct way to declare a JavaScript variable?",
        options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
        answer: 0
    },
    {
        question: "Which HTML tag is used for creating a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1
    },
    {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"],
        answer: 1
    },
    {
        question: "Which JavaScript method is used to select an element by ID?",
        options: ["getElement()", "getElementById()", "selectId()", "findElement()"],
        answer: 1
    },
    {
        question: "What is the correct HTML tag for the largest heading?",
        options: ["<heading>", "<h6>", "<h1>", "<head>"],
        answer: 2
    },
    {
        question: "Which property is used in CSS to change the background color?",
        options: ["bgcolor", "background-color", "color-background", "bg-color"],
        answer: 1
    },
    {
        question: "What is the purpose of the 'alt' attribute in an <img> tag?",
        options: ["Alternative text for image", "Alignment of image", "Animation type", "Automatic loading"],
        answer: 0
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["<!-- -->", "/* */", "//", "Both B and C"],
        answer: 3
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let correctAnswers = 0;
let wrongAnswers = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next');
const resultEl = document.getElementById('result');
const timerEl = document.getElementById('timer');
const progressEl = document.getElementById('progress');
const questionNumberEl = document.getElementById('question-number');
const scoreDisplayEl = document.getElementById('score-display');

function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    questionNumberEl.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
    progressEl.style.width = `${((currentQuestion) / questions.length) * 100}%`;
    
    q.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.textContent = option;
        div.onclick = () => selectOption(index, div);
        optionsEl.appendChild(div);
    });
    
    nextBtn.style.display = 'none';
    startTimer();
}

function startTimer() {
    timeLeft = 15;
    timerEl.textContent = `⏱️ ${timeLeft}s`;
    clearInterval(timer);
    
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `⏱️ ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            autoSelectWrong();
        }
    }, 1000);
}

function autoSelectWrong() {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.onclick = null);
    
    const correct = questions[currentQuestion].answer;
    options[correct].classList.add('correct');
    wrongAnswers++;
    
    nextBtn.style.display = 'block';
}

function selectOption(selected, element) {
    clearInterval(timer);
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.onclick = null);
    const correct = questions[currentQuestion].answer;
    
    if (selected === correct) {
        element.classList.add('correct');
        score += timeLeft;
        correctAnswers++;
        scoreDisplayEl.textContent = `Score: ${score}`;
    } else {
        element.classList.add('wrong');
        options[correct].classList.add('correct');
        wrongAnswers++;
    }
    
    nextBtn.style.display = 'block';
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        clearInterval(timer);
        showResult();
    }
};

function showResult() {
    document.querySelector('.quiz-header').style.display = 'none';
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    nextBtn.style.display = 'none';
    resultEl.style.display = 'block';
    progressEl.style.width = '100%';
    
    const percentage = (correctAnswers / questions.length) * 100;
    let grade = percentage >= 80 ? '🏆 Excellent!' : percentage >= 60 ? '👍 Good Job!' : percentage >= 40 ? '📚 Keep Learning!' : '💪 Try Again!';
    
    resultEl.innerHTML = `
        <h2>Quiz Completed! ${grade}</h2>
        <div class="result-stats">
            <p>✅ Correct Answers: ${correctAnswers}</p>
            <p>❌ Wrong Answers: ${wrongAnswers}</p>
            <p>📊 Accuracy: ${percentage.toFixed(1)}%</p>
            <p>🎯 Total Score: ${score} points</p>
        </div>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
}

loadQuestion();
