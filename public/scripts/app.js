// Use this file for scripts that need to run on every page in Quokka.
// If you want to write scripts that only run on an individual page, make a separate file for that.

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
