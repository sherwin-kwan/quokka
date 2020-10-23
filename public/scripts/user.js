//The below line is shorthand for "$(document).ready(function () {"; it means the function won't be invoked until the page is loaded

$(() => {

  //The below two blocks of code handle the toggling between quizzes_made and quiz_results on the user profile page:
  $('#quiz').on('click', function() {
    $('#listOfResults').hide();
    $('#listOfQuizzesCreated').show();
    $('#quiz').addClass('active');
    $('#results').removeClass('active');
  });

  $('#results').on('click', function() {
    $('#listOfResults').show();
    $('#listOfQuizzesCreated').hide();
    $('#results').addClass('active');
    $('#quiz').removeClass('active');
  });

  //The below handles toggling between isPublic true and false by clicking the isPublic checkbox:
  $('tr td input[type="checkbox"]').on('click', function() {
    const quizId = $(this).parent().parent().attr('id');
    $.post(`/quiz/${quizId}/public`);
  });

  //The below two blocks of code handle copy-to-clipboard for the quizzes-made and quizzes-taken tabs, respectively:
  $('.quizCopyButton').on('click', function() {
    const quizId = $(this).parent().parent().attr('id');
    const string = `${window.location.origin}/quiz/${quizId}`;
    copyToClipboardAnyString(string);
  })

  $('.resultsCopyButton').on('click', function() {
    const attemptId = $(this).parent().parent().attr('id');
    const string = `${window.location.origin}/result/${attemptId}`;
    copyToClipboardAnyString(string);
  })

});
