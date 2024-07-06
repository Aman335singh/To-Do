let tasks = [];

// Load tasks from localStorage if available
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event, status) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("text");
  const task = tasks.find(task => task.id.toString() === taskId);
  if (task) {
    task.status = status;
    saveTasksToLocalStorage();
    renderTasks();
  }
}

function openNewTaskModal(status) {
  const title = prompt("Enter task title:");
  if (title) {
    const description = prompt("Enter task description:");
    const id = tasks.length + 1;
    tasks.push({ id, title, description, status });
    saveTasksToLocalStorage();
    renderTasks();
  }
}

function openTaskDetails(taskId) {
  const task = tasks.find(task => task.id.toString() === taskId);
  if (task) {
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskStatus").value = task.status;
    document.getElementById("taskDetailsModal").style.display = "block";
  }
}

function closeTaskDetailsModal() {
  document.getElementById("taskDetailsModal").style.display = "none";
}

function saveTaskChanges() {
  const taskId = document.getElementById("taskTitle").value;
  const taskIndex = tasks.findIndex(task => task.title === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].title = document.getElementById("taskTitle").value;
    tasks[taskIndex].description = document.getElementById("taskDescription").value;
    tasks[taskIndex].status = document.getElementById("taskStatus").value;
    saveTasksToLocalStorage();
    renderTasks();
    closeTaskDetailsModal();
  }
}

function deleteTask() {
  const taskId = document.getElementById("taskTitle").value;
  const index = tasks.findIndex(task => task.title === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
    closeTaskDetailsModal();
  }
}

function addNewStatus() {
  const newStatus = prompt("Enter new status:");
  if (newStatus) {
    tasks.forEach(task => {
      if (task.status === newStatus) {
        return;
      }
    });
    const newStatusColumn = document.createElement("div");
    newStatusColumn.className = "status-column";
    newStatusColumn.id = newStatus;
    newStatusColumn.innerHTML = `
      <h2>${newStatus} <span class="task-count"></span></h2>
      <div class="task-list" ondrop="drop(event, '${newStatus}')" ondragover="allowDrop(event)"></div>
      <button onclick="openNewTaskModal('${newStatus}')">New</button>
    `;
    document.querySelector(".project-board").insertBefore(newStatusColumn, document.querySelector(".project-board").lastChild);
  }
}

function renderTasks() {
  const columns = document.querySelectorAll(".task-list");
  columns.forEach(column => column.innerHTML = "");
  tasks.forEach(task => {
    const taskElement = document.createElement("div");
    taskElement.textContent = task.title;
    taskElement.id = task.id;
    taskElement.draggable = true;
    taskElement.addEventListener("dragstart", drag);
    taskElement.addEventListener("click", () => openTaskDetails(task.id.toString()));
    document.getElementById(task.status).querySelector(".task-list").appendChild(taskElement);
  });
  updateTaskCount();
}

function updateTaskCount() {
    const columns = document.querySelectorAll(".status-column");
    columns.forEach(column => {
      const status = column.id;
      const taskCount = tasks.filter(task => task.status === status).length;
      column.querySelector(".task-count").textContent = `(${taskCount})`;
    });
  }
  

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTasks();






let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      console.log(tasks);

      renderTasks();

      function allowDrop(event) {
        event.preventDefault();
      }

      function drop(event, status) {
        event.preventDefault();
        const taskId = event.dataTransfer.getData("text");
        const task = tasks.todo
          .concat(tasks.inProgress, tasks.done)
          .find((task) => task.id.toString() === taskId);
        if (task) {
          task.status = status;
          saveTasksToLocalStorage();
          renderTasks();
        }
      }

      function openNewTaskModal(status) {
        const title = prompt("Enter task title:");
        if (title) {
          const description = prompt("Enter task description:");
          const id = Date.now();
          const newTask = { id, title, description, status };
          tasks[status].push(newTask);
          saveTasksToLocalStorage();
          renderTasks();
        }
      }

      function openTaskDetails(taskId) {
        const task = tasks.todo
          .concat(tasks.inProgress, tasks.done)
          .find((task) => task.id === parseInt(taskId));
        if (task) {
          document.getElementById("taskTitle").value = task.title;
          document.getElementById("taskDescription").value = task.description;
          document.getElementById("taskStatus").value = task.status;
          document.getElementById("taskDetailsModal").style.display = "block";
        }
      }

      function closeTaskDetailsModal() {
        document.getElementById("taskDetailsModal").style.display = "none";
      }

      function saveTaskChanges() {
        const taskId = document.getElementById("taskTitle").value;
        const task = tasks.todo
          .concat(tasks.inProgress, tasks.done)
          .find((task) => task.id === parseInt(taskId));
        if (task) {
          task.title = document.getElementById("taskTitle").value;
          task.description = document.getElementById("taskDescription").value;
          task.status = document.getElementById("taskStatus").value;
          saveTasksToLocalStorage();
          renderTasks();
          closeTaskDetailsModal();
        }
      }

      function deleteTask() {
        const taskId = document.getElementById("taskTitle").value;
        const taskIndex = tasks.todo
          .concat(tasks.inProgress, tasks.done)
          .findIndex((task) => task.id === parseInt(taskId));
        if (taskIndex !== -1) {
          tasks[task.status].splice(taskIndex, 1);
          saveTasksToLocalStorage();
          renderTasks();
          closeTaskDetailsModal();
        }
      }

      function addNewStatus() {
        const newStatus = prompt("Enter new status:");
        if (newStatus) {
          tasks[newStatus] = [];
          const newStatusColumn = document.createElement("div");
          newStatusColumn.className = "status-column";
          newStatusColumn.id = newStatus;
          newStatusColumn.innerHTML = `
              <h2>${newStatus} <span class="task-count"></span></h2>
              <div class="task-list" ondrop="drop(event, '${newStatus}')" ondragover="allowDrop(event)"></div>
              <button onclick="openNewTaskModal('${newStatus}')">New</button>
            `;
          document
            .querySelector(".project-board")
            .insertBefore(
              newStatusColumn,
              document.querySelector(".project-board").lastChild
            );
        }
      }

      function renderTasks() {
        const columns = document.querySelectorAll(".task-list");
        columns.forEach((column) => (column.innerHTML = ""));
        tasks.todo.concat(tasks.inProgress, tasks.done).forEach((task) => {
          const taskElement = document.createElement("div");
          taskElement.textContent = task.title;
          taskElement.id = task.id;
          taskElement.draggable = true;
          taskElement.addEventListener("dragstart", drag);
          taskElement.addEventListener("click", () =>
            openTaskDetails(task.id.toString())
          );
          document
            .getElementById(task.status)
            .querySelector(".task-list")
            .appendChild(taskElement);
        });
        updateTaskCount();
      }

      function updateTaskCount() {
        const columns = document.querySelectorAll(".status-column");
        columns.forEach((column) => {
          const status = column.id;
          const taskCount = tasks[status].length;
          column.querySelector(".task-count").textContent = `(${taskCount})`;
        });
      }

      function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
