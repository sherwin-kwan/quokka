// Helper functions for the quiz creation page (page C)

// CONSTANTS
const default_num_of_options = 4;

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
  <section id="question-${questionNum}">
    <header class="new-question">
      <h3>Question ${questionNum}</h3>
      <button class="delete-question" data-question-num="${questionNum}">delete</button>
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
  <div class="new-option">
    <input type="checkbox" id="q${questionNum}-${optionIndex}-correct" name="q${questionNum}-${optionIndex}-correct"/>
    <input type="text" id="q${questionNum}-${optionIndex}-text" name="q${questionNum}-${optionIndex}-text"/>
    <button class="delete-option" data-question-num=${questionNum} data-option-index=${optionIndex}><strong>-</strong></button>
  </div>`;
}

const addNewQuestion = ($questions, currentQuestionCount) => {
  const markup = generateQuestionMarkup(currentQuestionCount + 1, default_num_of_options);
  $questions.append(markup);
};

const deleteQuestion = (question_num) => {
  alert('Not yet coded: delete a question');
};

// where questionNum is the question number to which this option should be appended.
// if there are currently 3 options, lastOption = 2, and this will add a fourth option with index 3.
const addNewOption = ($node, questionNum, lastOption) => {
  $node.append(generateOptionMarkup(questionNum, lastOption + 1));
  alert('Not yet coded: add an option');
};

const deleteOption = () => {
  alert('Not yet coded: delete an option');
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
  const dataString = $form.serialize();
  // Make Ajax post to the current URL
  $.ajax(window.location.pathname, { method: 'POST', data: $form.serialize() })
    .then((data, status, xhr) => {
      if (xhr.status === 201) {
      // After a successful quiz save, redirect user to the results page
        console.log('Success!');
      } else {
        // Something went wrong
        console.log(data, status, 'Failure!');
      }
    })
    .catch(err => console.log(err.message));
};
