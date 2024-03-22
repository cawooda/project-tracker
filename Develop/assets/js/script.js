// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
let modalForm = $('#modal-form').dialog({
        autoOpen: false,
      height: 200,
      width: 350,
      modal: true
      }
);
const $dueDate = $('#due-date').datepicker();
const $addTaskBtn = $('#add-task-btn');

// Todo: create a function to generate a unique task id
//
function generateTaskId() {
    return taskList.length() + 1;
    //read the length of the tasklist and return the next task number
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    
    const $taskName = $("<h2></h2>");
    $taskName.text(task.name);

    const $taskDueDate = $("<p></p>");
    $taskDueDate.text(task.dueDate);

    const $taskDescription = $("<p></p>");
    $taskDueDate.text(task.description);


    const $taskCard = $("<div></div>")
    $taskCard.append($taskCard)
    return $taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    //create a task from the information given
    // task list will need to have a new task added to it.

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    addTaskBtn.on('click',function (){
        modalForm.dialog('open');
    })
});
