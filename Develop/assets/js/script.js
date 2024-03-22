// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
let $modalForm = $('#modal-form');
let $taskName = $('#modal-form #task-name');
let $taskDescription = $('#modal-form #task-description');
let $taskDueDate = $('#modal-form #due-date');

$modalForm.dialog({
        autoOpen: false,
        minHeight: 200,
      minWidth: 400,
      modal: true
      }
);
let $modaFormSubmit = $('#task-submit-btn');

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
    $modalForm.dialog('close');
    console.log("event handler triggered add task");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $addTaskBtn.on('click',function (){
        $modalForm.dialog('open');
    })

    $modaFormSubmit.on('click',function(event){
        event.preventDefault();
        
        if (!$taskName.val() || !$taskDescription.val() || !$dueDate.val()){
            console.log('inputs not right');
            return false;
            
        }

        let taskAdd = {
            taskName:$taskName.val(),
            taskDescription: $taskDescription.val(),
            taskDate:$dueDate.val(),
        }

        $taskName.val('');
        $taskDescription.val('');
        $taskDueDate.val('');
        
        console.log(taskAdd);

        $modalForm.dialog('close');
        handleAddTask(taskAdd);
        console.log('inputs right');
        return true;
        
    })
});

