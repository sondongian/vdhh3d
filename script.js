// Kiểm tra nếu có dữ liệu câu hỏi trong LocalStorage
let questions = JSON.parse(localStorage.getItem('questions')) || [];

// Hiển thị danh sách câu hỏi
function displayQuestions() {
    let list = document.getElementById('questionList');
    if (!list) return;

    list.innerHTML = "";
    questions.forEach((q, index) => {
        list.innerHTML += `
            <tr>
                <td>${q.question}</td>
                <td class="answer">${q.answer}</td>
                ${window.location.pathname.includes("admin.html") ? 
                `<td><button class="delete-btn" onclick="deleteQuestion(${index})">Xóa</button></td>` 
                : ""}
            </tr>`;
    });
}

// Thêm câu hỏi mới
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

// Xóa câu hỏi
function deleteQuestion(index) {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
        questions.splice(index, 1);
        localStorage.setItem('questions', JSON.stringify(questions));
        displayQuestions();
    }
}

// Tìm kiếm câu hỏi
function searchQuestion() {
    let keyword = document.getElementById('search').value.toLowerCase();
    let list = document.getElementById('questionList');
    list.innerHTML = "";

    questions.forEach((q) => {
        if (q.question.toLowerCase().includes(keyword)) {
            list.innerHTML += `
                <tr>
                    <td>${q.question}</td>
                    <td class="answer">${q.answer}</td>
                </tr>`;
        }
    });
}

// Tải dữ liệu khi trang được mở
window.onload = displayQuestions;
