//when you click button, it shows its content and hides the other

//when you click button, it changes class

//The below line is shorthand for "$(document).ready(function () {"; it means the function won't be invoked until the page is loaded
$(() => {

  $('#quiz').on('click', () => {
    $('#listOfResults').hide();
    $('#listOfQuizzesCreated').show();
    $('#quiz').addClass('active');
    $('#results').removeClass('active');
  });

  $('#results').on('click', () => {
    $('#listOfResults').show();
    $('#listOfQuizzesCreated').hide();
    $('#results').addClass('active');
    $('#quiz').removeClass('active');
  });

});
