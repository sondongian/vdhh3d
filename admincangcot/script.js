let questions = JSON.parse(localStorage.getItem('questions')) || [];

function displayQuestions() {
    let list = document.getElementById('questionList');
    if (!list) return;

    list.innerHTML = "";
    questions.forEach((q, index) => {
        list.innerHTML += `
            <tr>
                <td>${q.question}</td>
                <td class="answer">${q.answer}</td>
                <td>
                    <button class="edit-btn" onclick="editQuestion(${index})">✏️ Sửa</button>
                    <button class="delete-btn" onclick="deleteQuestion(${index})">🗑️ Xóa</button>
                </td>
            </tr>`;
    });
}

function addQuestion() {
    let question = document.getElementById('questionInput').value;
    let answer = document.getElementById('answerInput').value;

    if (question && answer) {
        questions.push({ question, answer });
        localStorage.setItem('questions', JSON.stringify(questions));
        document.getElementById('questionInput').value = "";
        document.getElementById('answerInput').value = "";
        alert("✅ Câu hỏi đã được thêm!");
        displayQuestions();
    } else {
        alert("❌ Vui lòng nhập đầy đủ thông tin.");
    }
}

function deleteQuestion(index) {
    if (confirm("❌ Bạn có chắc chắn muốn xóa câu hỏi này?")) {
        questions.splice(index, 1);
        localStorage.setItem('questions', JSON.stringify(questions));
        displayQuestions();
    }
}

function editQuestion(index) {
    let newQuestion = prompt("📝 Nhập câu hỏi mới:", questions[index].question);
    let newAnswer = prompt("🔍 Nhập đáp án mới:", questions[index].answer);
    
    if (newQuestion !== null && newAnswer !== null) {
        questions[index].question = newQuestion;
        questions[index].answer = newAnswer;
        localStorage.setItem('questions', JSON.stringify(questions));
        displayQuestions();
    }
}

// Tải dữ liệu khi trang được mở
window.onload = displayQuestions;
