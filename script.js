$(document).ready(function () {
  
    // displaying current date and time at top of page
    var todayTime = $("#currentDay");
    var todayDate = moment().format("LLLL");
    var newDiv = $("<div>").text(todayDate);
    $(newDiv).append(todayDate);
  
    var update = setInterval(function () {
      date = moment(new Date());
      todayTime.text(date.format("LLLL"));
    });
  
    setInterval(update, 1000);

  // alert to refresh page
  let time = moment().format("h:mm:ss");
  let timeSplit = time.split(":");
  let minutesToRefresh = 59 - parseInt(timeSplit[1]);
  let secondsToRefresh = 60 - parseInt(timeSplit[2]);
  let hourRefresh = minutesToRefresh * 60 + secondsToRefresh;
  let secondsElapsed = 0;
  let timeToStartReload = setInterval(function() {
    secondsElapsed++
    if (secondsElapsed === hourRefresh) {
      console.log(moment());
      let isReloading = confirm("An hour has passed, would you like to refresh and move on to the next task?");
      if (isReloading) {
        window.location.reload(true);
      } else {
        alert("Automatic refresh will no longer occur unless you manually reload the page.");
      }
    }
  }, 1000); 
});

// Element Names
let timeBlockContainer = $(".container");
let todayDateEl = $("#currentDay");

//generate the current date
todayDateEl.text(moment().format("dddd, MMMM Do"));

// generate timeblocks
let timeArr = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM"];

for (let i=1; i < timeArr.length; i++) {
  let newTimeBlockEl = $("#9AM").clone();
  newTimeBlockEl.attr("id", timeArr[i]);
  newTimeBlockEl.children(".row").attr("style", "white-space: pre-Wrap");
  newTimeBlockEl.children(".row").children(".hour").text(timeArr[i]);
  newTimeBlockEl.appendTo(".container");
};

// get local storage tasks and populate to array
let savedTasks;
let locationArr = [];

function populateSavedTasks() {
  savedTasks = localStorage.getItem("savedTasks");
  locationArr = [];
  if (savedTasks === null || savedTasks === "") {
    savedTasks = [];
  } else {
    savedTasks = JSON.parse(savedTasks);
    for (i = 0; i < savedTasks.length; i++) {
      locationArr.push(savedTasks[i].time);
    }
  }

  for (let i = 0; i < locationArr.length; i++) {
    let timeBlockId = "#" + locationArr[i];
    let timeBlockEl = $(timeBlockId).children(".row").children("textarea");
    $(timeBlockId).children(".row").children("button").attr("data-event", "yes");
    timeBlockEl.val(savedTasks[i].event);
  }
}

populateSavedTasks();

// clear local storage
function clearLocaleStorage(){
  savedTasks = [];
  localStorage.setItem('savedTasks', savedTasks);
}

// save to local storage
function saveTask(time, input) {
  alert("Task has been saved.");
  savedTasks.push({
    "time": time,
    "event": input
  });
  localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
}

function removeEvent(index)   {
  locationArr.splice([index], 1);
  savedTasks.splice([index], 1);
}

function clearEvent(isClear, index, location, buttonEl) {
  if (isClear) {
    alert("This task has been cleared.");
    removeEvent(index);
    buttonEl.attr("data-event", "none");
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
  } else {
    location.val(savedTasks[index].event);
    alert("Event was not cleared");
  }
  console.log("The data-event is set to " + buttonEl.attr("data-event") + " at " + buttonEl.siblings("p").text());
}


function changeEvent(time, index, location, buttonEl, eventInput, isPopulated) {
  if (eventInput.trim() === "" && isPopulated === "yes") {
    let isSaved = confirm("At "+time+": Would you like to clear the event '"+savedTasks[index].event+"' ?");
    clearEvent(isSaved, index, location, buttonEl);
  } else if (eventInput.trim() !== "" && isPopulated === "none") {
    let isSaved = confirm("At "+time+": Would you like add the event '"+eventInput+"'?");
    if (isSaved) {
      saveTask(time, eventInput);
    } else {
      location.val("");
    }
  } else if (eventInput.trim() !== "" && isPopulated === "yes") {
    if (savedTasks[index].event !== eventInput) {
      let isSaved = confirm("At "+time+": Would you like to change the event from '"+savedTasks[index].event+"' to '"+eventInput+"'?");
      if (isSaved) {
        removeEvent(index);
        saveTask(time, eventInput);
      } else {
        alert("Change was not saved.");
        location.val(savedTasks[index].event);
      }
    }
  }
}

$(".time-block").delegate("button", "click", function () {
  event.preventDefault();
  let eventInput = $(this).siblings("textarea").val();
  let time = $(this).siblings("p").text();
  let location = $(this).siblings('textarea');
  let isPopulated = $(this).attr("data-event");
  let index = locationArr.indexOf(time);
  let buttonEl = $(this);

  changeEvent(time, index, location, buttonEl, eventInput, isPopulated);
  populateSavedTasks();
});

// change colors

// get current times

let timeOfDay = moment().format('hA');

// select class and add past/present/future
let allTimeBlocks = $('.time-block');

for (let i = 0; i < allTimeBlocks.length; i++) {
  let timeBlock = $(allTimeBlocks[i]);
  let timeBlockId = timeBlock.attr('id');
  let timeBlockTextArea = timeBlock.children(".row").children("textarea");
  if (timeBlockId === timeOfDay) {
    timeBlockTextArea.addClass('present');
  } else if (moment(timeBlockId, 'hA').isBefore()) {
    timeBlockTextArea.addClass('past');
  } else if (moment(timeBlockId, 'hA').isAfter()) {
    timeBlockTextArea.addClass('future');
  }
}

// clear button event 
$('#clear').on('click', function(){
  if(confirm('Confirm you wish to clear all tasks?')){
    clearLocaleStorage();
    $('.time-block').find('textarea').val("");
    $('.time-block').find('button').attr('data-event', 'none');
    locationArr=[];
  }
})

// Save all 
$('#saveAll').on('click', function(){
  for ( let i=0; i  < allTimeBlocks.length; i++) {
    let timeBlock = $(allTimeBlocks[i]);
    let time = timeBlock.attr('id');
    let location = timeBlock.children('.row').children('textarea');
    let buttonEl = timeBlock.children('.row').children('button');
    let eventInput = location.val();
    let isPopulated = buttonEl.attr('data-event');
    let index = locationArr.indexOf(time);

    changeEvent(time, index, location, buttonEl, eventInput, isPopulated);
  }
  populateSavedTasks();
  alert('there are no unsaved changes');
});



  // var nowHour24 = moment().format("H");
  // var nowHour12 = moment().format("H");
  // var test = false;
  // var saveImage = "https://www.freeiconspng.com/uploads/save-icon-3.png"

