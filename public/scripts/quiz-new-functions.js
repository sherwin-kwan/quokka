// Helper functions for the quiz creation page (page C)

// CONSTANTS
const default_num_of_options = 2;



const generateQuestionMarkup = (questionNum, num_of_options) => {
  let output = `
  <section class="question" data-question-num="${questionNum}">
    <header class="new-question">
      <h3 class="required">Question ${questionNum}</h3>
      <button class="delete-question"><img src="/img/trash.png"></button>
    </header>
    <input type="text" placeholder="Ask something" maxlength="255" class="required transparent" name="questions"/>
    <table>
      <thead>
        <tr class="new-option-header">
          <th class="option-correct required" for="a${questionNum}" >?</th>
          <th class="option-text required" for="a${questionNum}"> option text</th>
          <th class="dummy"></th>
        </tr>
      </thead>
      <tbody>
  `;
  for (let j = 0; j < num_of_options; j++) {
    output += generateOptionMarkup(questionNum, j);
  };
  // Add the final button and close section tag at the end of the HTML for this question
  output += `
      </tbody>
      <tfoot>
        <tr>
          <td>
          </td>
          <td colspan="2">
            <button class="green new-option"> + Add Option </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>`;
  return output;
};

const generateOptionMarkup = (questionNum) => {
  return `
  <tr class="new-option" data-question-num=${questionNum}>
    <td>
      <input type="radio" name="a${questionNum}" value="correct"/>
    </td>
    <td>
      <input type="text" maxlength="255" class="required" name="a${questionNum}"/>
    </td>
    <td>
      <button class="delete-option"><img src="/img/trash.png"></button>
    </td>
  </tr>`;
}

const addNewQuestion = ($questions, currentQuestionCount) => {
  const markup = generateQuestionMarkup(currentQuestionCount + 1, default_num_of_options);
  $questions.append(markup);
};

// This takes a jQuery wrapper on a button as an argument, and removes the question (section) it's located in
const deleteQuestion = ($button) => {
  const $thisQuestion = $button.closest('section');
  // Renumber all subsequent questions, and set the data-question-num attribute accordingly
  for (const section of $thisQuestion.nextAll()) {
    const currentNum = section.dataset.questionNum;
    section.dataset.questionNum--;
    console.log(section.dataset.questionNum);
    $(section).find('h3').text(`Question ${section.dataset.questionNum}`);
    $(section).find(`label[for='a${currentNum}']`).attr('for', `a${section.dataset.questionNum}`);
    $(section).find(`input[name='a${currentNum}']`).attr('name', `a${section.dataset.questionNum}`);
  }
  $thisQuestion.remove();
};

// This takes a jQuery wrapper on a button as an argument, and adds an option immediately prior to that button
const addNewOption = ($button) => {
  const markup = generateOptionMarkup($button.closest('section').data('question-num'));
  $button.closest('tr').before(markup);
};

// This function takes a jQuery wrapper on a button beside an option as an argument, and deletes the option
// (i.e. deletes its parent div entirely)
const deleteOption = ($button) => {
  $button.closest('tr').remove();
};

// Verify for errors before submitting
const verifyInputNotEmpty = ($form) => {
  for (field of $form.find(`input.required[type='text']`)) {
    console.log(field);
    if (field.value.length === 0) {
      return false;
    }
  }
  // Check that at least one option has been checked as correct
  for (let question of $form.find('section.question')) {
    if ($(question).find('input[type=radio]:checked, input[type=checkbox]:checked').length > 0) {
      continue;
    }
    return false;
  }
  return true;
};

const submitNewQuiz = ($form) => {
  // Do validation here
  const valid = verifyInputNotEmpty($form);
  console.log(valid);
  // For now we'll assume it's valid.
  if (!valid) {
    throw new Error(`All fields marked with * are required. If you created too many options, you may delete them with the - buttons.
    You should also make sure that you have specified a correct answer for each question.`);
  }
  const dataString = $form.serialize();
  console.log('Behold the data: ' + dataString);
  // Make Ajax post to the current URL
  $.ajax('/quiz/new', { method: 'POST', data: dataString })
    .then((data, status, xhr) => {
      if (xhr.status === 201 && data) {
        console.log(data);
        const arr = JSON.parse(data);
        $form.find('div.error-message').html(`Saving ${arr[0]} questions and ${arr[1]} answers ...`);
        window.location.href = arr[2];
      } else {
        $form.find('div.error-message').html(`There was an error which caused only part of your quiz to be saved to the database.
        This is often caused by an overload where the number of people trying to use Quokka at this time is greater than the capacity of
         the database. Please try again in a few moments.`);
      }
    });
};
