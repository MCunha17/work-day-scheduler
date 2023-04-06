// Variables for the current date, current hour, and time-blocks
$(function () {
  let currentDate = dayjs().format("dddd, MMMM D, YYYY");
  let currentHour = dayjs().format("H");
  let timeBlocks = [];

// Time-blocks for standard business hours
for (let i = 9; i <= 17; i++) {
  let timeBlock = {
    id: `hour-${i}`,
    hour: i > 12 ? `${i - 12}PM` : `${i}AM`,
    description: "",
  };
  timeBlocks.push(timeBlock);

// Row for each time-block
let rowEl = $("<div>").addClass("row time-block");
if (i < currentHour) {
  rowEl.addClass("past");
} else if (i > currentHour) {
  rowEl.addClass("future");
} else {
  rowEl.addClass("present");
}
let hourEl = $("<div>")
  .addClass("col-2 col-md-1 hour text-center py-3")
  .text(timeBlock.hour);
let descriptionEl = $("<textarea>")
  .addClass("col-8 col-md-10 description")
  .attr("id", timeBlock.id)
  .val(timeBlock.description);
let saveBtn = $("<button>")
  .addClass("btn saveBtn col-2 col-md-1")
  .attr("aria-label", "save")
  .html("<i class='fas fa-save' aria-hidden='true'></i>");

// Row elements
  rowEl.append(hourEl, descriptionEl, saveBtn);
  $(".container-fluid").append(rowEl);
}
  
// Event listeners for save button
$(".saveBtn").on("click", function () {
  let description = $(this).siblings(".description").val();
  let id = $(this).parent().attr("id");
  localStorage.setItem(id, description);
});

// Load saved events from Local Storage
for (let i = 0; i < timeBlocks.length; i++) {
  let description = localStorage.getItem(timeBlocks[i].id);
  if (description !== null) {
    $(`#${timeBlocks[i].id} .description`).val(description);
  }
}

// Current date
  $("#currentDay").text(currentDate);
});

  // Instructions
  // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
  // the code isn't run until the browser has finished rendering all the elements
  // in the html.
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.