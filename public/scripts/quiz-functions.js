// Helper functions for the quiz page

// Escaping and Sanitizing
// Helper function (copied from Compass) which escapes unwanted characters in a string to prevent script injections
// It borrows the jQuery "createTextNode" function (used for sanitizing the contents of HTML nodes), by creating
// a dummy div tag to encase the string. The div is not actually output as HTML.

const escapeChars = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// The API endpoint quiz/:id/load sends an array of objects to the front end, with each object representing one question, for example:
/*{
  "question_num":1,
  "text":"What is the capital of Mexico?",
  "answer_options":[
    {"id":1,"answer_text":"Mexico City"},
    {"id":2,"answer_text":"Canada City"},
    {"id":3,"answer_text":"Brazil City"},
    {"id":4,"answer_text":"China City"}
  ]}*/
// This function takes the object corresponding to one question and generates HTML for that question on the quiz page



const generateOneQuestion = (obj) => {
  const num = obj.question_num;
  // Escape the string of question text to prevent script injection attacks
  const questionText = escapeChars(obj.text);
  const options = obj.answer_options;
  // Begin by printing the question number and text
  let output = `<section>
    <h3>Question ${num}</h3>
    <p>${questionText}</p>
  </sectiom>`;
  // Append the answers
  if (!options.length) {
    console.log(`Error, question ${questionText} does not have any answer choices!`);
    return;
  };
  // Note: 0-based index is used for the options so  i = 0 for answer A, i = 3 for answer D, NOT 1-based index as in Chantal's original example
  for (let i = 0; i < options.length; i++) {
    output += `
    <div class="answer-container">
      <input class="answer"  type="radio" id="q${num}-${i}"" value="a${options[i].id}" name="q${num}"  />
      <label for="q${num}-${i}" >${options[i].answer_text}</label>
    </div>
    `;
  };
  return output;
}

// A future function which will use generateOneQuestion looping through an array of questions to generate a whole quiz
const loadQuiz = ($form, quiz_id) => {
  const quizId = escapeChars(quiz_id);
  $.ajax(`/quiz/${quizId}/load`, {method: 'GET'})
    .then((data) => {
      $('article').hide(); // Note: Not ideal, should use DOM traversal!!
      for (let question of data) {
        const question_section = generateOneQuestion(question);
        $form.append(question_section);
      };
      $form.append(`<button type="submit">Submit!</button>`);
      $form.show();
    })
    .fail((xhr, status, err) => {
      console.log(`${status} ${err} There was an error loading the questions for quiz ${quizId}`);
    })
};

const submitQuiz = 0;

const html = `<section>
<h3>Question 1</h3>
<p>Who was the first president of the U.S.?</p>

<!-- for-loop question options later-->

<div class="answer-container">
<input class="answer "  type="radio" id="q1-0"" value="green" name="q1"  />
<label for="q1-0" >green</label>
</div>
<div class="answer-container">
<input class="answer "  type="radio" id="q1-1"" value="blue" name="q1"  />
<label for="q1-1" >blue</label>
</div>
<div class="answer-container">
<input class="answer "  type="radio" id="q1-2"" value="yellow" name="q1"  />
<label for="q1-2" >yellow</label>
</div>
<div class="answer-container">
<input class="answer "  type="radio" id="q1-3"" value="pink" name="q1"  />
<label for="q1-3" >pink</label>
</div>
</section>`;
