$(document).ready(function () {
  // variables for the current date, current hour, and time blocks
  let currentDay = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDay);
  let currentHour = dayjs().format("H");
  let timeBlocks = [];

  // see if message has already been displayed
  let messageDisplayed = false;
  const messageEl = $("<div>");

  // function to display a message after saving event
  function showMessage(message) {
    let messageEl = $("<div>").addClass("confirm");
    let beforeEl = $("<span>").text(message);
    let storageEl = $("<span>")
      .addClass("highlight")
      .html("&nbsp;localStorage &nbsp;");
    let afterEl = $("<span>").text("");
    let checkmarkIcon = $("<i>").addClass("fas fa-check-circle green-checkmark");

    // append the message elements to the message div
    messageEl.append(beforeEl, storageEl, afterEl, checkmarkIcon);

    // display message at bottom of the header
    if (!messageDisplayed) {
      $("header").after(messageEl);
      messageDisplayed = true;
    }

    // message disappears after 2 seconds
    setTimeout(() => {
      messageEl.fadeOut(500, () => messageEl.remove());
      messageDisplayed = false;
    }, 2000);
  }

  // time blocks for standard business hours
  for (let i = 9; i <= 17; i++) {
    let timeBlock = {
      id: `hour-${i}`,
      hour: i > 12 ? `${i - 12}PM` : `${i}AM`,
      description: "",
    };
    timeBlocks.push(timeBlock);

    // row element for the time block and add classes based on the current hour
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

    // div element for the hour and add classes and text
    let hourEl = $("<div>")
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(timeBlock.hour);

    // text element for the event description
    let descriptionEl = $("<textarea>")
      .addClass("col-8 col-md-10 description")
      .attr("id", timeBlock.id)
      .val(timeBlock.description);

    // save button
    let saveBtn = $("<button>")
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save")
      .html("<i class='fas fa-save' aria-hidden='true'></i>");

    // append the hour, description, and save button to the row
    rowEl.append(hourEl, descriptionEl, saveBtn);
    // append the row to the time block container
    $("#time-blocks-container").append(rowEl);
  }

  // event listener for save button click
  $(".saveBtn").on("click", function () {
    // get the event description and id of the time-block
    let description = $(this).siblings(".description").val();
    let id = $(this).parent().attr("id");
    // store the event description in local storage with the time-block id as the key
    localStorage.setItem(id, description);
    // show message
    showMessage("Appointment Added to");
  });

  // load saved events from local storage
  for (let i = 0; i < timeBlocks.length; i++) {
    // get the description from local storage for the current time block
    let description = localStorage.getItem(timeBlocks[i].id);
    // if a description exists, set the value of the description text area to the stored value
    if (description !== null) {
      $(`#${timeBlocks[i].id} .description`).val(description);
    }
  }
});