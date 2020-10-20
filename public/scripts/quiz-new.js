// All functions should be placed within the $(...) below, this ensures that it only runs when the page has fully loaded
// Failure to do so may result in asynchronous problems (i.e. the script attempts to create an event listener
// for a button too early, and since the button hasn't loaded yet, there is an error and when the button finally loads,
// it's too late to be useful.)

// This script is loaded onto the quiz taking page (page C, /quiz/new)
// Helper functions are found in quiz-play-functions.js

$( () => {
  // RUNS ON DOCUMENT READY

  // CONSTANTS
  const $questions = $('article');
  console.log($questions);

  // WARNING: Index for questions is 1-based. The first question is question 1; the second question is question 2; and so on
  // However, the index for options is 0-based. The first answer is option 0, the next answer is option 1, and so on.
  addNewQuestion($questions, 1);
  addNewQuestion($questions, 2);
  addNewQuestion($questions, 3);

  // Button handlers
  $('button').each((i, btn) => {
    $(btn).on('click', (e) => {
      e.preventDefault();
      alert('A button was clicked!');
    });
  });
});
