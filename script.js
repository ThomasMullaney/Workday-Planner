$(document).ready(function () {

  let time = moment().format("h:mm:ss");
  let timeSplit = time.split(":");
  let minutesToRefresh = 59 - parseInt(timeSplit[1]);
  let secondsToRefresh = 60 - parseInt(timeSplit[2]);
  let hourRefresh = minutesToRefresh*60 + secondsToRefresh;
  let secondsElapsed = 0;
  let timeToStartReload = setInterval(function(){
    secondsElapsed ++
      if (secondsElapsed === hourRefresh) {
        console.log(moment());
        let isReloading = confirm ("An hour has passed, would you like to refresh and move on to the next task?");
        if (isReloading) {
          window.location.reload(true);
        } else {
          alert("Automatic refresh will no longer occur unless you manually reload the page.");
        }
      }
  },1000);
});

// Element Names
let timeBlockContainer = $(".container");
let todayDateEl = $("#currentDay");

//generate the current date
todayDateEl.text(moment().format("dddd, MMMM Do"));

// generate timeblocks
let timeArr = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM" ];

for (let i = 1; i < timeArr.length; i++){
  let newTimeBlockEl = $("#9AM").clone();
  newTimeBlockEl.attr("id", timeArr[i]);
  newTimeBlockEl.children(".row").attr("style", "white-space: pre-Wrap");
  newTimeBlockEl.children(".row").children(".hour").text(timeArr[1]);
  newTimeBlockEl.appendTo(".container");
}; 

// get local storage tasks and populate to array
let savedTasks;
let locationArr = [];

function populateSavedTask() {
  savedTasks = localStorage.getItem("SavedTasks");
  locationArr=[];
  if (savedTasks === null || savedTasks === "") {
    savedTasks = [];
  } else {
    savedDayPlans = JSON.parse(savedDayPlans);
    for (i = 0; i < savedTasks.length; i++) {
      locationArr.push(savedTasks[i].time);
    }
  }
  for (let i=0; i<locationArr.length; i++) {
    let timeBlockId = "#" + locationArr[i];
    let timeBlockEl = $(timeBlockId).children(".row").children("textarea");
    $(timeBlockId).children(".row").children("button").attr("data-event", "yes");
    timeBlockEl.val(savedTasks[i].event);
  }
}

populateSavedTask();

//   // displaying current date and time at top of page
//   var todayTime = $("#currentDay");
//   var todayDate = moment().format("LLLL");
//   var newDiv = $("<div>").text(todayDate);
//   $(newDiv).append(todayDate);

//   var update = setInterval(function () {
//     date = moment(new Date());
//     todayTime.text(date.format("LLLL"));
//   });

//   setInterval(update, 1000);

//   var nowHour24 = moment().format("H");
//   var nowHour12 = moment().format("H");
//   var test = false;
//   var saveImage = "https://www.freeiconspng.com/uploads/save-icon-3.png"


//   if (test) {
//     nowHour24 = 13;
//     nowHour12 = 1;
//   }
//   // first action of page should be to pull any stored tasks from localStorage
//   var savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
//   // if the stored task is not empty we pull them,  otherwise it will create blank array
//   if (savedTasks !== null) {
//     taskArray = savedTasks;
//   } else {
//     taskArray = new Array(9);
//   }

//   // grab container class
//   var taskContainer = $("#taskContainer");
//   taskContainer.empty();

//   // hour = 9am; if hour is less than 5pm then we loop. index must be -9 to start at 0
//   for (var hour = 9; hour <= 17; hour++) {
//     var index = hour - 9;

//     //creating new row components
//     var newRow = $("<div>")
//       .addClass("row text-center mx-auto", "time-block")
//       .attr("hour-index", hour);

//     //start of creating date column
//     var dateCol = $("<div>")
//       .addClass("col-md-1")
//       .css("background-color", "transparent")
//       .attr("data-name", "dynamicDateCol");

//     var dateColHour = $("<span>").attr("class", "description");

//     //  create correct hour display for date column /////////////////
//     var hourDisplay = 0;
//     var amPm = "";
//     if (hour > 12) {
//       hourDisplay = hour - 12;
//       amPm = "pm";
//     } else {
//       hourDisplay = hour;
//       amPm = "am";
//     }
//     //adding corresponding hour text to column
//     dateColHour.text(`${hourDisplay} ${amPm}`);
//     dateCol.append(dateColHour);
//     // end of hour/date column /////////////////

//     //create new the input content Column /////////////
//     var taskCol = $("<input type='text' class='col-md-5'>")
//       .addClass("input-group-text")
//       .attr("type", "text")
//       .attr(`input-${index}`, hour);

//     // accessing the local storage based on the hour index
//     taskCol.val(taskArray[index]);
//     // end of text input column////////

//     //Start of createing new save column ///////
//     var saveCol = $("<button class= col-md-1>")
//       .css("background-color", "green")
//       .addClass("saveBtn", "saveBtn i:hover")
//       .attr("class", "far fa-save saveImage")
//       .attr("data-id", index);
//     // end of save column create/////

//     // set row columns based on timeframe
//     // updateColor(newRow, hour);
//     changeRowColor(newRow, hour);
//     //append all 3 elements to our row
//     newRow.append(dateCol, taskCol, saveCol);
//     console.log(newRow);
//     //append our completed row to our container
//     taskContainer.append(newRow);
//   }

//   // function to save input to local storage
//   $(document).on("click", "button", function (event) {
//     event.preventDefault();
//     var index = $(this).attr("data-id");
//     var inputId = $(".input-field")[index];
//     var value = $(inputId).val();
//     console.log(inputId, 'inputID');  
//     console.log(typeof value);
//     taskArray[index] = value;

//     // $(`saveid-${index}`).removeClass("shadowPulse");
//     localStorage.setItem("savedTasks", JSON.stringify(taskArray));
//   });

//   // function to update row color
//   function changeRowColor(hourRow, hour) {
//     if (hour < nowHour24) {
//       hourRow.attr("class", "past");
//     } else if (hour > nowHour24) {
//       hourRow.attr("class", "present");
//     } else {
//       hourRow.attr("class", "future");
//     }
//   }
// });

