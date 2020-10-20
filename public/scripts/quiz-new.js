// All functions should be placed within the $(...) below, this ensures that it only runs when the page has fully loaded
// Failure to do so may result in asynchronous problems (i.e. the script attempts to create an event listener
// for a button too early, and since the button hasn't loaded yet, there is an error and when the button finally loads,
// it's too late to be useful.)

// This script is loaded onto the quiz taking page (page C, /quiz/new)
// Helper functions are found in quiz-play-functions.js

$(() => {
  // RUNS ON DOCUMENT READY

  // CONSTANTS
  const $questions = $('article');
  const $form = $('form');
  let questionCount = 1; // At the beginning, there is only one question
  console.log($questions);

  // WARNING: Index for questions is 1-based. The first question is question 1; the second question is question 2; and so on
  // However, the index for options is 0-based. The first answer is option 0, the next answer is option 1, and so on.
  addNewQuestion($questions, 1);
  questionCount++;
  // For now, let's only have 3 questions with 4 answers each

  /* Button handlers. Note: As some of these buttons appear asynchronously, we can't directly place an event listener on them
  * to listen for clicks. However, because bubbling exists, we can place an event listener on the form itself, and use a selector
  * to listen for clicks on a particular button on the form. */
  console.log('Document ready!');

  $form.on('click', 'button.new-question', (e) => {
    e.preventDefault();
    addNewQuestion($questions, questionCount);
    questionCount++;
  });

  $form.on('click', 'button.delete-question', (e) => {
    e.preventDefault();
    deleteQuestion(i + 1);
  });

  $form.on('click', 'button.new-option', (e) => {
    e.preventDefault();
    console.log(e.target);
    addNewOption();
  });

  $form.on('click', 'button.delete-option', (e) => {
    e.preventDefault();
    console.log(e.target);
    deleteOption();
  });

  $form.on('submit', (e) => {
    e.preventDefault();
    try {
      submitNewQuiz($(this));
    } catch (err) {
      console.log(err.message, err.stack);
    }
  })
});
