$(document).ready(function () {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function renderTasks() {
      $('#taskList').empty();
      tasks.forEach((task, index) => {
        $('#taskList').append(`
          <li class="list-group-item task-item">
            <span class="task-text" contenteditable="false">${task}</span>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-success editBtn" data-index="${index}">Edit</button>
              <button class="btn btn-danger deleteBtn" data-index="${index}">Delete</button>
            </div>
          </li>
        `);
      });
    }
  
    $('#addTaskBtn').click(function () {
      const newTask = $('#taskInput').val().trim();
      if (newTask) {
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        $('#taskInput').val('');
      }
    });
  
    $('#taskList').on('click', '.deleteBtn', function () {
      const index = $(this).data('index');
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });
  
    $('#taskList').on('click', '.editBtn', function () {
      const $li = $(this).closest('li');
      const $span = $li.find('.task-text');
      const index = $(this).data('index');
  
      if ($(this).text() === 'Edit') {
        $span.attr('contenteditable', true).focus();
        $(this).text('Save').removeClass('btn-success').addClass('btn-warning');
      } else {
        tasks[index] = $span.text().trim();
        $span.attr('contenteditable', false);
        $(this).text('Edit').removeClass('btn-warning').addClass('btn-success');
        saveTasks();
      }
    });
  
    // Initial render
    renderTasks();
  });
  