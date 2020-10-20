// Helper functions for the quiz creation page (page C)

// CONSTANTS
const default_num_of_options = 2;

// Needed HTML for each question:
/*
<section>
  <header class="new-question">
    <h3>Question 2</h3>
    <button class="delete-question">delete</button>
  </header>
  <input type="text" name="q1"/>
  <div class="new-option">
    <label class="option-correct" for="q1-0-correct" >correct?</label>
    <label class="option-text" for="q1-0-text"> option text</label>
  </div>
  <div class="new-option">
  <input type="checkbox" id="q1-0-correct" name="q1-0-correct"/>
  <input type="text" id="q1-0-text" name="q1-0-text"/>
  <button class="delete-option"><strong>-</strong></button>
</div>

  <div class="new-option">
  <input type="checkbox" id="q1-1-correct" name="q1-1-correct"/>
  <input type="text" id="q1-1-text" name="q1-1-text"/>
  <button class="delete-option"><strong>-</strong></button>
</div>

  <button class="new-option"> + Add Option </button>
</section>
*/

const generateQuestionMarkup = (questionNum, num_of_options) => {
  let output = `
  <section data-question-num="${questionNum}">
    <header class="new-question">
      <h3>Question ${questionNum}</h3>
      <button class="delete-question">delete</button>
    </header>
    <input type="text" name="q${questionNum}"/>
    <div class="new-option">
      <label class="option-correct" for="q${questionNum}-0-correct" >correct?</label>
      <label class="option-text" for="q${questionNum}-0-text"> option text</label>
    </div>
  `;
  for (let j = 0; j < num_of_options; j++) {
    output += generateOptionMarkup(questionNum, j);
  };
  // Add the final button and close section tag at the end of the HTML for this question
  output += `
  <button class="new-option" data-question-num="${questionNum}"> + Add Option </button>
  </section>`;
  return output;
};

const generateOptionMarkup = (questionNum, optionIndex) => {
  return `
  <div class="new-option" data-question-num=${questionNum} data-option-index=${optionIndex}>
    <input type="checkbox" name="q${questionNum}-${optionIndex}-correct"/>
    <input type="text" name="q${questionNum}-${optionIndex}-text"/>
    <button class="delete-option"><strong>-</strong></button>
  </div>`;
}

const addNewQuestion = ($questions, currentQuestionCount) => {
  const markup = generateQuestionMarkup(currentQuestionCount + 1, default_num_of_options);
  $questions.append(markup);
};

// This takes a jQuery wrapper on a button as an argument, and removes the question (section) it's located in
const deleteQuestion = ($button) => {
  $button.closest('section').remove();
};

// This takes a jQuery wrapper on a button as an argument, and adds an option immediately prior to that button
const addNewOption = ($button) => {
  $previousOption = $button.prev();
  // If the user is trying to add the first option (i.e. previously, all the options were deleted), $previousOption will be the div
  // containing the "correct?" and "option text" labels.
  // Otherwise, $previousOption will be the last option so far on this question (the 3rd option out of 3, for example)
  // Or more specifically, a jQuery wrapper on the div that represents that option, which will have an 'option-index' property in the dataset
  if ($previousOption.data('option-index') >= 0) {
    const markup = generateOptionMarkup($previousOption.data('question-num'), $previousOption.data('option-index') + 1);
    $previousOption.after(markup);
  } else {
    // We are adding the first option to a question that currently has no options, so get the question number from the parent section's HTML dataset.
    const markup = generateOptionMarkup($previousOption.closest('section').data('question-num'), 0);
    $previousOption.after(markup);
  }
};

// This function takes a jQuery wrapper on a button beside an option as an argument, and deletes the option
// (i.e. deletes its parent div entirely)
const deleteOption = ($button) => {
  $button.closest('div').remove();
};

const submitNewQuiz = ($form) => {
  alert('Not yet coded: submit the quiz');
  // Do validation here
  const valid = true;
  // For now we'll assume it's valid.
  if (!valid) {
    throw new Error('Validation failed');
  }
  const userId = 35; // Hard coded to Sherwin for now, will change in the future once we set up cookies
  console.log($form[0]);
  const dataString = 'abc=1&abc=2&abc=3&abc=4';
  console.log('Behold the data: ' + dataString);
  // Make Ajax post to the current URL
  $.ajax(window.location.pathname, { method: 'POST', data: dataString })
    .then((data, status, xhr) => {
      if (xhr.status === 201) {
      // After a successful quiz save, redirect user to the results page
        alert(data);
      } else {
        // Something went wrong
        alert(data, status, 'Failure!');
      }
    })
    .catch(err => console.log(err.message));
};
