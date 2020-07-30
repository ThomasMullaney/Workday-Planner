$(document).ready(function(){

// displaying current date and time at top of page
const currentTime= moment().format('MMMM do YYYY, h:mm:ss a');

var dateHeader= $("#currentDay");
dateHeader.text(currentTime);

// jquery dynamic creation of rows?
var hours = [
    "9:00am",
    "10:00am",
    "11:00am",
    "12:00am",
    "1:00pm"
];

var tableCreateDiv = $("#plannerContainer");

$.each(hours, fucntion(i, hour) {
    tableCreateDiv.append("<tr>" + hour + "</tr>");
    // this is where we add details about how the rows of the table should appear
    
});
// let plannerContainer = $("#plannerContainer");
// plannerContainer.empty();

// for (let hour = 9; hour <= 17; hour++){
//     let index= hour-9;

//     let rowDiv = $("<div>");
//     rowDiv.addClass("row", "description");
//     rowDiv.attr("hour-index", hour)

//     // Hourbox development
//     var col3HourBox = $("<div>")
//     col3HourBox.attr('class', 'hour', 'time-block' )
//     var hourBox = $('<div>')
// }

// let rowDiv = $("<div>");
// rowDiv.addClass("row", "time-block");
// rowDiv.append

// let timeContainer = $('<span>');
// timeContainer.attr("class", "time-block")
// timeContainer.append 


// localStorage of events 
var savedEvents = JSON.parse(localStorage.getItem("savedEvents"));
if (savedEvents !== null) {
    plannerTextArr = savedEvents;
} else plannerTextArr = new Array(12);








