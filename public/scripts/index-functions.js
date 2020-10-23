// Client side functions for the home page


const addQuizSquare = (quiz, title) => {
  return `<a href='/quiz/${quiz.id}'>
  <div class="quiz-tile">
    ${quiz.title}
  </div>
  </a>`;
}

// Loads next page of quizzes
const loadMore = ($btn, currentPage, sort) => {
  $.ajax('/', {
    method: 'POST',
    data: {
      currentPage,
      procedure: 'more',
      sort
    }
  })
    .then((res) => {
      res = JSON.parse(res);
      // If there are no more results, this will be falsy
      if (res.length) {
        for (quiz of res) {
          console.log(quiz);
          $('main').append(addQuizSquare(quiz));
        }
        $btn[0].dataset.currentpage++;
        // Increment the current page so the next time the button is hit, another N results show
      } else {
        $btn.next().text('No more quizzes to show');
      }
    })
    .catch((err) => console.log(err));
}
