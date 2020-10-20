// Helper functions for the quiz creation page (page C)

// CONSTANTS
const default_num_of_options = 2;


const generateQuestionMarkup = (questionNum, num_of_options) => {
  let output = `
  <section data-question-num="${questionNum}">
    <header class="new-question">
      <h3>Question ${questionNum}</h3>
      <button class="delete-question">delete</button>
    </header>
    <input type="text" name="questions"/>
    <div class="new-option">
      <label class="option-correct" for="a${questionNum}" >correct?</label>
      <label class="option-text" for="a${questionNum}"> option text</label>
    </div>
  `;
  for (let j = 0; j < num_of_options; j++) {
    output += generateOptionMarkup(questionNum, j);
  };
  // Add the final button and close section tag at the end of the HTML for this question
  output += `
  <button class="new-option"> + Add Option </button>
  </section>`;
  console.log(output);
  return output;
};

const generateOptionMarkup = (questionNum) => {
  return `
  <div class="new-option" data-question-num=${questionNum}>
    <input type="radio" name="a${questionNum}" value="correct"/>
    <input type="text" name="a${questionNum}"/>
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
  const markup = generateOptionMarkup($button.closest('section').data('question-num'));
  $button.before(markup);
};

// This function takes a jQuery wrapper on a button beside an option as an argument, and deletes the option
// (i.e. deletes its parent div entirely)
const deleteOption = ($button) => {
  $button.closest('div').remove();
};

const submitNewQuiz = ($form) => {
  // Do validation here
  const valid = true;
  // For now we'll assume it's valid.
  if (!valid) {
    throw new Error('Validation failed');
  }
  const userId = 35; // Hard coded to Sherwin for now, will change in the future once we set up cookies
  const dataString = $form.serialize();
  console.log('Behold the data: ' + dataString);
  // Make Ajax post to the current URL
  $.ajax(window.location.pathname + `/${userId}`, { method: 'POST', data: dataString })
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
