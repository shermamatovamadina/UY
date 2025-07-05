const baseURL = `https://6862202c96f0cc4e34b86226.mockapi.io/users/user/users`;

let openFormBtn = document.getElementById("openForm");
let formContainer = document.getElementById("formContainer");
let studentForm = document.getElementById("studentForm");
let tableBody = document.getElementById("tableBody");
let rowCount = 1;

openFormBtn.addEventListener("click", () => {
  formContainer.style.display = "block";
});

function closeForm() {
  formContainer.style.display = "none";
  studentForm.reset();
}

studentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let ism = document.getElementById("firstName").value;
  let familiya = document.getElementById("lastName").value;
  let manzil = document.getElementById("modalManzil").value;
  let tugilganKuni = document.getElementById("birthDate").value;
  let lavozim = document.getElementById("modalLavozim").value;
  let lavozimTuri = document.getElementById("lavozimTuri").value;
  let maosh = document.getElementById("salary").value;
  let uylangan = document.getElementById("married").checked ? "Ha" : "Yo'q";

  let newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${rowCount++}</td>
    <td>${ism}</td>
    <td>${familiya}</td>
    <td>${manzil}</td>
    <td>${tugilganKuni}</td>
    <td>${lavozim}</td>
    <td>${lavozimTuri}</td>
    <td>${maosh}</td>
    <td>${uylangan}</td>
    <td>
      <button onclick="editRow(this)" class="btn1">Edit</button>
      <button onclick="deleteRow(this)" class="btn2">Delete</button>
    </td>
  `;
  tableBody.appendChild(newRow);
  closeForm();
});

function deleteRow(button) {
  button.closest("tr").remove();
}

function editRow(button) {
  let row = button.closest("tr");
  let cells = row.querySelectorAll("td");

  document.getElementById("firstName").value = cells[1].innerText;
  document.getElementById("lastName").value = cells[2].innerText;
  document.getElementById("modalManzil").value = cells[3].innerText;
  document.getElementById("birthDate").value = cells[4].innerText;
  document.getElementById("modalLavozim").value = cells[5].innerText;
  document.getElementById("lavozimTuri").value = cells[6].innerText;
  document.getElementById("salary").value = cells[7].innerText;
  document.getElementById("married").checked = cells[8].innerText === "Ha";

  row.remove();
  formContainer.style.display = "block";
}


function saveToLocalStorage(data) {
  let allData = JSON.parse(localStorage.getItem("students")) || [];
  allData.push(data);
  localStorage.setItem("students", JSON.stringify(allData));
}


studentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let ism = document.getElementById("firstName").value;
  let familiya = document.getElementById("lastName").value;
  let manzil = document.getElementById("modalManzil").value;
  let tugilganKuni = document.getElementById("birthDate").value;
  let lavozim = document.getElementById("modalLavozim").value;
  let lavozimTuri = document.getElementById("lavozimTuri").value;
  let maosh = document.getElementById("salary").value;
  let uylangan = document.getElementById("married").checked ? "Ha" : "Yo'q";

  let student = {
    ism,
    familiya,
    manzil,
    tugilganKuni,
    lavozim,
    lavozimTuri,
    maosh,
    uylangan
  };

  saveToLocalStorage(student);

  addRowToTable(student); 
  closeForm();
});