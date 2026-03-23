
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById
    ('task-input');
    const addTaskButton = document.getElementById
    ('add-task-button');
    const taskList = document.getElementById
    ('task-list');
    const todosContainer = document.querySelector('.todos-container');
    const progressBar = document.getElementById('progress');
    const progressNumbers = document.getElementById('numbers');

    const updateEmptyState = () => {
        if(taskList.children.length === 0) {
            todosContainer.classList.add('empty');
        } else {
            todosContainer.classList.remove('empty');
        }
    }

    const updateProgress = (checkCompletion = true) => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

        progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
        progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

        if(checkCompletion && totalTasks > 0 && completedTasks === totalTasks) {
            Confetti();
        }
    };

    const saveTasks = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.completed, false));
        updateProgress();
    }


    const addTask = (text, completed = false, checkCompletion = true) => { 
        const taskText = text || taskInput.value.trim();
        if(!taskText) {
            return;
        }
        
        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="edit-button"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editButton = li.querySelector('.edit-button');

        if (completed) {
            li.classList.add('completed');
            editButton.disabled = true;
            editButton.style.opacity = '0.5';
            editButton.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editButton.disabled = isChecked;
            editButton.style.opacity = isChecked ? '0.5' : '1';
            editButton.style.pointerEvents = isChecked ? 'none' : 'auto';
            updateProgress();
            saveTasks();
        });

        editButton.addEventListener('click', () => {
            if(!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                updateEmptyState();
                updateProgress(false);
                saveTasks();
            }
        });

        li.querySelector('.delete-button').
        addEventListener('click', () => {
            li.remove();
            updateEmptyState();
            updateProgress();
            saveTasks();
        });


        taskList.appendChild(li);
        taskInput.value = '';
        updateEmptyState();
        updateProgress(checkCompletion);
        saveTasks();
    };

    addTaskButton.addEventListener('click', () => 
        addTask());
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });

    loadTasks();
});

const Confetti = () => {
    var defaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8']
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ['star']
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 0.75,
    shapes: ['circle']
  });
}

setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);
};

