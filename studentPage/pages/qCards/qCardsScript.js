const mainContainer = document.getElementById("main-container")
const topBttnRow = document.getElementById("bttn-row")
const subjectModal = document.getElementById("subject-modal")
const qaModal = document.getElementById("qANDa-modal")
const addSubjectBttn = document.getElementById("add-subject-bttn")
const addQuestionBttn = document.getElementById("add-question-bttn")
const areYouSureModal = document.getElementById("sure-modal")



let subjects = {
    Math: [
        { question: "What is 2 + 2?", answer: "4" },
        { question: "What is the square root of 16?", answer: "4" },
        { question: "What is the square root of 16?", answer: "4" },
        { question: "What is the square root of 16?", answer: "4" },
        { question: "What is the square root of 16?", answer: "4" },
        { question: "What is the square root of 16?", answer: "4" },
    ],
    Science: [
        { question: "What planet is known as the Red Planet?", answer: "Mars" },
        { question: "What is the chemical symbol for water?", answer: "H2O" }
    ],
    History: [
        { question: "Who was the first President of the United States?", answer: "George Washington" },
        { question: "In which year did World War II end?", answer: "1945" }
    ],
    English: [
        { question: "Who was the first President of the United States?", answer: "George Washington" },
        { question: "In which year did World War II end?", answer: "1945" }
    ],
    Spanish: [
        { question: "Who was the first President of the United States?", answer: "George Washington" },
        { question: "In which year did World War II end?", answer: "1945" }
    ]
};

function openSubjectModal(){
    subjectModal.classList.add("modal-active")

}

function closeSubjectModal(){
    subjectModal.classList.remove("modal-active")
}

function openQandAModal(){
    qaModal.classList.add("modal-active")

}

function closeQandAModal(){
    qaModal.classList.remove("modal-active")
}

function showSureModal(){
    areYouSureModal.classList.add("modal-active")
}
function closeSureModal(){
    areYouSureModal.classList.remove("modal-active")
}

function addSubject(){
    const newSubjectName = document.getElementById("subject-name").value;

    if (newSubjectName.trim() === "") {
        alert("Subject name cannot be empty!");
        return;
    }
    if (subjects[newSubjectName]) {
        alert("Subject already exists!");
        return;
    }
    subjects[newSubjectName] = [];
    closeSubjectModal()
    renderSubjects(subjects)
    document.getElementById("subject-name").value = "";
}

function removeSubject(subject) {
    
    subjectToDelete = subject;

    showSureModal()
}


function areYouSure(sure){
    if (sure){
        console.log("Confirm delete subject")
        delete subjects[subjectToDelete];
        renderSubjects(subjects)
        closeSureModal()
    }
    else{
        closeSureModal()
    }

}


function renderSubjects(subjects) {

    // Change the text and buttons on top of page
    topBttnRow.querySelector(".title").innerHTML = "Subjects"
    addSubjectBttn.classList.add("active")
    addQuestionBttn.classList.remove("active")


    mainContainer.innerHTML = ""
    Object.entries(subjects).forEach(([subject, questions]) => {
        // Create subject container
        const subjectCont = document.createElement('div');
        subjectCont.className = 'subject-cont';
        subjectCont.classList.add('active');
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.className = 'remove-bttn';
        removeButton.textContent = 'x';
        removeButton.addEventListener('click', () => {
            removeSubject(subject);
        });

        // Create subject title
        const title = document.createElement('h2');
        title.textContent = subject;

        // Create question count
        const questionCount = document.createElement('span');
        questionCount.textContent = `Number of questions: ${questions.length}`;

        // Create go-to-questions button
        const goToQuestionsButton = document.createElement('button');
        goToQuestionsButton.textContent = 'Go to questions';
        goToQuestionsButton.addEventListener('click', () => {
            renderQuestions(subject, questions);
        });

        // Append elements to subject container
        subjectCont.appendChild(removeButton);
        subjectCont.appendChild(title);
        subjectCont.appendChild(questionCount);
        subjectCont.appendChild(goToQuestionsButton);

        // Append subject container to the main container
        mainContainer.appendChild(subjectCont);

        
    });
}


function renderQuestions(subject, questions) {
    // Store page subject
    subjectPage = subject;

    // Change the text on top of page
    topBttnRow.querySelector(".title").innerHTML = "Questions"
    addSubjectBttn.classList.remove("active")
    addQuestionBttn.classList.add("active")

    const subjectConatiners = document.querySelectorAll(".subject-cont")

    // Hide subjects container
    subjectConatiners.forEach(subject=>{
        subject.classList.remove("active")
    })

    // Clear and show questions container
    mainContainer.innerHTML = '';

    // Create back button
    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.textContent = 'Back to Subjects';
    backButton.addEventListener('click', () => {
        renderSubjects(subjects)
    });

    // Append back button
    mainContainer.appendChild(backButton);

    // Create subject title
    const title = document.createElement('h2');
    title.textContent = `${subject} Questions`;
    mainContainer.appendChild(title);

    // Create question container
    const qCont = document.createElement('div')
    qCont.classList.add("questions-container")

    // Render questions and answers
    questions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
            
        `;
        questionElement.classList.add("qCard")

        const answerText = document.createElement('p');
        answerText.className = 'answer';
        answerText.innerHTML = `<strong>Answer ${index + 1}:</strong> ${q.answer}`;
        answerText.style.display = 'none'; // set the initial state

        const showAnswerButton = document.createElement('button');
        showAnswerButton.className = 'show-answer-btn';
        showAnswerButton.textContent = 'Show Answer';
        showAnswerButton.addEventListener('click', () => {
            answerText.style.display =
                answerText.style.display === 'none' ? 'block' : 'none';
            showAnswerButton.textContent =
                answerText.style.display === 'none' ? 'Show Answer' : 'Hide Answer';
        }); 
        questionElement.appendChild(answerText);
        questionElement.appendChild(showAnswerButton);

        const removeBttn = document.createElement('button');
        removeBttn.innerHTML = "x";
        removeBttn.classList.add("remove-bttn");
        removeBttn.style.float = "right";
        removeBttn.style.color = "var(--beige)";
        removeBttn.addEventListener("click", () =>{
            removeQuestion(q.question, q.answer)
        });
        
        questionElement.appendChild(removeBttn);


        qCont.appendChild(questionElement);
    });

    // Create + button at the end of the list


    mainContainer.appendChild(qCont);

}


function addQuestion() {

    const question = document.getElementById("question-input").value;
    const answer = document.getElementById("answer-input").value;


    subjects[subjectPage].push({ question, answer });
    closeQandAModal()

    renderQuestions(subjectPage, subjects[subjectPage]); // Re-render after adding

}

function removeQuestion(questionToDelete, answerToDelete){
    subjects[subjectPage] = subjects[subjectPage].filter((q) => !(q.question === questionToDelete && q.answer === answerToDelete))

    renderQuestions(subjectPage, subjects[subjectPage])

}


document.addEventListener("DOMContentLoaded", () => {

    // render subject page 
    renderSubjects(subjects)
})




