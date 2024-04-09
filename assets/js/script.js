// Retrieve tasks and nextId from localStorage

const TODO = "todo";
const IN_PROGRESS = "in-progress";
const DONE = "done";

let nextId = 0;
let taskList = [];
if (localStorage.getItem("tasks")) {
    taskList = JSON.parse(localStorage.getItem("tasks"))
}

if (localStorage.getItem("nextId")) {
    let nextId = JSON.parse(localStorage.getItem("nextId"));
} else {
    let nextId = 0;
    localStorage.setItem("nextId",nextId);
}



//set up todo card holders as sortable containers.
let $todo = $('#todo-cards').addClass('.connectedSortable');
let $inProgress = $('#in-progress-cards').addClass('.connectedSortable');
let $done = $('#done-cards').addClass('.connectedSortable');;

//task button setup on main page triggers modal form display
const $addTaskBtn = $('#add-task-btn');

//set up modal form Jqueries
let $modalForm = $('#modal-form');
let $taskName = $('#modal-form #task-name');
let $taskDescription = $('#modal-form #task-description');
let $taskDueDate = $('#modal-form #due-date');
let $modaFormSubmit = $('#task-submit-btn');
const $dueDate = $('#due-date').datepicker();

//make modal form a dialog
$modalForm.dialog({
        autoOpen: false,
        minHeight: 200,
      minWidth: 400,
      modal: true
      }
);


// Todo: create a function to generate a unique task id
function generateTaskId() {
    nextId ++;
    localStorage.setItem("nextId",nextId);
    return nextId - 1;
    //read the length of the tasklist and return the next task number
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    //take the task and return a jquery 
    $taskCard = $(`<div id="${task.taskId}" data-status="${task.taskStatus}" data-id="card-${task.taskId}"></div>`);    
    
    $taskCard.addClass('card m-4');

    if (task.taskStatus == TODO) {
        $taskCard.addClass('bg-primary')
    } else if (task.taskStatus == IN_PROGRESS) {
        $taskCard.addClass('bg-success');
    } else $taskCard.addClass('bg-dark-subtle');
    
    const $name = $(`<h4>${task.taskName}</h4>`)
    $name.addClass('card-title p-3 bg-primary-subtle');
    
    const $description = $(`<p>${task.taskDescription}</p>`);
    $description.addClass('card-text')
    
    const $dueDate = $(`<p>${task.taskDate}</p>`)
    $dueDate.addClass('card-footer fs-6')

    const $status = $(`<p>${task.taskStatus}</p>`)
    $status.addClass('fs-6')

    const $buttons = $('<div></div>');
    $buttons.addClass('container row');
    
    const $delete = $(`<button data-purpose="delete" type="button">X</button>`)
        $delete.addClass('btn btn-sm m-3 col btn-danger')
        $delete.data("purpose","delete");
    const $done = $(`<button data-purpose="done" type="button">Done</button>`)
        $done.addClass('btn btn-sm m-3 col btn-success')

    const $statusButton = $(`<button data-purpose="toggle-status">Status Change</button>"`);
        $statusButton.addClass('btn btn-sm m-3 col')

    $buttons.append($delete);
    $buttons.append($done);

    $taskCard.append($name);
    $taskCard.append($status);
    $taskCard.append($description);
    $taskCard.append($buttons);
    $taskCard.append($dueDate);
    $taskCard.append($statusButton);

    
    $taskCard.on('click',function (event){
      console.log($(event.target).data("purpose"))
        if ($(event.target).data("purpose")=="delete") {
          
          handleDeleteTask(event);
        }
        console.log("button clicked", $(event.target).data("purpose"));
    })
    
    $taskCard.addClass('ui-sortable');
    

    return $taskCard;
    //return $taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    console.log("render task list: ", taskList);
    $todo.empty();
    $inProgress.empty();
    $done.empty();

    for (task of taskList) {
        console.log(task);
        if (task.taskStatus == TODO) {
            createTaskCard(task);
            $todo.append(createTaskCard(task));
        } else if (task.taskStatus == IN_PROGRESS) {
            createTaskCard(task);
            $inProgress.append(createTaskCard(task));
        } else if (task.taskStatus == DONE) {
            createTaskCard(task);
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

        let id = generateTaskId();

        let taskAdd = {
            taskName:$taskName.val(),
            taskDescription: $taskDescription.val(),
            taskDate:$dueDate.val(),
            taskStatus: TODO,
            taskId: `card-${id}`,
        }

        console.log("task Add id: ",taskAdd.taskId);

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
  let id = $(event.target).parent().parent().data('id');

  console.log('delete handle is handling id: ',id);
  console.log("to remove: ",$(event.target).parent().parent());
  console.log("task list is : ", taskList);
  const newTaskList = taskList.filter(function(item) {
    return item.taskId !== id;
  })
  console.log("new task list is : ", newTaskList);
  
  $(event.target).parent().parent().remove();

  taskList = newTaskList;
  localStorage.setItem('tasks',newTaskList);
}

function updateTaskList (id,status) {
    console.log("updateTask List gets taskList:",taskList);
    const newList = [];
    taskList.map((task)=>{
        if (task.taskId = id) {
            task.taskStatus = status;
        }
        newList.push(task);
    });    
    
    console.log("update task list: ", newList);
    return newList;
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
        //console.log(`BF-$UI.item attr(id): `, $(ui.item).attr('id'));
        //console.log(`BF-Event target.data-status is: `,$(event.target).data('status')); 
        const $card = $($(ui.item).attr('id'));
        const newStatus = $(event.target).data('status');
        $card.data('status',newStatus);
        //console.log(`$UI.item attr(id): `, $(ui.item).attr('id'));
        //console.log(`Event target.data-status is: `,$(event.target).data('status')); */
        //console.log("BF - taskList: ", taskList);
        taskList = updateTaskList($(ui.item).attr('id'), newStatus);
        renderTaskList();
        //console.log("AF - taskList: ", taskList);
    

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $addTaskBtn.on('click',function (){
        $modalForm.dialog('open');
    })
    renderTaskList();

function findTaskById(id) {
    let count = 0;
    for (task in taskList) {
        if (task.id == id) {
            return count;
        }
        count ++;
    }
    return false;
}


     
$('#todo-cards, #in-progress-cards, #done-cards').sortable({
    connectWith: ".connectedSortable",
    items: ".card",
    opacity: 0.5,
    placeholder: "sortable-placeholder",
    placeholder: "ui-state-highlight",
    receive: function( event, ui ) {
        
        handleDrop(event, ui)
        
    },
   /*  sortUpdate: function( event, ui ) {
        console.log($(event.target)[0]);
        console.log($(event.target).parent());
        console.log(`ui is ${ui.sender}`);
    }, */
    items: ".card"
  }).disableSelection();

  $('#todo-cards, #in-progress-cards, #done-cards').on( "sortstop", function( event, ui ) {
       
    });
  
    $modaFormSubmit.on('click',handleAddTask)
});

