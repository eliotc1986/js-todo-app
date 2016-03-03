var todoApp = (function() {

'use strict';

var taskInput;
var addTaskBtn;
var incompleteTasksList;
var completedTasksList;

// SET-UP FUNCTIONS
// ================

function init() {
  cacheDom();
  bindEvents();
}

function cacheDom() {
  taskInput = document.getElementById('new-task');
  addTaskBtn = document.getElementById('add-task');
  incompleteTasksList = document.getElementById('incomplete-tasks');
  completedTasksList = document.getElementById('completed-tasks');
}

function bindEvents() {
  addTaskBtn.addEventListener('click', addTask, false);

  for (var i = 0; i < incompleteTasksList.children.length; i++) {
    bindTaskEvents(incompleteTasksList.children[i], completeTask);
  }

  for (var i = 0; i < completedTasksList.children.length; i++) {
    bindTaskEvents(completedTasksList.children[i], incompleteTask);
  }
}

// CREATE TASK ITEM
// ================

function createNewTask(taskString) {
  var listItem = document.createElement('li');
  var checkBox = document.createElement('input');
  var label = document.createElement('label');
  var editInput = document.createElement('input');
  var editBtn = document.createElement('button');
  var deleteBtn = document.createElement('button');

  checkBox.type = 'checkbox';
  editInput.type = 'text';

  editBtn.innerText = 'Edit';
  editBtn.className = 'edit';
  deleteBtn.innerText = 'Delete';
  deleteBtn.className = 'delete';

  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);

  return listItem;
}


// ADD TASK
// ========

function addTask() {
  var str = taskInput.value.trim();

  if(str) {
    var listItem = createNewTask(taskInput.value);
    incompleteTasksList.appendChild(listItem);
    bindTaskEvents(listItem, completeTask);
    taskInput.value = '';
    console.log("Task added");
  } else {
    alert("Textfield cannot be blank");
  }
}

// EDIT TASK
// =========

function editTask() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  var editBtn = listItem.querySelector('button.edit');
  var hasClass = listItem.classList.contains('editMode');

  if(hasClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
      editInput.value = label.innerText;
      editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');

  var inputVisible = editInput.offsetParent !== null;

  if(inputVisible) {
    editInput.select();
  }
}

// DELETE TASK
// ===========

function deleteTask() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
  console.log("Task deleted");
}

// COMPLETE TASK
// =============

function completeTask() {
  var listItem = this.parentNode;
  var hasClass = listItem.classList.contains('editMode');

  completedTasksList.appendChild(listItem);

  bindTaskEvents(listItem, incompleteTask);

  if(hasClass) {
    listItem.classList.remove('editMode');
  }

  console.log("Task changed to complete");
}

// MARK TASK AS INCOMPLETE
// =======================

function incompleteTask() {
  var listItem = this.parentNode;
  var hasClass = listItem.classList.contains('editMode');

  incompleteTasksList.appendChild(listItem);

  bindTaskEvents(listItem, completeTask);

  if(hasClass) {
    listItem.classList.remove('editMode');
  }

  console.log("Task changed to incomplete");
}

// BIND MULTIPLE EVENT LISTENERS
// =============================

function bindTaskEvents(listItem, checkboxEventHandler) {
  var checkBox = listItem.querySelector('input[type=checkbox]');
  var editBtn = listItem.querySelector('button.edit');
  var deleteBtn = listItem.querySelector('button.delete');
  var label = listItem.querySelector('label');
  var editInput = listItem.querySelector('input[type=text');

  label.onclick = editTask;
  editBtn.onclick = editTask;
  deleteBtn.onclick = deleteTask;
  checkBox.onclick = checkboxEventHandler;
}

return {
  load: init
};

})();

todoApp.load();
