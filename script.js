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

  var timeBlockCount = 9;
  setInterval(update, 1000);
// creating time display
// hour = 9am; if hour is less than 5pm then we loop. index must be -9 to start at 0
for (var hour=9; hour <=17; hour ++){
  var index= hour - 9;



 // grab container class
 var containerEl = $(".container");
 //creating new rows
 var newRow = $("<div>")
   .addClass("row text-center", "time-block")
   .attr("data-name", "dynamicRow"); //add class of ROW
// adding to the container element a new row
 $(containerEl).append(newRow);

 //create new date column
 var dateCol = $("<div class = col-md-2>")
 .addClass("hour")
 .css("background-color", "teal")
 .attr("data-name", "dynamicDateCol");
 
 var dateColHour = $("<span>")
 .attr('class', 'time-block')

//  create correct hour display for date column
 var hourDisplay = 0;
 var amPm = "";
 if (hourDisplay > 12){
   hourDisplay = hour -12;
   amPm = "pm";
 } else {
   hourDisplay = hour;
   amPm = "am"
 }


 dateCol.append(dateColHour);
 console.log(dateCol);
// creating text to the corresponding hour


 //create new content Column
 var contentCol = $("<input type=text class = col-md-8>")
 .addClass("input-field")
 .attr("data-name","dynamicContentCol");


 //create new save column
 var saveCol = $("<button class = col-md-2>")
 .css("background-color", "green")
 .attr("data-name", "dynamicSaveCol");

 //append all 3 elements to our row
 newRow.append(dateCol, contentCol, saveCol);
 //append our completed row to our container
 containerEl.append(newRow);
}
createTimeBlocks();
}



  // create button save function 
  // parseing string into object
  // var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  // function saveButton(){
  //   $('button').on('click', function(){


  //   });
  // }
  
);

