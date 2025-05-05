let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    if (todo.done) listItem.classList.add("done");

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.onclick = () => {
      todos[index].done = !todos[index].done;
      saveTodos();
      renderTodos();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.className = "btn logout";
    deleteBtn.style.backgroundColor = "#f15bb5";
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    };

    listItem.appendChild(span);
    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);
  });
}

function addTodo() {
  const input = document.getElementById("todoInput");
  const value = input.value.trim();
  if (value === "") return;

  todos.push({ text: value, done: false });
  input.value = "";
  saveTodos();
  renderTodos();
}

// Jalankan hanya jika halaman memiliki daftar
if (document.getElementById("todoList")) {
  renderTodos();
}
