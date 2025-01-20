

let students = [];
let nextId = 1; // ID inicial para estudantes

// Função para carregar dados salvos ao abrir a página
function loadSavedGrades() {
    const savedData = localStorage.getItem("students");
    if (savedData) {
        students = JSON.parse(savedData);
        nextId = students.length > 0 ? Math.max(...students.map(s => parseInt(s.id))) + 1 : 1;
    }
}

// Função para limpar o formulário
function clearForm() {
    document.getElementById("ID").value = "";
    document.getElementById("name").value = "";
    document.getElementById("matricula").value = "";
    document.getElementById("nota_atribuida").value = "";
}

// Função para limpar o banco de dados
function clearDatabase() {
    if (confirm("Tem certeza de que deseja limpar todos os dados cadastrados?")) {
        students = [];
        localStorage.removeItem("students");
        nextId = 1;
        alert("Banco de dados limpo com sucesso!");
    }
}

// Função para salvar estudante
function saveGrades() {
    const name = document.getElementById("name").value.trim();
    const matricula = document.getElementById("matricula").value.trim();
    const grade = parseFloat(document.getElementById("nota_atribuida").value);

    if (name && matricula && !isNaN(grade) && grade >= 0 && grade <= 20) {
        const id = nextId++;
        students.push({ id, name, matricula, grade });
        localStorage.setItem("students", JSON.stringify(students));
        alert("Estudante cadastrado com sucesso!");
        clearForm();
    } else {
        alert("Preencha todos os campos corretamente antes de salvar.");
    }
}

// Função para exibir o formulário de consulta
function showSecondaryForm() {
    document.getElementById("secondaryForm").style.display = "flex";
}

// Função para fechar o formulário de consulta
function closeSecondaryForm() {
    document.getElementById("secondaryForm").style.display = "none";
    document.getElementById("consultaMatricula").value = "";
    document.getElementById("consultaNome").value = "";
    document.getElementById("consultaNota").value = "";
}

// Preencher automaticamente detalhes do estudante com base no número de matrícula
function autoFillStudentDetails() {
    const matricula = document.getElementById("consultaMatricula").value.trim();
    const student = students.find(s => s.matricula === matricula);

    if (student) {
        document.getElementById("consultaNome").value = student.name;
        document.getElementById("consultaNota").value = student.grade;
    } else {
        document.getElementById("consultaNome").value = "Não encontrado";
        document.getElementById("consultaNota").value = "";
    }
}

// Inicialização
loadSavedGrades();