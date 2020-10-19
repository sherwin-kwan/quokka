$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  const View = $.Ejs({ async: false });
  const html = View.render('welcome', { title: 'jQuery Ejs!!' });

});
