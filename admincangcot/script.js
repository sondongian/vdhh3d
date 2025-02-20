// Lấy dữ liệu từ LocalStorage hoặc tạo danh sách mới nếu chưa có
let questions = JSON.parse(localStorage.getItem('questions')) || [];

// Hiển thị danh sách câu hỏi trong bảng
function displayQuestions() {
    let list = document.getElementById('questionList');
    if (!list) return;

    list.innerHTML = ""; // Xóa dữ liệu cũ trước khi render lại

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

    // Cập nhật dữ liệu trong LocalStorage
    localStorage.setItem('questions', JSON.stringify(questions));
}

// Thêm câu hỏi mới vào danh sách
function addQuestion() {
    let question = document.getElementById('questionInput').value.trim();
    let answer = document.getElementById('answerInput').value.trim();

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
    if (confirm("❌ Bạn có chắc chắn muốn xóa câu hỏi này?")) {
        questions.splice(index, 1);
        localStorage.setItem('questions', JSON.stringify(questions));
        displayQuestions();
    }
}

// Chỉnh sửa câu hỏi
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

// Gọi hàm hiển thị khi trang được tải
window.onload = displayQuestions;
