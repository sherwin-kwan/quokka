// All functions should be placed within the $(...) below, this ensures that it only runs when the page has fully loaded
// Failure to do so may result in asynchronous problems (i.e. the script attempts to create an event listener
// for a button too early, and since the button hasn't loaded yet, there is an error and when the button finally loads, it's too late to be useful.)

$(() => {
  // RUNS ON DOCUMENT READY

  // CONSTANTS
  // Define variables (with $ to signify jQuery object) for key nodes in the DOM
  const $theForm = $('form');


  $('.button-style').on('click', () => {
    try {
      loadQuiz($theForm, 1); // Just using a hard-coded quiz 1 for now
      
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  });
});
