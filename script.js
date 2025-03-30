let currentQuestion = 0;
let answers = [];
let score = 0;

function startTest() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('test-screen').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    const progressPercentage = ((currentQuestion) / questions.length) * 100;
    
    document.getElementById('progress-fill').style.width = `${progressPercentage}%`;
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => handleAnswer(index);
        
        if (answers[currentQuestion] === index) {
            button.classList.add('selected');
        }
        
        optionsContainer.appendChild(button);
    });
}

function handleAnswer(answerId) {
    answers[currentQuestion] = answerId;
    
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[answerId].classList.add('selected');
    
    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            calculateResults();
        }
    }, 500);
}

function calculateResults() {
    score = answers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const iqScore = Math.round(85 + (score / questions.length) * 30);
    
    document.getElementById('test-screen').classList.add('hidden');
    document.getElementById('results-screen').classList.remove('hidden');
    document.getElementById('iq-score').textContent = iqScore;
    document.getElementById('correct-answers').textContent = score;
    document.getElementById('total-questions').textContent = questions.length;
}

function retakeTest() {
    currentQuestion = 0;
    answers = [];
    score = 0;
    document.getElementById('results-screen').classList.add('hidden');
    document.getElementById('test-screen').classList.remove('hidden');
    showQuestion();
}