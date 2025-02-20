// Lấy danh sách câu hỏi từ LocalStorage hoặc khởi tạo rỗng
let questions = JSON.parse(localStorage.getItem('questions')) || [];

// Hiển thị câu hỏi
function displayQuestions() {
    let table = document.getElementById('questionTable');
    table.innerHTML = "";

    questions.forEach(q => {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.textContent = q.question;
        cell2.innerHTML = `<span class="answer">${q.answer}</span>`;
    });
}

// Tìm kiếm câu hỏi
function searchQuestion() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let table = document.getElementById('questionTable');
    let rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        let questionCell = rows[i].getElementsByTagName('td')[0];
        if (questionCell) {
            let questionText = questionCell.textContent.toLowerCase();
            if (questionText.includes(input)) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

// Hiển thị dữ liệu khi trang tải
window.onload = displayQuestions;
