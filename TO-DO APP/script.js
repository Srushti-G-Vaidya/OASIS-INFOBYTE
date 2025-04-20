function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }

    const taskList = document.getElementById('taskList');

    
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${taskText}</span>
      <button onclick="deleteTask(this)">Delete</button>
    `;

    
    li.querySelector('span').addEventListener('click', () => {
      li.classList.toggle('completed');
    });

    taskList.appendChild(li);
    taskInput.value = ''; 
  }

  
  function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
  }