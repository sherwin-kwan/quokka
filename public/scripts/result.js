//The below line is shorthand for "$(document).ready(function () {"; it means the function won't be invoked until the page is loaded

$(() => {

  //The below two code blocks handle the two copy-to-clipboard buttons on the results page:
  $('.share.copyResultsLink').on('click', function() {
    const attemptId = $(this).attr('id');
    console.log("hi");
    const string = `http://localhost:8080/result/${attemptId}`;
    copyToClipboardAnyString(string);
  })

  $('.share.copyQuizLink').on('click', function() {
    const quizId = $(this).attr('id');
    console.log("hi");
    const string = `http://localhost:8080/quiz/${quizId}`;
    copyToClipboardAnyString(string);
  })

});
