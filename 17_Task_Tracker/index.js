const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const todoList = document.getElementById("todoList");
const noTodo = document.getElementById("empty-state");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const renderTasks = () => {
  todoList.innerHTML = "";

  if (tasks.length === 0) {
    noTodo.style.display = "block";
  } else {
    noTodo.style.display = "none";
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    return a.completed - b.completed;
  });

  sortedTasks.forEach((task) => {
    const li = document.createElement("li");
    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = task.text;
    li.classList.toggle("completed", task.completed);

    li.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        return;
      }
      task.completed = !task.completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t !== task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    li.appendChild(taskTextSpan);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
};

renderTasks();

const addTask = (e) => {
  e.preventDefault();
  if (taskInput.value.trim() === "") {
    alert("Task cannot be empty!");
    return;
  }

  const newTask = {
    text: taskInput.value.trim(),
    completed: false,
  };

  tasks.unshift(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
};

form.addEventListener("submit", addTask);
