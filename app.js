const now = new Date();
const options = { year: "numeric", month: "short", day: "2-digit" };
const formattedDate = new Intl.DateTimeFormat("en-US", options)
  .format(now)
  .replace(",", "");
document.querySelector("#date").innerHTML = formattedDate;

const form = document.querySelector("form");
const input = document.querySelector("input");
const todoList = document.querySelector(".todo-list"); //ul
const filterTodo = document.querySelector(".filter-todo");

form.addEventListener("submit", addtodo);
todoList.addEventListener("click", deleteTodo);
document.addEventListener("DOMContentLoaded", getTodo);
filterTodo.addEventListener("click", filterTodos);

//if input value is empty   button disable
form.children[1].disabled = true;
// validate input
input.onkeyup = () => {
  if (input.value.length > 0) {
    form.children[1].disabled = false;
  } else {
    form.children[1].disabled = true;
  }
};

// create list in ul add todo
function addtodo(e) {
  e.preventDefault();
  console.log(input.value);
  //create li
  const li = document.createElement("li");
  li.classList = "todo-item";
  saveInLocalStorage(input.value);
  todoList.append(li);

  //create span
  const span = document.createElement("span");
  span.innerHTML = input.value;
  li.append(span);

  //create checked button
  const checkedbtn = document.createElement("button");
  checkedbtn.classList = "btn-checked";
  checkedbtn.innerHTML = ' <i class="fa-solid fa-check"></i>';
  li.append(checkedbtn);

  //create delete button
  const dltBtn = document.createElement("button");
  dltBtn.classList = "dlt-btn";
  dltBtn.innerHTML = '<i class="fa-solid fa-trash">';
  li.append(dltBtn);
  input.value = "";
  form.children[1].disabled = true;
}
// delete from list item
function deleteTodo(e) {
  const item = e.target;
  if (item.classList[0] === "dlt-btn") {
    const todo = item.parentElement;
    todo.remove();
    removeTodoFromLocalStorage(todo);
  }
  // checked complete task
  if (item.classList[0] === "btn-checked") {
    const todo = item.parentElement;
    todo.classList.toggle("checked-btn");
  }
}

//store data in localStoage data
function saveInLocalStorage(inputValue) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(inputValue);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// get todos (dom)
function getTodo() {
  let todos;
  if (localStorage.getItem("todos" === null)) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // get todo to localstorage on Dom
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList = "todo-item";
    todoList.append(li);

    //create span
    const span = document.createElement("span");
    span.innerHTML = todo;
    li.append(span);

    //create checked button
    const checkedbtn = document.createElement("button");
    checkedbtn.classList = "btn-checked";
    checkedbtn.innerHTML = ' <i class="fa-solid fa-check"></i>';
    li.append(checkedbtn);

    //create delete button
    const dltBtn = document.createElement("button");
    dltBtn.classList = "dlt-btn";
    dltBtn.innerHTML = '<i class="fa-solid fa-trash">';
    li.append(dltBtn);
  });
}

// dlt todo(dom, localstorage) refresh
function removeTodoFromLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos" === null)) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// filter todo
function filterTodos(e) {
  const todos = todoList.childNodes;
  todos.forEach((elmnt) => {
    switch (e.target.value) {
      case "all":
        elmnt.style.display = "flex";
        break;
      case "complete":
        if (elmnt.classList.contains("checked-btn")) {
          elmnt.style.display = "flex";
        } else {
          elmnt.style.display = "none";
        }
        break;
      case "uncomplete":
        if (!elmnt.classList.contains("checked-btn")) {
          elmnt.style.display = "flex";
        } else {
          elmnt.style.display = "none";
        }
        break;
    }
  });
}
