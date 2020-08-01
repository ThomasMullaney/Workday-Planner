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

  var nowHour24 = moment().format("H");
  var nowHour12 = moment().format("H");
  var test = false;

  if (test) {
    nowHour24 = 13;
    nowHour12 = 1;
  }
  // first action of page should be to pull any stored tasks from localStorage
  var savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
  // if the stored task is not empty we pull them,  otherwise it will create blank array
  if (savedTasks !== null) {
    taskArray = savedTasks;
  } else {
    taskArray = new Array(9);
  }

  // grab container class
  var taskContainer = $("#taskContainer");
  taskContainer.empty();

  // hour = 9am; if hour is less than 5pm then we loop. index must be -9 to start at 0
  for (var hour = 9; hour <= 17; hour++) {
    var index = hour - 9;

    //creating new row components
    var newRow = $("<div>")
      .addClass("row text-center", "time-block")
      .attr("hour-index", hour);

    //start of creating date column
    var dateCol = $("<div class = col-md-2>")
      .addClass("hour")
      .css("background-color", "teal")
      .attr("data-name", "dynamicDateCol");

    var dateColHour = $("<span>").attr("class", "time-block");

    //  create correct hour display for date column
    var hourDisplay = 0;
    var amPm = "";
    if (hour > 12) {
      hourDisplay = hour - 12;
      amPm = "pm";
    } else {
      hourDisplay = hour;
      amPm = "am";
    }
    //adding corresponding hour text to column
    dateColHour.text(`${hourDisplay} ${amPm}`);
    dateCol.append(dateColHour);
    // end of hour/date column

    //create new the input content Column
    var taskCol = $("<input type='text' class='col-md-8'>")
      .addClass("input-field")
      .attr("type", "text")
      .attr(`input-${index}`, hour);

    // accessing the local storage based on the hour index
    taskCol.val(taskArray[index]);
    // end of text input column

    //Start of createing new save column
    var saveCol = $("<button class = col-md-2>")
      .css("background-color", "green")
      .attr("data-id", index);
    // end of save column create

    // set row columns based on timeframe
    // updateColor(newRow, hour);
    changeRowColor(newRow, hour);
    //append all 3 elements to our row
    newRow.append(dateCol, taskCol, saveCol);
    console.log(newRow);
    //append our completed row to our container
    taskContainer.append(newRow);
  }

  // function to save input to local storage
  $(document).on("click", "button", function (event) {
    event.preventDefault();
    var index = $(this).attr("data-id");
    var inputId = $(".input-field") + index;
    var value = $(inputId).val(); 
    console.log(typeof value);
    taskArray[index] = value;

    // $(`saveid-${index}`).removeClass("shadowPulse");
    localStorage.setItem("savedTasks", JSON.stringify(taskArray));
  });

  // function to update row color
  function changeRowColor(hourRow, hour) {
    if (hour < nowHour24) {
      hourRow.addClass("past");
    } else if (hour > nowHour24) {
      hourRow.addClass("present");
    } else {
      hourRow.addClass("future");
    }
  }
});

