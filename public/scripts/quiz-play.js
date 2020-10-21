// All functions should be placed within the $(...) below, this ensures that it only runs when the page has fully loaded
// Failure to do so may result in asynchronous problems (i.e. the script attempts to create an event listener
// for a button too early, and since the button hasn't loaded yet, there is an error and when the button finally loads, it's too late to be useful.)

// This script is loaded onto the quiz taking page (page B, /quiz/:id)
// Helper functions are found in quiz-play-functions.js

$(() => {
  // RUNS ON DOCUMENT READY

  // CONSTANTS
  // Define variables (with $ to signify jQuery object) for key nodes in the DOM
  const $quizForm = $('form');


  $('.button-style').on('click', () => {
    try {
      const quizId = window.location.pathname.split('/').pop(); // Extracts the number from the URL, so '/quiz/43' becomes '43';
      loadQuiz($quizForm, quizId); // Just using a hard-coded quiz 1 for now
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  });

  $quizForm.on('submit', function (event) {
    event.preventDefault();
    // Pass jQuery wrapper for the form as an argument to submitQuiz
    try { // In case validation errors happen
      submitQuiz($(this));
    } catch (err) {
      console.log(err.message);
    }
  });
});
