// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "heSPbSU75-DMv1FEpVZ9J-auT0AUm93s971hACjo0AI",
    authDomain: "vdhh3dd.firebaseapp.com",
    databaseURL: "https://vdhh3dd-default-rtdb.firebaseio.com/"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Tham chiếu đến cơ sở dữ liệu Firebase
const db = firebase.database().ref("questions");

// ✅ Hiển thị danh sách câu hỏi từ Firebase
function displayQuestions() {
    db.on("value", (snapshot) => {
        let list = document.getElementById('questionList');
        list.innerHTML = ""; // Xóa dữ liệu cũ trước khi cập nhật danh sách mới

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

// ✅ Thêm câu hỏi mới vào Firebase
function addQuestion() {
    let question = document.getElementById('questionInput').value.trim();
    let answer = document.getElementById('answerInput').value.trim();

    if (question && answer) {
        db.push({ question, answer }).then(() => {
            alert("✅ Câu hỏi đã được thêm thành công!");
            document.getElementById('questionInput').value = "";
            document.getElementById('answerInput').value = "";
        }).catch(error => alert("❌ Lỗi khi thêm câu hỏi: " + error));
    } else {
        alert("❌ Vui lòng nhập đầy đủ thông tin.");
    }
}

// ✅ Xóa câu hỏi khỏi Firebase
function deleteQuestion(id) {
    if (confirm("❌ Bạn có chắc chắn muốn xóa câu hỏi này?")) {
        db.child(id).remove().then(() => {
            alert("✅ Câu hỏi đã bị xóa!");
        }).catch(error => alert("❌ Lỗi khi xóa câu hỏi: " + error));
    }
}

// ✅ Chỉnh sửa câu hỏi trong Firebase
function editQuestion(id, oldQuestion, oldAnswer) {
    let newQuestion = prompt("📝 Nhập câu hỏi mới:", oldQuestion);
    let newAnswer = prompt("🔍 Nhập đáp án mới:", oldAnswer);

    if (newQuestion !== null && newAnswer !== null) {
        db.child(id).update({ question: newQuestion, answer: newAnswer }).then(() => {
            alert("✅ Câu hỏi đã được cập nhật!");
        }).catch(error => alert("❌ Lỗi khi cập nhật câu hỏi: " + error));
    }
}

// ✅ Gọi hàm hiển thị danh sách câu hỏi khi trang được tải
window.onload = displayQuestions;
