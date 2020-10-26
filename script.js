$(document).ready(function () {
  // moment variable
  var momentValue = moment();

  // container div variable
  var timesDiv = $(".container");

  // $(".container").append("<textarea>type here</textarea>");
  // timesDiv.attr("element", "textarea");

  // get data from storage
  var timeSlots = JSON.parse(localStorage.getItem("timeSlots"));

  // nothing in local storage so set it up
  if (!timeSlots) {
    // initial data
    var timeSlots = [
      { display: "9AM", data: 9, work: "" },
      { display: "10AM", data: 10, work: "" },
      { display: "11AM", data: 11, work: "" },
      { display: "12PM", data: 12, work: "" },
      { display: "1PM", data: 13, work: "" },
      { display: "2PM", data: 14, work: "" },
      { display: "3PM", data: 15, work: "" },
      { display: "4PM", data: 16, work: "" },
      { display: "5PM", data: 17, work: "" },
    ];
  }
  //  loclal storage
  var storeTime = function (newData) {
    localStorage.setItem("timeSlots", JSON.stringify(newData));
  };

  // button click function for save
  $(document).on("click", "#saveBtn", function () {
    // get data off of button element
    var data = $(this).data("task");
    // get the text area value using the ID
    var task = $(`textarea#${data}`).val();
    // Update and save work
    var editedWork = timeSlots.find(function (item) {
      // Find the item for the right hour
      return item.data === data;
    });

    // stores our input as task in the correct time slot and alerts
    editedWork.work = task;
    storeTime(timeSlots);
    alert(`New task (${task}) saved for ${editedWork.display}`);
  });

  // function for comparing time to time block and designating the appropriate classes
  $.each(timeSlots, function (i, hour) {
    var isPast = momentValue.hour() > hour.data;
    var isNow = momentValue.hour() === hour.data;
    // set css for past or future with ternary
    var colorCss = isPast ? "past" : "future";
    // if hour is now override past/future with present
    if (isNow) {
      colorCss = "present";
    }
    // Create a row for each hour
    // give text area a unique id so we can get the value
    // give button data that is the same as the text area ID
    timesDiv.append(
      `<div class="row">
        <p class="col-md-2 hour">
        ${hour.display}
        </p>
        <textarea id="${hour.data}" class="col-md-8 ${colorCss}">${hour.work}</textarea>
        <button data-task="${hour.data}" id="saveBtn" class="col-md-2 saveBtn"><i class="fa fa-save"></i></button>
        </div>`
    );
  });

  // displays the date in the element with id currentDay
  $("#currentDay").text(momentValue.format("dddd MMM Do YYYY"));
});
