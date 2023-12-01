const questions = [
    "Do you find yourself less interested in your classes or academic activities than before?",
    "Have you noticed a decline in your enthusiasm for learning?",
    "Do you tend to need more time than before to complete your academic assignments or prepare for exams",
    "Have you found it challenging to balance your academic workload with other aspects of your life",
    "Do you find yourself avoiding interactions with classmates or participating less in group activities",
    "Have you noticed a decrease in your social engagement related to academic events or discussions?",
    "Have you noticed any changes in your social interactions or withdrawal from social activities?",
    "Do you question the relevance of what you're studying to your future goals?",
    "Have you found it challenging to see the practical application of your academic work?",
    "Have you experienced a lack of excitement or passion about your academic pursuits?",
    "Have you experienced a decrease in motivation or a sense of apathy toward your academic goals?",
    "Do you feel emotionally disconnected or indifferent toward your coursework?",
    "Do you often feel mentally exhausted or overwhelmed by the demands of your coursework?",
    "Have you experienced difficulties concentrating or focusing on your studies?",
    "Have you noticed an increase in feelings of stress, anxiety, or frustration related to your academic responsibilities?",
    "Do you find that your studies are emotionally draining, leaving you feeling emotionally exhausted?",
    "Are you able to engage in activities you enjoy outside of school?",
    "Do you struggle to find meaning or purpose in your academic pursuits?"
];

const maxQuestionsPerPage = 4;
let currentPage = 0;

function renderQuestions(page) {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';

    for (let i = page * maxQuestionsPerPage; i < (page + 1) * maxQuestionsPerPage && i < questions.length; i++) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionText = document.createElement('p');
        questionText.textContent = `${i + 1}. ${questions[i]}`;
        questionDiv.appendChild(questionText);

        const selectDropdown = document.createElement('select');
        selectDropdown.classList.add('select-dropdown');
        for (let j = 1; j <= 5; j++) {
            const option = document.createElement('option');
            option.value = j;
            option.text = j;
            selectDropdown.add(option);
        }
        questionDiv.appendChild(selectDropdown);

        questionsContainer.appendChild(questionDiv);
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        renderQuestions(currentPage);
    }
}

function nextPage() {
    if (currentPage < Math.ceil(questions.length / maxQuestionsPerPage) - 1) {
        currentPage++;
        renderQuestions(currentPage);
    } else {}
}

// Initial render
renderQuestions(currentPage);
