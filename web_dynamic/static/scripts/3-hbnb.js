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
  $.getJSON("http://0.0.0.0:5001/api/v1/places_search", function(status, data) {
    if (status.status === "OK") {
      $("DIV#api_status").addClass("available");
    } else {
      $("DIV#api_status").removeClass("available");
    }
    console.log("HERE", data);
  });
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    data: "{}",
    success: function(data) {
      for (let place of data) {
        console.log("PLACE", place);
        $("SECTION.places").append(
          "<ARTICLE>" +
            '<div class="title"><h2>' +
            place.name +
            '</h2><div class="price_by_night">' +
            place.price_by_night +
            '</div></div><div class="information "><div class="max_guest "> <i class="fa fa-users fa-3x " aria-hidden="true "></i><br />' +
            place.max_guest +
            'Guests</div><div class="number_rooms "><i class="fa fa-bed fa-3x " aria-hidden="true "></i><br /> ' +
            place.number_rooms +
            'Bedrooms</div><div class="number_bathrooms "><i class="fa fa-bath fa-3x " aria-hidden="true "></i><br />' +
            place.number_bathrooms +
            'Bathroom</div></div><div class="description ">' +
            place.description +
            "</div>" +
            "</ARTICLE>"
        );
      }
    }
  });
});
