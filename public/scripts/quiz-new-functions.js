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

const generateQuestionMarkup = (i, num_of_options) => {
  let output = `
  <section id="question-${i}">
    <header class="new-question">
      <h3>Question ${i}</h3>
      <button class="delete-question">delete</button>
    </header>
    <input type="text" name="q${i}"/>
    <div class="new-option">
      <label class="option-correct" for="q${i}-0-correct" >correct?</label>
      <label class="option-text" for="q${i}-0-text"> option text</label>
    </div>
  `;
  for (let j = 0; j < num_of_options; j++) {
    output += `
    <div class="new-option">
      <input type="checkbox" id="q${i}-${j}-correct" name="q${i}-${j}-correct"/>
      <input type="text" id="q${i}-${j}-text" name="q${i}-${j}-text"/>
      <button class="delete-option"><strong>-</strong></button>
    </div>`;
  };
  // Add the final button and close section tag at the end of the HTML for this question
  output += `
  <button class="new-option"> + Add Option </button>
  </section>`;
  return output;
};

const addNewQuestion = ($questions, lastIndex) => {
  const markup = generateQuestionMarkup(lastIndex + 1, default_num_of_options);
  $questions.append(markup);
}
