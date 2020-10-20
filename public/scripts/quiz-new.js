// All functions should be placed within the $(...) below, this ensures that it only runs when the page has fully loaded
// Failure to do so may result in asynchronous problems (i.e. the script attempts to create an event listener
// for a button too early, and since the button hasn't loaded yet, there is an error and when the button finally loads,
// it's too late to be useful.)

// This script is loaded onto the quiz taking page (page C, /quiz/new)
// Helper functions are found in quiz-play-functions.js

$( () => {
  // RUNS ON DOCUMENT READY

  // CONSTANTS
  $('button').each((i, btn) => {
    $(btn).on('click', (e) => {
      e.preventDefault();
      alert('A button was clicked!');
    });
  });
});
