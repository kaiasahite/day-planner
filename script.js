$(document).ready(function () {
  var m = moment();

  $("#currentDay").text(m.format("dddd MMM Do YYYY"));
});
