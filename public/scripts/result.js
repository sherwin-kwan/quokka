//The below line is shorthand for "$(document).ready(function () {"; it means the function won't be invoked until the page is loaded

$(() => {

  //The below two code blocks handle the two copy-to-clipboard buttons on the results page:
  $('.copyResultsLink').on('click', function () {
    const attemptId = $(this).attr('id');
    const string = `${window.location.origin}/result/${attemptId}`;
    copyToClipboardAnyString(string);
  })

  $('.copyQuizLink').on('click', function () {
    const quizId = $(this).attr('id');
    const string = `${window.location.origin}/quiz/${quizId}`;
    copyToClipboardAnyString(string);
  })

  $('a.top').on('click', async function (e) {
    const quizId = $(this).prev('.copyQuizLink').attr('id');
    try {
      let tableToShow = `<table>
        <caption> TOP SCORES </caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Attempted</th>
          </tr>
        </thead>
        <tbody>
        `;
      const dataRows = await $.ajax(`/quiz/${quizId}/top`, { method: 'GET' });
      console.log(dataRows);
      for (let row of dataRows) {
        tableToShow += `
          <tr>
            <td>${row.name}</td>
            <td>${row.percent_correct}</td>
            <td>${row.attempt_time}</td>
          </tr>`;
      }
      tableToShow += `</tbody></table>`;
      console.log(tableToShow);
      $(this).after(tableToShow);
    } catch (err) {
      console.log(err.message);
    };
  });

});
