// Helper functions for the quiz page

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
  const questionText = obj.text;
  const options = obj.answer_options;
  if (!options.length) {
    console.log(`Error, question ${questionText} does not have any answer choices!`);
    return;
  };

  for (let option of options) {

  }
}
