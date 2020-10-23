//The below line is shorthand for "$(document).ready(function () {"; it means the function won't be invoked until the page is loaded

$(() => {

  //The below two code blocks handle the two copy-to-clipboard buttons on the results page:
  $('.copyResultsLink').on('click', function() {
    const attemptId = $(this).attr('id');
    const string = `http://localhost:8080/result/${attemptId}`;
    copyToClipboardAnyString(string);
  })

  $('.copyQuizLink').on('click', function() {
    const quizId = $(this).attr('id');
    const string = `http://localhost:8080/quiz/${quizId}`;
    copyToClipboardAnyString(string);
  })

});
