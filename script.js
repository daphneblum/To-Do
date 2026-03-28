
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
    };


    const burnTask = (li) => {
        const span = li.querySelector('span');
        const text = span.textContent;
        
        span.innerHTML = text.split('').map(ch =>
            `<span class="burn-letter">${ch === ' ' ? '&nbsp;' : ch}</span>`
        ).join('');

        const letters = span.querySelectorAll('.burn-letter');
        const totalDuration = 400 + letters.length * 40;

        letters.forEach((letter, i) => {
            const delay = i * 40;

            setTimeout(() => {
                letter.style.transition = 'color 0.3s, text-shadow 0.3s, opacity 0.6s, transform 0.8s';
                letter.style.color = 'rgba(255, 200, 30, 1)';
                letter.style.textShadow = `
                    0 0 8px rgba(255, 80, 20, 1),
                    0 0 20px rgba(220, 30, 0, 0.9),
                    0 0 40px rgba(180, 10, 0, 0.7),
                    0 0 60px rgba(140, 0, 0, 0.5)
            `;

            // Phase 2: letter fades out upward
            setTimeout(() => {
                letter.style.color = 'rgba(255, 80, 0, 0)';
                letter.style.opacity = '0';
                letter.style.transform = `translateY(-${10 + Math.random() * 15}px) rotate(${(Math.random() - 0.5) * 15}deg)`;
                letter.style.textShadow = 'none';
                letter.style.filter = 'blur(4px)';
            }, 250);

            }, delay);
        });

        setTimeout(() => {
            li.remove();
            updateEmptyState();
            updateProgress();
            saveTasks();
        }, totalDuration);
    }
    const addTask = (text, completed = false, checkCompletion = true) => { 
        const taskText = text || taskInput.value.trim();
        if(!taskText) {
            return;
        }
        
        const li = document.createElement('li');
        li.dataset.text = taskText;
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="edit-button"><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editButton = li.querySelector('.edit-button');
        const textSpan = li.querySelector('span');

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

        // li.querySelector('.delete-button').
        // addEventListener('click', () => {
        //     li.remove();
        //     updateEmptyState();
        //     updateProgress();
        //     saveTasks();
        // });

        textSpan.addEventListener('click', () => {
            if(!li.classList.contains('burning')) {
                li.classList.add('burning');
                burnTask(li);
            }
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

function spawnParticle() {
  const particle = document.createElement('div');
  particle.classList.add('dust-particle');

  // randomize position, size, and duration for variety
  const x = Math.random() * 100;       // % across the screen
  const size = Math.random() * 20 + 10;  // 40px to 120px instead of 2-6px  
  const duration = Math.random() * 10 + 8; // 8s to 18s
  const delay = Math.random() * 5;      // slight extra delay

  particle.style.cssText = `
    left: ${x}vw;
    width: ${size}px;
    height: ${size}px;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
  `;

  document.body.appendChild(particle);

  // remove from DOM after animation ends to keep things clean
  particle.addEventListener('animationend', () => {
    particle.remove();
    spawnParticle(); // respawn so there are always particles on screen
  });
}

function createParticles() {
  const numParticles = 15;

  for (let i = 0; i < numParticles; i++) {
    setTimeout(() => {
      spawnParticle();
    }, i * 300);
  }
}
createParticles();

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

