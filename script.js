/* =====================================================
   CAREERPATH NAMIBIA
   JAVASCRIPT
   ===================================================== */


/* =====================================================
   MOBILE MENU
   ===================================================== */

function toggleMenu() {

    const navigation =
        document.getElementById("navigation");

    navigation.classList.toggle("show");

}


/* =====================================================
   CAREER SEARCH
   ===================================================== */

function searchCareers() {

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const cards =
        document
        .querySelectorAll(".career-card");


    cards.forEach(function(card) {

        const text =
            card.textContent.toLowerCase();


        if (text.includes(search)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* =====================================================
   CAREER FILTER
   ===================================================== */

function filterCareers() {

    const selected =
        document
        .getElementById("categoryFilter")
        .value;


    const cards =
        document
        .querySelectorAll(".career-card");


    cards.forEach(function(card) {

        const category =
            card.dataset.category;


        if (
            selected === "all" ||
            category === selected
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* =====================================================
   CAREER DETAILS POPUP
   ===================================================== */

function showCareer(
    careerName,
    category,
    description
) {

    const modal =
        document.getElementById("careerModal");

    const content =
        document.getElementById("modalContent");


    content.innerHTML = `

        <span class="tag">
            ${category}
        </span>

        <h2>
            ${careerName}
        </h2>

        <p>
            ${description}
        </p>

        <h3>
            Why consider this career?
        </h3>

        <p>
            This career can provide opportunities
            to develop professional skills and
            contribute to society.
        </p>

        <p>
            <strong>
                Important:
            </strong>

            Subject and admission requirements
            may differ between institutions.
            Always check the current requirements
            before making study decisions.
        </p>

    `;


    modal.classList.add("show");

}


/* =====================================================
   CLOSE CAREER POPUP
   ===================================================== */

function closeCareer() {

    document
        .getElementById("careerModal")
        .classList.remove("show");

}


/* Close popup when clicking outside */

document
    .getElementById("careerModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeCareer();

            }

        }
    );


/* =====================================================
   CAREER QUIZ
   ===================================================== */


/*
   Each number represents:

   0 = Technology
   1 = Medicine
   2 = Agriculture
   3 = Education
   4 = Business
   5 = Tourism
*/


const questions = [

    {
        question:
        "Which activity sounds most enjoyable?",

        answers: [
            "💻 Building a website or app",
            "🩺 Helping someone with a health problem",
            "🌱 Growing crops or caring for animals",
            "📚 Explaining something to learners",
            "💼 Starting a business",
            "✈️ Planning a trip or helping visitors"
        ]

    },


    {
        question:
        "Which school activity would you choose?",

        answers: [
            "💻 Computer programming",
            "🧬 Science and biology",
            "🌱 Practical agriculture",
            "📚 Presenting a lesson",
            "💼 Business project",
            "🗺️ Tourism or geography"
        ]

    },


    {
        question:
        "Which problem would you most like to solve?",

        answers: [
            "💻 A technology problem",
            "🩺 A health problem",
            "🌱 A food-production problem",
            "📚 A learning problem",
            "💼 A business problem",
            "✈️ A travel problem"
        ]

    },


    {
        question:
        "Which workplace sounds best?",

        answers: [
            "💻 Technology company",
            "🩺 Hospital or clinic",
            "🌱 Farm or research station",
            "📚 School",
            "💼 Business office",
            "🏨 Hotel or tourism site"
        ]

    },


    {
        question:
        "Which strength describes you best?",

        answers: [
            "💻 Logical and creative",
            "❤️ Caring and calm",
            "🌱 Practical and observant",
            "📚 Patient and communicative",
            "💼 Organised and ambitious",
            "✈️ Friendly and adventurous"
        ]

    },


    {
        question:
        "What would make you most proud?",

        answers: [
            "💻 Creating useful technology",
            "🩺 Improving someone's health",
            "🌱 Improving food production",
            "📚 Helping learners succeed",
            "💼 Building a successful business",
            "✈️ Creating memorable visitor experiences"
        ]

    }

];


let currentQuestion = 0;

let selectedAnswer = null;


let scores = [
    0,
    0,
    0,
    0,
    0,
    0
];


const careerAreas = [

    "Technology",

    "Medicine",

    "Agriculture",

    "Education",

    "Business",

    "Tourism"

];


/* =====================================================
   LOAD QUESTION
   ===================================================== */

function loadQuestion() {

    const question =
        questions[currentQuestion];


    document
        .getElementById("questionNumber")
        .textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;


    document
        .getElementById("question")
        .textContent =
        question.question;


    const answers =
        document
        .getElementById("answers");


    answers.innerHTML = "";


    question.answers.forEach(
        function(answer, index) {


            const button =
                document.createElement("button");


            button.textContent = answer;


            button.onclick =
                function() {

                    selectAnswer(
                        index,
                        button
                    );

                };


            answers.appendChild(button);

        }
    );


    const progress =
        ((currentQuestion + 1)
        / questions.length)
        * 100;


    document
        .getElementById("progressBar")
        .style.width =
        progress + "%";


    selectedAnswer = null;


    document
        .getElementById("quizMessage")
        .textContent = "";

}


/* =====================================================
   SELECT QUIZ ANSWER
   ===================================================== */

function selectAnswer(
    answerNumber,
    button
) {

    selectedAnswer =
        answerNumber;


    const buttons =
        document
        .querySelectorAll(
            "#answers button"
        );


    buttons.forEach(
        function(item) {

            item.classList.remove(
                "selected"
            );

        }
    );


    button.classList.add(
        "selected"
    );


    document
        .getElementById("quizMessage")
        .textContent = "";

}


/* =====================================================
   NEXT QUESTION
   ===================================================== */

function nextQuestion() {

    if (
        selectedAnswer === null
    ) {

        document
            .getElementById("quizMessage")
            .textContent =
            "Please select an answer first.";

        return;

    }


    scores[selectedAnswer]++;


    if (
        currentQuestion
        <
        questions.length - 1
    ) {

        currentQuestion++;

        loadQuestion();

    }

    else {

        showQuizResult();

    }

}


/* =====================================================
   SHOW QUIZ RESULT
   ===================================================== */

function showQuizResult() {

    let highestScore =
        Math.max(...scores);


    let results = [];


    scores.forEach(
        function(score, index) {

            if (
                score === highestScore
            ) {

                results.push(
                    careerAreas[index]
                );

            }

        }
    );


    const result =
        document
        .getElementById("quizResult");


    result.innerHTML = `

        <div class="quiz-box">

            <p class="small-title">
                YOUR CAREER MATCH
            </p>

            <h2>
                🎉 Your strongest interest
            </h2>

            <h3>
                ${results.join(" & ")}
            </h3>

            <p>
                Your answers suggest that
                you may be interested in
                ${results.join(" and ")}.
            </p>

            <p>
                Explore the Career Explorer
                above to learn more about
                careers in this area.
            </p>

            <button
                class="button"
                onclick="restartQuiz()"
            >
                Retake Quiz
            </button>

        </div>

    `;

}


/* =====================================================
   RESTART QUIZ
   ===================================================== */

function restartQuiz() {

    currentQuestion = 0;


    selectedAnswer = null;


    scores = [
        0,
        0,
        0,
        0,
        0,
        0
    ];


    document
        .getElementById("quizResult")
        .innerHTML = "";


    loadQuestion();

}


/* =====================================================
   FEEDBACK FORM
   ===================================================== */

function submitFeedback(event) {

    event.preventDefault();


    const name =
        document
        .getElementById("name")
        .value;


    document
        .getElementById("feedbackMessage")
        .textContent =
        "Thank you, " +
        name +
        "! Your feedback has been received.";


    document
        .getElementById("feedbackForm")
        .reset();

}


/* =====================================================
   START WEBSITE
   ===================================================== */

loadQuestion();