// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "heSPbSU75-DMv1FEpVZ9J-auT0AUm93s971hACjo0AI",
    authDomain: "https://vdhh3dd-default-rtdb.firebaseio.com/",
    databaseURL: "https://vdhh3dd-default-rtdb.firebaseio.com/"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref("questions");

// Thêm câu hỏi vào Firebase
function addQuestion() {
    let question = document.getElementById('questionInput').value.trim();
    let answer = document.getElementById('answerInput').value.trim();

    if (question && answer) {
        db.push({ question, answer }).then(() => {
            alert("✅ Câu hỏi đã được thêm!");
            document.getElementById('questionInput').value = "";
            document.getElementById('answerInput').value = "";
        }).catch(error => alert("❌ Lỗi khi thêm câu hỏi: " + error));
    } else {
        alert("❌ Vui lòng nhập đầy đủ thông tin.");
    }
}

// Hiển thị câu hỏi từ Firebase
function displayQuestions() {
    db.on("value", (snapshot) => {
        let list = document.getElementById('questionList');
        list.innerHTML = "";
        snapshot.forEach((child) => {
            let data = child.val();
            list.innerHTML += `
                <tr>
                    <td>${data.question}</td>
                    <td>${data.answer}</td>
                    <td>
                        <button class="edit-btn" onclick="editQuestion('${child.key}', '${data.question}', '${data.answer}')">✏️ Sửa</button>
                        <button class="delete-btn" onclick="deleteQuestion('${child.key}')">🗑️ Xóa</button>
                    </td>
                </tr>`;
        });
    });
}

// Xóa câu hỏi khỏi Firebase
function deleteQuestion(id) {
    if (confirm("❌ Bạn có chắc chắn muốn xóa câu hỏi này?")) {
        db.child(id).remove().then(() => {
            alert("✅ Câu hỏi đã bị xóa!");
        }).catch(error => alert("❌ Lỗi khi xóa câu hỏi: " + error));
    }
}

// Chỉnh sửa câu hỏi trong Firebase
function editQuestion(id, oldQuestion, oldAnswer) {
    let newQuestion = prompt("📝 Nhập câu hỏi mới:", oldQuestion);
    let newAnswer = prompt("🔍 Nhập đáp án mới:", oldAnswer);

    if (newQuestion !== null && newAnswer !== null) {
        db.child(id).update({ question: newQuestion, answer: newAnswer }).then(() => {
            alert("✅ Câu hỏi đã được cập nhật!");
        }).catch(error => alert("❌ Lỗi khi cập nhật: " + error));
    }
}

// Gọi hàm hiển thị khi trang được tải
window.onload = displayQuestions;
