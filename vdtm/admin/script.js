let questions = JSON.parse(localStorage.getItem('questions')) || [];

// Hiển thị câu hỏi
function displayQuestions() {
    let table = document.getElementById('questionTable');
    table.innerHTML = "";

    questions.forEach((q, index) => {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.textContent = q.question;
        cell2.innerHTML = `<span class="answer">${q.answer}</span>`;
        cell3.innerHTML = `
            <button onclick="editQuestion(${index})">Sửa</button>
            <button class="delete" onclick="deleteQuestion(${index})">Xóa</button>
        `;
    });

    localStorage.setItem('questions', JSON.stringify(questions));
}

// Thêm câu hỏi
function addQuestion() {
    let question = document.getElementById('questionInput').value;
    let answer = document.getElementById('answerInput').value;

    if (question && answer) {
        questions.push({ question, answer });
        document.getElementById('questionInput').value = '';
        document.getElementById('answerInput').value = '';

        displayQuestions();
    } else {
        alert("Vui lòng nhập cả câu hỏi và đáp án!");
    }
}

// Xóa câu hỏi
function deleteQuestion(index) {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
        questions.splice(index, 1);
        displayQuestions();
    }
}

// Lưu dữ liệu
function saveData() {
    localStorage.setItem('questions', JSON.stringify(questions));
    alert("Dữ liệu đã lưu!");
}

window.onload = displayQuestions;
