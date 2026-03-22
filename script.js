
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById
    ('task-input');
    const addTaskButton = document.getElementById
    ('add-task-button');
    const taskList = document.getElementById
    ('task-list');
    const todosContainer = document.querySelector('.todos-container');

    const updateEmptyState = () => {
        if(taskList.children.length === 0) {
            todosContainer.classList.add('empty');
        } else {
            todosContainer.classList.remove('empty');
        }
    }

    const addTask = (text, completed = false) => {
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
        });

        editButton.addEventListener('click', () => {
            if(!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                updateEmptyState();
            }
        });

        li.querySelector('.delete-button').
        addEventListener('click', () => {
            li.remove();
            updateEmptyState();
        });


        taskList.appendChild(li);
        taskInput.value = '';
    };

    addTaskButton.addEventListener('click', () => 
        addTask());
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });
});

