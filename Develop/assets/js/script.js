// Retrieve tasks and nextId from localStorage

const TODO = "todo";
const IN_PROGRESS = "in progress";
const DONE = "done";

let taskList = JSON.parse(localStorage.getItem("tasks"));
if (!taskList) taskList = [];

let nextId = JSON.parse(localStorage.getItem("nextId"));

let $todo = $('#todo-cards');
let $inProgress = $('#in-progress-cards');
let $done = $('#done-cards');

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
    if (nextId) {
        localStorage.setItem("nextId",taskList.length() + 1)
        return nextId;} else return 1;
    //read the length of the tasklist and return the next task number
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const $taskCard = $("<div></div>")

    const $taskName = $("<h2></h2>");
    $taskName.text(task.name);
    $taskCard.append($taskName);

    const $taskDescription = $("<p></p>");
    $taskDescription.text(task.description);
    $taskCard.append($taskDescription);

    const $taskDueDate = $("<p></p>");
    $taskDueDate.text(task.dueDate);
    $taskCard.append($taskDueDate);

    const $taskStatus = $("<p></p>");
    $taskStatus.text(task.status);
    $taskCard.append($taskStatus);
    
    return $taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    for (task of taskList) {
        console.log(createTaskCard(task))
        if (task.status == TODO) {
            $todo.append(createTaskCard(task));
        } else if (task.status == IN_PROGRESS) {
            $inProgress.append(createTaskCard(task));
        } else {
            $done.append(createTaskCard(task));
        }
    }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    
        event.preventDefault();
        if (!$taskName.val() || !$taskDescription.val() || !$dueDate.val()){
            console.log('inputs not right');
            return false; //returns false of inputs not right. can be relpaced by a flash or something.
        }

        let taskAdd = {
            taskName:$taskName.val(),
            taskDescription: $taskDescription.val(),
            taskDate:$dueDate.val(),
            taskStatus: TODO,
            taskId:function(){return generateTaskId()}
        }

        $taskName.val('');
        $taskDescription.val('');
        $taskDueDate.val('');
        

        $modalForm.dialog('close');
        taskList.push(taskAdd);

        localStorage.setItem('tasks',JSON.stringify(taskList));
        

        console.log(taskList);
        console.log('inputs right');
        renderTaskList();
        return true;
        
    
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
    $addTaskBtn.on('click',function (){
        $modalForm.dialog('open');
    })
    renderTaskList();
    $modaFormSubmit.on('click',handleAddTask)
});

