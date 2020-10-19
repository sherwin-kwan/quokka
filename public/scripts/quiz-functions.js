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
  // Note: 0-based index is used for the options so  i = 0 for answer A, i = 3 for answer D,
  // NOT 1-based index as in Chantal's original example
  for (let i = 0; i < options.length; i++) {
    // Sanitize the text of the answer to prevent script injections
    const sanitized_text = escapeChars(options[i].answer_text);
    output += `
    <div class="answer-container">
      <input class="answer"  type="radio" id="q${num}-${i}"" value="a${options[i].id}" name="q${num}"  />
      <label for="q${num}-${i}" >${sanitized_text}</label>
    </div>
    `;
    // Result of this: when the form submits, it will submit in the format q1: a1; ???
  };
  return output;
}

// This function uses generateOneQuestion looping through an array of questions to generate a whole quiz
const loadQuiz = ($form, quiz_id) => {
  const quizId = escapeChars(quiz_id);
  $.ajax(`/quiz/${quizId}/load`, { method: 'GET' })
    .then((data) => {
      $('article').hide(); // Note: Not ideal, should use DOM traversal!!
      for (let question of data) {
        const question_section = generateOneQuestion(question);
        $form.append(question_section);
      };
      $form.append(`<button type="submit" id="submitButton">Submit!</button>`);
      $form.show();
    })
    .fail((xhr, status, err) => {
      console.log(`${status} ${err} There was an error loading the questions for quiz ${quizId}`);
    })
};

// Cause a quiz to be submitted to the database. This calls the
const submitQuiz = ($form) => {
  // Validate input here
  //
  const valid = true;
  //
  //
  const currentUrl = window.location.pathname;
  if (!valid) {
    throw new Error('Validation failed');
  };
  // In the future, this needs to be changed to read a cookie
  const userId = 35;
  $.ajax(`${currentUrl}/${userId}`, { method: 'POST', data: $form.serialize() })
    .then((data, status, xhr) => {
      console.log(data, status, xhr);
      // Redirect user back to home page (maybe, we can make this profile page in the future?)
      // window.location.href = '/';
    })
    .catch(err => console.log(err.message));
};


const form_submit = (event, $form) => {
  event.preventDefault();
  // Begin with validating the input
  const chirpLength = $form.find('textarea').val().length;
  // Errors if chirps are blank or too long.
  if (chirpLength > maxChirpLength) {
    throw new Error(`Your message is too long. Please shorten your chirp and try again.`);
  } else if (chirpLength === 0) {
    throw new Error('Please type a chirp in the text area provided');
  }
  // Note: No validation on the input side, people can put <script> tags into the database if they want. Data is only sanitized when output and
  // rendered onto the page.
  $.ajax('/tweets/', {
    method: 'POST',
    data: $form.serialize()
  })
    .then(() => {
      $form.find('textarea').val('');
      $form.find('.counter').val(maxChirpLength);
      $form.find('p').text('');
      load_chirps(true);
    })
    .fail((xhr, status, err) => {
      throw new Error(`Unforutnately, your chirp could not be saved to the database. Please try again later or report a bug using
      the link in the footer`);
    })
};

