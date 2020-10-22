// Helper functions for the quiz creation page (page C)

// CONSTANTS
const default_num_of_options = 2;



const generateQuestionMarkup = (questionNum, num_of_options) => {
  let output = `
  <section data-question-num="${questionNum}">
    <header class="new-question">
      <h3 class="required">Question ${questionNum}</h3>
      <button class="delete-question">delete</button>
    </header>
    <input type="text" class="required" name="questions"/>
    <div class="new-option">
      <label class="option-correct" for="a${questionNum}" >correct?</label>
      <label class="option-text" class="required" for="a${questionNum}"> option text</label>
    </div>
  `;
  for (let j = 0; j < num_of_options; j++) {
    output += generateOptionMarkup(questionNum, j);
  };
  // Add the final button and close section tag at the end of the HTML for this question
  output += `
  <button class="new-option"> + Add Option </button>
  </section>`;
  return output;
};

const generateOptionMarkup = (questionNum) => {
  return `
  <div class="new-option" data-question-num=$s{questionNum}>
    <input type="radio" name="a${questionNum}" value="correct"/>
    <input type="text" class="required" name="a${questionNum}"/>
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

// Verify for errors before submitting
const verifyInputNotEmpty = ($form) => {
  for (field of $form.find(`input.required[type='text']`)) {
    console.log(field);
    if (field.value.length === 0) {
      return false;
    }
  }
  return true;
};

const submitNewQuiz = ($form) => {
  // Do validation here
  const valid = verifyInputNotEmpty($form);
  console.log(valid);
  // For now we'll assume it's valid.
  if (!valid) {
    throw new Error('All fields marked with * are required. If you created too many options, you may delete them with the - buttons.');
  }
  const dataString = $form.serialize();
  console.log('Behold the data: ' + dataString);
  // Make Ajax post to the current URL
  $.ajax('/quiz/new', { method: 'POST', data: dataString })
    .then((data, status, xhr) => {
      if (xhr.status === 201) {
        // After a successful quiz save, redirect user to the results page
        const arr = JSON.parse(data); // The response will be an array [quizId, [array of questionIds]]
        const message = `Congratulations! You have just created quiz ${arr[0]}, with ${arr[1].length} questions.
        You may find your quiz at the following link: ${window.location.host + '/quiz/' + arr[0]}`;
        alert(message);
      } else {
        // Something went wrong
        throw new Error(data + status);
      }
    });

};
