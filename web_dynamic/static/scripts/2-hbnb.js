let amenityChecked = [];

$("document").ready(function() {
  $(".amenities input").change(function() {
    if ($(this).prop("checked")) {
      amenityChecked.push($(this).attr("data-name"));
    } else {
      let name = $(this).attr("data-name");
      let index = amenityChecked.indexOf(name);
      if (index > -1) {
        amenityChecked.splice(index, 1);
      }
    }
    amenityChecked.sort();
    $(".amenities h4").text(amenityChecked.join(", "));
  });
  $.getJSON("http://0.0.0.0:5001/api/v1/status/", function(status) {
    if (status.status === "OK") {
      $("DIV#api_status").addClass("available");
    } else {
      $("DIV#api_status").removeClass("available");
    }
  });
});
