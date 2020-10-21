//The below line is shorthand for "$(document).ready(function () {"; it means the function won't be invoked until the page is loaded
$(() => {

  //The below two blocks of code handle the toggling between quizzes_made and quiz_results on the user profile page:
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

  $('input[type="checkbox"]').on('click', () => {

  })

});
