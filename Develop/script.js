$(document).ready(function() {
  // Variables for the current date, current hour, and time-blocks
  let currentDate = dayjs().format("dddd, MMMM D, YYYY");
  let currentHour = dayjs().format("H");
  let timeBlocks = [];

  // Function to display a message upon saving event
  function showMessage(message) {
    // Create a div element for the message
    let messageEl = $("<div>")
      .addClass("alert alert-success mt-3")
      .text(message);

    // Display the message above the table
    $("#currentDay").before(messageEl);
  }

  // Time-blocks for standard business hours
  for (let i = 9; i <= 17; i++) {
    // Create a time-block object with an id, hour, and description
    let timeBlock = {
      id: `hour-${i}`,
      hour: i > 12 ? `${i - 12}PM` : `${i}AM`,
      description: "",
    };
    timeBlocks.push(timeBlock);
    
    // Create a row element for the time-block and add classes based on the current hour
    let rowEl = $("<div>")
      .addClass("row time-block")
      .attr("id", timeBlock.id);
    if (i < currentHour) {
      rowEl.addClass("past");
    } else if (i > currentHour) {
      rowEl.addClass("future");
    } else {
      rowEl.addClass("present");
    }

    // Create a div element for the hour and add classes and text
    let hourEl = $("<div>")
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(timeBlock.hour);

    // Create a text area element for the event description
    let descriptionEl = $("<textarea>")
      .addClass("col-8 col-md-10 description")
      .attr("id", timeBlock.id)
      .val(timeBlock.description);

    // Create a save button element
    let saveBtn = $("<button>")
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save")
      .html("<i class='fas fa-save' aria-hidden='true'></i>");
  
    // Append the hour, description, and save button to the row
    rowEl.append(hourEl, descriptionEl, saveBtn);
    // Append the row to the time-block container
    $("#time-blocks-container").append(rowEl);
  }

  // Event listener for save button click
  $(".saveBtn").on("click", function () {
    console.log("Save button clicked!");
    // Get the event description and id of the time-block
    let description = $(this).siblings(".description").val();
    let id = $(this).parent().attr("id");
    // Store the event description in local storage with the time-block id as the key
    localStorage.setItem(id, description);
    // Show message
    showMessage("Appointment added to the local storage.");
  });

  // Load saved events from local storage
  for (let i = 0; i < timeBlocks.length; i++) {
    // Get the description from local storage for the current time-block
    let description = localStorage.getItem(timeBlocks[i].id);
    // If a description exists, set the value of the description text area to the stored value
    if (description !== null) {
      $(`#${timeBlocks[i].id} .description`).val(description);
    }
  }

  // Set the current date in the header
  $("#currentDay").text
});