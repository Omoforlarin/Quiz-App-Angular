const questions = [
    {
        question: "The tallest building in the world is located in which city?",
        answers:[
            {text:"Cairo", correct: false},
            {text:"Dubai", correct: true},
            {text:"Accra", correct: false},
            {text:"Lagos", correct: false},
        ]
    },
    { 
        question: "What is the capital city of Australia?",
        answers:[
            {text:"Canberra", correct: true},
            {text:"Botswana", correct: false},
            {text:"Angola", correct: false},
            {text:"Rabat", correct: false},
        ]

    }, 
    {
        question: "Which continent is the largest desert in the world  located?",
        answers:[
        {text:"Asia", correct: false},
        {text:"Europe", correct: false},
        {text:"Africa", correct: false},
        {text:"Antarctica", correct: true},
    
     ]

    },
    {
        question: "What is the chemical symbol for gold?",
        answers:[
            {text:"Zn", correct: false},
            {text:"Ni", correct: false},
            {text:"Au", correct: true},
            {text:"Mg", correct: false},
    
    ]
    },

    {
        question: "What is the largest planet in the solar system?",
        answers:[
            {text:"Mars", correct: false},
            {text:"Jupiter", correct: true},
            {text:"Pluto", correct: false},
            {text:"Earth", correct: false},
    
    ]
}  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct =answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
          button.classList.add("correct");
        }
        button.disabled = true;
        });
        nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block"; 
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
